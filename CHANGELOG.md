# Changelog
All notable changes to this project will be documented in this file.

## Unreleased
### Bug Fixes
- Fixed dependent projects failing to build without dependency `@types/sanitize-html`.

## 3.1.1

## 3.1.0
### Bug Fixes
- Added aria-label attributes to the social links.
- Removed scaling limitation in viewport meta tag.

## 3.0.1 (2021.07.02)
### Bug Fixes
- Fixed the bug, that `aoe_technology_radar-buildRadar` could not be executed without `aoe_technology_radar-generateJson` running first.

## 3.0.0 (2021.07.02)
### Features
- The `rd.json` (markdown data) isn't part of the bundle anymore. It will be fetched and therefore can be cached by the browser. ([#50](https://github.com/AOEpeople/aoe_technology_radar/issues/50))
- Non featured articles will be separated to the bottom of the list in quadrant view. Therefore, you can see what isn't featured anymore. ([#78](https://github.com/AOEpeople/aoe_technology_radar/issues/78))
- Customize the Tech Radar instead of forking it.
    - Host the application under a sub path. ([#59](https://github.com/AOEpeople/aoe_technology_radar/issues/59))
    - Change the name of your tech radar.
    - Change the logo.
    - Change the favicon.
    - Replace the index.html.
    - Change the fonts. ([#88](https://github.com/AOEpeople/aoe_technology_radar/issues/88))
    - Change the texts on the help page. ([#86](https://github.com/AOEpeople/aoe_technology_radar/issues/86))
    - Change the footer footnode. ([#86](https://github.com/AOEpeople/aoe_technology_radar/issues/86))
    - Change the social links. ([#86](https://github.com/AOEpeople/aoe_technology_radar/issues/86))
    - Change the legal information link. ([#86](https://github.com/AOEpeople/aoe_technology_radar/issues/86))

### Bug Fixes
- Fix social links ([#49](https://github.com/AOEpeople/aoe_technology_radar/issues/49))

### Changes
- Simplified the dependencies, scripts and build process ([#81](https://github.com/AOEpeople/aoe_technology_radar/pull/81))
    - node-sass is not needed anymore

### Breaking Changes
- Renamed script `aoe_technology_radar` to `aoe_technology_radar-buildRadar` to make clear that this script builds the radar.
- Added script `aoe_technology_radar-generateJson` to generate the file `rd.json` based on your radar markdown files.
- Renamed script `aoe_technology_radar-createStatic` to `aoe_technology_radar-createStaticFiles` to make clear that this script creates static files only.

> For more information about the changes and customizations, please have a look in the [readme.md](https://github.com/AOEpeople/aoe_technology_radar).
