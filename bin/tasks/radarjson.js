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
exports.radarJsonGenerator = void 0;
const radar_1 = require("./radar");
const file_1 = require("./file");
exports.radarJsonGenerator = (() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('start');
        const radar = yield radar_1.createRadar();
        // console.log(radar);
        file_1.save(JSON.stringify(radar), 'rd.json');
        file_1.save(`import React from 'react';
import ReactDOM from 'react-dom';
import App from 'aoe_technology_radar/src/components/App';
import 'aoe_technology_radar/src/index.scss';
import {Item} from "aoe_technology_radar/src/model";
import radardata from './rd.json';

ReactDOM.render(
    <React.StrictMode>
        <App items={radardata.items as Item[]} releases={radardata.releases as string[]} />
    </React.StrictMode>,
    document.getElementById('root')
);
`, 'index.tsx');
        console.log('Built radar');
    }
    catch (e) {
        console.error('error:', e);
    }
}));
