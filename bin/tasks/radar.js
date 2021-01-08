"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRadar = void 0;
const fs_extra_1 = require("fs-extra");
const path_1 = __importDefault(require("path"));
const front_matter_1 = __importDefault(require("front-matter"));
const marked_1 = __importDefault(require("marked"));
const highlight_js_1 = __importDefault(require("highlight.js"));
const config_1 = require("../src/config");
const file_1 = require("./file");
marked_1.default.setOptions({
    highlight: code => highlight_js_1.default.highlightAuto(code).value,
});
exports.createRadar = () => __awaiter(void 0, void 0, void 0, function* () {
    const fileNames = yield file_1.getAllMarkdownFiles(file_1.radarPath());
    const revisions = yield createRevisionsFromFiles(fileNames);
    const allReleases = getAllReleases(revisions);
    const items = createItems(revisions);
    const flaggedItems = flagItem(items, allReleases);
    return {
        items: flaggedItems,
        releases: allReleases,
    };
});
const checkAttributes = (fileName, attributes) => {
    if (attributes.ring && !config_1.rings.includes(attributes.ring)) {
        throw new Error(`Error: ${fileName} has an illegal value for 'ring' - must be one of ${config_1.rings}`);
    }
    if (attributes.quadrant && !config_1.quadrants.includes(attributes.quadrant)) {
        throw new Error(`Error: ${fileName} has an illegal value for 'quadrant' - must be one of ${config_1.quadrants}`);
    }
    if (!attributes.quadrant || attributes.quadrant === '') {
        // throw new Error(`Error: ${fileName} has no 'quadrant' set`);
    }
    if (!attributes.title || attributes.title === '') {
        attributes.title = path_1.default.basename(fileName);
    }
    return attributes;
};
const createRevisionsFromFiles = (fileNames) => Promise.all(fileNames.map(fileName => {
    return new Promise((resolve, reject) => {
        fs_extra_1.readFile(fileName, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                const fm = front_matter_1.default(data);
                // add target attribute to external links
                // todo: check path
                let html = marked_1.default(fm.body.replace(/\]\(\//g, '](/techradar/'));
                html = html.replace(/a href="http/g, 'a target="_blank" rel="noopener noreferrer" href="http');
                resolve(Object.assign(Object.assign(Object.assign({}, itemInfoFromFilename(fileName)), checkAttributes(fileName, fm.attributes)), { fileName, body: html }));
            }
        });
    });
}));
const itemInfoFromFilename = (fileName) => {
    const [release, nameWithSuffix] = fileName.split(path_1.default.sep).slice(-2);
    return {
        name: nameWithSuffix.substr(0, nameWithSuffix.length - 3),
        release,
    };
};
const getAllReleases = (revisions) => revisions
    .reduce((allReleases, { release }) => {
    if (!allReleases.includes(release)) {
        return [...allReleases, release];
    }
    return allReleases;
}, [])
    .sort();
const createItems = (revisions) => {
    const itemMap = revisions.reduce((items, revision) => {
        return Object.assign(Object.assign({}, items), { [revision.name]: addRevisionToItem(items[revision.name], revision) });
    }, {});
    return Object.values(itemMap).sort((x, y) => (x.name > y.name ? 1 : -1));
};
const ignoreEmptyRevisionBody = (revision, item) => {
    if (!revision.body || revision.body.trim() === '') {
        return item.body;
    }
    return revision.body;
};
const addRevisionToItem = (item = {
    flag: 'default',
    featured: true,
    revisions: [],
    name: '',
    title: '',
    ring: 'trial',
    quadrant: '',
    body: '',
    info: '',
}, revision) => {
    let newItem = Object.assign(Object.assign(Object.assign({}, item), revision), { body: ignoreEmptyRevisionBody(revision, item) });
    if (revisionCreatesNewHistoryEntry(revision)) {
        newItem = Object.assign(Object.assign({}, newItem), { revisions: [revision, ...newItem.revisions] });
    }
    return newItem;
};
const revisionCreatesNewHistoryEntry = (revision) => {
    return revision.body.trim() !== '' || typeof revision.ring !== 'undefined';
};
const flagItem = (items, allReleases) => items.map(item => (Object.assign(Object.assign({}, item), { flag: getItemFlag(item, allReleases) })), []);
const isInLastRelease = (item, allReleases) => item.revisions[0].release === allReleases[allReleases.length - 1];
const isNewItem = (item, allReleases) => item.revisions.length === 1 && isInLastRelease(item, allReleases);
const hasItemChanged = (item, allReleases) => item.revisions.length > 1 && isInLastRelease(item, allReleases);
const getItemFlag = (item, allReleases) => {
    if (isNewItem(item, allReleases)) {
        return 'new';
    }
    if (hasItemChanged(item, allReleases)) {
        return 'changed';
    }
    return 'default';
};
