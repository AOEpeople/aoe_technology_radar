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
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRadar = void 0;
var front_matter_1 = __importDefault(require("front-matter"));
var fs_1 = require("fs");
var fs_extra_1 = require("fs-extra");
var highlight_js_1 = __importDefault(require("highlight.js"));
var marked_1 = require("marked");
var path = __importStar(require("path"));
var config_1 = require("../../src/config");
var model_1 = require("../../src/model");
var paths_1 = require("../paths");
var file_1 = require("./file");
marked_1.marked.setOptions({
    highlight: function (code) { return highlight_js_1.default.highlightAuto(code).value; },
});
var createRadar = function () { return __awaiter(void 0, void 0, void 0, function () {
    var fileNames, revisions, filterdRevisions, allReleases, items, flaggedItems;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, file_1.getAllMarkdownFiles)((0, file_1.radarPath)())];
            case 1:
                fileNames = _a.sent();
                return [4 /*yield*/, createRevisionsFromFiles(fileNames)];
            case 2:
                revisions = _a.sent();
                filterdRevisions = revisions.filter(function (r) { return r !== undefined; });
                allReleases = getAllReleases(filterdRevisions);
                items = createItems(filterdRevisions);
                flaggedItems = flagItem(items, allReleases);
                items.forEach(function (item) { return checkAttributes(item.name, item); });
                return [2 /*return*/, {
                        items: flaggedItems,
                        releases: allReleases,
                    }];
        }
    });
}); };
exports.createRadar = createRadar;
var checkAttributes = function (fileName, attributes) {
    var rawConf = (0, fs_1.readFileSync)(path.resolve(paths_1.appBuild, "config.json"), "utf-8");
    var config = JSON.parse(rawConf);
    if (!config.rings.includes(attributes.ring)) {
        throw new Error("Error: ".concat(fileName, " has an illegal value for 'ring' - must be one of ").concat(config.rings));
    }
    var quadrants = Object.keys(config.quadrants);
    if (!quadrants.includes(attributes.quadrant)) {
        throw new Error("Error: ".concat(fileName, " has an illegal value for 'quadrant' - must be one of ").concat(quadrants));
    }
    if (config.tags) {
        for (var _i = 0, _a = config.tags; _i < _a.length; _i++) {
            var tag = _a[_i];
            if (attributes.tags && attributes.tags.includes(tag)) {
                return attributes;
            }
        }
        return undefined;
    }
    else {
        return attributes;
    }
};
var createRevisionsFromFiles = function (fileNames) {
    return Promise.all(fileNames.map(function (fileName) {
        return (0, fs_extra_1.readFile)(fileName, "utf8").then(function (data) {
            var fm;
            try {
                fm = fm = (0, front_matter_1.default)(data);
            }
            catch (err) {
                throw new Error("Error processing file ".concat(fileName, ": ").concat(err === null || err === void 0 ? void 0 : err.toString()));
            }
            var html = (0, marked_1.marked)(fm.body.replace(/\]\(\//g, "](".concat(config_1.publicUrl)));
            html = html.replace(/a href="http/g, 'a target="_blank" rel="noopener noreferrer" href="http');
            var attributes = checkAttributes(fileName, fm.attributes);
            if (attributes) {
                return __assign(__assign(__assign({}, itemInfoFromFilename(fileName)), attributes), { fileName: fileName, body: html });
            }
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
            return __spreadArray(__spreadArray([], allReleases, true), [release], false);
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
        .map(function (item) { return (__assign(__assign({}, item), { title: item.title || item.name })); })
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
        angleFraction: Math.random(),
        radiusFraction: Math.random(),
    }; }
    var newItem = __assign(__assign(__assign({}, item), revision), { body: ignoreEmptyRevisionBody(revision, item) });
    if (revisionCreatesNewHistoryEntry(revision, item)) {
        newItem = __assign(__assign({}, newItem), { revisions: __spreadArray([revision], newItem.revisions, true) });
    }
    return newItem;
};
var revisionCreatesNewHistoryEntry = function (revision, item) {
    return (revision.body.trim() !== "" ||
        (typeof revision.ring !== "undefined" && revision.ring !== item.ring) ||
        (typeof revision.quadrant !== "undefined" &&
            revision.quadrant !== item.quadrant));
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
