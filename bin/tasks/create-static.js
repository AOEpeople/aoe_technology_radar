#!/usr/bin/env node
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
Object.defineProperty(exports, "__esModule", { value: true });
const radar_1 = require("./radar");
const fs_1 = require("fs");
const config_1 = require("../src/config");
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('starting static');
        const radar = yield radar_1.createRadar();
        fs_1.copyFileSync('build/index.html', 'build/overview.html');
        fs_1.copyFileSync('build/index.html', 'build/help-and-about-tech-radar.html');
        config_1.quadrants.forEach(quadrant => {
            fs_1.copyFileSync('build/index.html', 'build/' + quadrant + '.html');
            fs_1.mkdirSync('build/' + quadrant);
        });
        radar.items.forEach(item => {
            fs_1.copyFileSync('build/index.html', 'build/' + item.quadrant + '/' + item.name + '.html');
        });
        console.log('created static');
    }
    catch (e) {
        console.error('error:', e);
    }
}))();
