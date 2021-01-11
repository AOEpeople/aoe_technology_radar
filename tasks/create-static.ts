#!/usr/bin/env node

import {createRadar} from "./radar";
import {save} from "./file";
import {copyFileSync, mkdir, mkdirSync} from "fs";
import {quadrants} from "../src/config";


(async () => {
    try {
        console.log('starting static')
        const radar = await createRadar();

        copyFileSync('build/index.html', 'build/overview.html')
        copyFileSync('build/index.html', 'build/help-and-about-tech-radar.html')

        quadrants.forEach(quadrant => {
            copyFileSync('build/index.html', 'build/' + quadrant + '.html')
            mkdirSync('build/' + quadrant)
        })
        radar.items.forEach(item => {
            copyFileSync('build/index.html', 'build/' + item.quadrant + '/' + item.name + '.html')
        })

        console.log('created static');
    } catch (e) {
        console.error('error:', e);
    }
})()
