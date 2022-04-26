# Changelog

## Version v3.2.0 (2022-04-26)

### Features

- provide edito button to jump directly to the item in a repo (7e65a17e)
- allow to use custom date output formats (dc84d192)
- sanitize HTML in footer (e0113c44)

### Fixes

- **revisions:** double revisions on fade-out (00dc431c)
- **codestyle:** remove unnecessary computed property (91d802ab)
- **marked:** compatibility with marked 4 (9dd3bd87)
- make build work with npm (39618b7e)
- use correct default flag type (d226eeb5)
- Prevent overriding the ring with empty value (c1157a77)
- Sort out Ring enum typing issues (15feb9bc)

### Refactoring

- return `null` when `editLink` config is not defined (72883ca2)

### Ops and CI/CD

- **deps:** bump minimist from 1.2.5 to 1.2.6 (e070b905)
- **deps:** bump moment from 2.29.1 to 2.29.2 (91bc99ab)
- **semanticore:** add semanticore (1bd7f2f5)
- **deps:** bump url-parse from 1.5.7 to 1.5.10 (bf01bab7)
- **deps:** bump follow-redirects from 1.14.7 to 1.14.8 (17328672)
- **deps:** bump url-parse from 1.5.3 to 1.5.7 (d12c0928)

### Documentation

- **changelog:** remove header to let semanticore do its magic (44af047b)
- move `editLink` config into readme (fcdbb403)

### Other

- Bump marked from 2.1.3 to 4.0.10 (54152e5a)
- Bump nanoid from 3.1.28 to 3.2.0 (95fefb55)
- Bump follow-redirects from 1.14.4 to 1.14.7 (c2bd8dd3)
- Get rid of react-faux-dom dependency (622da055)
- Add types (b1e63528)
- Re-order quadrants in the chart (e8eff6bd)
- Add basic typing to config objects (725b6f99)
- Full Radar grid with chart (13ba3120)
- First stab at the radar chart (ad4c8475)

## 3.1.2
### Features
- Added `showEmptyRings` option to `config.json`, which enables display of headers for rings containing no items.
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
