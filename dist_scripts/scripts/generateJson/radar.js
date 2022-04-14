"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRadar = void 0;
var fs_extra_1 = require("fs-extra");
var fs_1 = require("fs");
var path = __importStar(require("path"));
var front_matter_1 = __importDefault(require("front-matter"));
// @ts-ignore esModuleInterop is activated in tsconfig.scripts.json, but IDE typescript uses default typescript config
var marked_1 = require("marked");
var highlight_js_1 = __importDefault(require("highlight.js"));
var file_1 = require("./file");
var model_1 = require("../../src/model");
var paths_1 = require("../paths");
marked_1.marked.setOptions({
    highlight: function (code) { return highlight_js_1.default.highlightAuto(code).value; },
});
var createRadar = function () { return __awaiter(void 0, void 0, void 0, function () {
    var fileNames, revisions, allReleases, items, flaggedItems;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, file_1.getAllMarkdownFiles(file_1.radarPath())];
            case 1:
                fileNames = _a.sent();
                return [4 /*yield*/, createRevisionsFromFiles(fileNames)];
            case 2:
                revisions = _a.sent();
                allReleases = getAllReleases(revisions);
                items = createItems(revisions);
                flaggedItems = flagItem(items, allReleases);
                return [2 /*return*/, {
                        items: flaggedItems,
                        releases: allReleases,
                    }];
        }
    });
}); };
exports.createRadar = createRadar;
var checkAttributes = function (fileName, attributes) {
    var rawConf = fs_1.readFileSync(path.resolve(paths_1.appBuild, 'config.json'), 'utf-8');
    var config = JSON.parse(rawConf);
    if (attributes.ring && !config.rings.includes(attributes.ring)) {
        throw new Error("Error: " + fileName + " has an illegal value for 'ring' - must be one of " + config.rings);
    }
    var quadrants = Object.keys(config.quadrants);
    if (attributes.quadrant && !quadrants.includes(attributes.quadrant)) {
        throw new Error("Error: " + fileName + " has an illegal value for 'quadrant' - must be one of " + quadrants);
    }
    return attributes;
};
var createRevisionsFromFiles = function (fileNames) {
    var publicUrl = process.env.PUBLIC_URL;
    return Promise.all(fileNames.map(function (fileName) {
        return new Promise(function (resolve, reject) {
            fs_extra_1.readFile(fileName, "utf8", function (err, data) { return __awaiter(void 0, void 0, void 0, function () {
                var fm, html;
                return __generator(this, function (_a) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        fm = front_matter_1.default(data);
                        html = marked_1.marked(fm.body.replace(/\]\(\//g, "](" + publicUrl + "/"));
                        html = html.replace(/a href="http/g, 'a target="_blank" rel="noopener noreferrer" href="http');
                        resolve(__assign(__assign(__assign({}, itemInfoFromFilename(fileName)), checkAttributes(fileName, fm.attributes)), { fileName: fileName, body: html }));
                    }
                    return [2 /*return*/];
                });
            }); });
        });
    }));
};
var itemInfoFromFilename = function (fileName) {
    var _a = fileName.split(path.sep).slice(-2), release = _a[0], name = _a[1];
    return {
        name: path.basename(name, ".md"),
        release: release,
    };
};
var getAllReleases = function (revisions) {
    return revisions
        .reduce(function (allReleases, _a) {
        var release = _a.release;
        if (!allReleases.includes(release)) {
            return __spreadArray(__spreadArray([], allReleases), [release]);
        }
        return allReleases;
    }, [])
        .sort();
};
var createItems = function (revisions) {
    var itemMap = revisions.reduce(function (items, revision) {
        var _a;
        return __assign(__assign({}, items), (_a = {}, _a[revision.name] = addRevisionToItem(items[revision.name], revision), _a));
    }, {});
    return Object.values(itemMap)
        .map(function (item) {
        var _a;
        return (__assign(__assign({}, item), (_a = {}, _a["title"] = item.title || item.name, _a)));
    })
        .sort(function (x, y) { return (x.name > y.name ? 1 : -1); });
};
var ignoreEmptyRevisionBody = function (revision, item) {
    if (!revision.body || revision.body.trim() === "") {
        return item.body;
    }
    return revision.body;
};
var addRevisionToItem = function (item, revision) {
    if (item === void 0) { item = {
        flag: model_1.FlagType.default,
        featured: true,
        revisions: [],
        name: "",
        title: "",
        ring: "trial",
        quadrant: "",
        body: "",
        info: "",
    }; }
    var newItem = __assign(__assign(__assign({}, item), revision), { body: ignoreEmptyRevisionBody(revision, item) });
    if (revisionCreatesNewHistoryEntry(revision)) {
        newItem = __assign(__assign({}, newItem), { revisions: __spreadArray([revision], newItem.revisions) });
    }
    return newItem;
};
var revisionCreatesNewHistoryEntry = function (revision) {
    return revision.body.trim() !== "" || typeof revision.ring !== "undefined";
};
var flagItem = function (items, allReleases) {
    return items.map(function (item) {
        return (__assign(__assign({}, item), { flag: getItemFlag(item, allReleases) }));
    }, []);
};
var isInLastRelease = function (item, allReleases) {
    return item.revisions[0].release === allReleases[allReleases.length - 1];
};
var isNewItem = function (item, allReleases) {
    return item.revisions.length === 1 && isInLastRelease(item, allReleases);
};
var hasItemChanged = function (item, allReleases) {
    return item.revisions.length > 1 && isInLastRelease(item, allReleases);
};
var getItemFlag = function (item, allReleases) {
    if (isNewItem(item, allReleases)) {
        return model_1.FlagType.new;
    }
    if (hasItemChanged(item, allReleases)) {
        return model_1.FlagType.changed;
    }
    return model_1.FlagType.default;
};
