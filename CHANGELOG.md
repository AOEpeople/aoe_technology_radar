# Changelog

## Version v3.3.3 (2022-09-12)

### Fixes

- **exeptions:** do not ignore build errors (e47417b5)

### Chores and tidying

- **deps:** update dependency eslint to v8.23.1 (aba7f36e)
- **deps:** update dependency @types/react to v18.0.19 (50022ed7)
- **deps:** update dependency sass to v1.54.9 (6d048535)
- **deps:** update dependency eslint-plugin-react to v7.31.8 (d4051feb)
- **deps:** update dependency @types/jest to v29 (2a9b1660)
- **deps:** update dependency typescript to v4.8.3 (1c56d77a)
- **deps:** update dependency marked to v4.1.0 (d275efdc)
- **deps:** update dependency highlight.js to v11.6.0 (64d945c8)
- **deps:** update dependency @typescript-eslint/parser to v5.37.0 (3a5b09c6)

## Version v3.3.2 (2022-09-06)

### Ops and CI/CD

- **deps:** bump terser from 5.13.1 to 5.14.2 (b30f7fe5)

### Chores and tidying

- **deps:** update dependency @testing-library/react to v13.4.0 (2fb4720f)
- **deps:** update dependency @types/react to v18.0.18 (9a541dc5)
- **deps:** update dependency sanitize-html to v2.7.1 (9ebd1f78)
- **deps:** update dependency @types/react-dom to v18.0.6 (724aa8ad)
- **deps:** update dependency eslint to v8.23.0 (af708c24)
- **deps:** update dependency @apideck/better-ajv-errors to v0.3.6 (93816450)
- **deps:** update dependency sass to v1.54.8 (ce6185d9)
- **deps:** update dependency @testing-library/jest-dom to v5.16.5 (6fc891de)
- **deps:** update dependency moment to 2.29.4 [security] (56da9b1f)
- **deps:** update dependency d3 to v7.6.1 (45547c2d)
- **deps:** update dependency eslint-plugin-react to v7.30.1 (d63f123f)
- **deps:** update dependency @types/jest to v28.1.8 (a71170b3)
- **deps:** update dependency @typescript-eslint/parser to v5.33.1 (ea536f51)

### Other

- Switch to use tags for selecting radar blips (63a9f5c2)
- Enable multiple radars (faadd868)

## Version v3.3.1 (2022-06-18)

### Fixes

- **search:** do not filter "adopt" by default (f0f4e58a)
- **deps:** update dependency yaml to v2.1.0 (e3615d93)

### Ops and CI/CD

- **renovate:** change all commits to chore (85de5ffe)

### Chores and tidying

- **deps:** update dependency eslint to v8.18.0 (2f340c36)
- **deps:** update dependency typescript to v4.7.4 (10b93d4b)
- **deps:** update react monorepo to v18.2.0 (f7c37f6d)
- **deps:** update dependency react-icons to v4.4.0 (d1eeacd0)
- **deps:** update dependency yaml to v2.1.1 (0afc7df8)
- **deps:** update dependency @types/jest to v28 (d733bb4a)
- **deps:** update dependency @testing-library/react to v13.3.0 (984d0154)
- **deps:** update dependency @types/react to v18.0.14 (80e3e156)
- **deps:** update dependency @types/jest to v27.5.2 (3f022e58)
- **deps:** update dependency @apideck/better-ajv-errors to v0.3.4 (14723687)
- **deps:** update dependency @types/react-dom to v18.0.5 (2e2bba35)
- **deps:** update dependency @types/d3 to v7.4.0 (919160e8)
- **deps:** update dependency eslint-plugin-react to v7.30.0 (c998c2f6)
- **deps:** update dependency marked to v4.0.17 (457fb2e9)
- **deps:** update dependency @typescript-eslint/parser to v5.28.0 (b60682ac)
- **deps:** update dependency sass to v1.52.3 (e619385d)
- **deps:** update dependency typescript to v4.7.3 (c3994b33)
- **deps:** update dependency eslint to v8.17.0 (b585874b)

## Version v3.3.0 (2022-05-13)

### Features

- **react:** update to react 18 (f28aad8b)

### Fixes

- **deps:** pin dependency postcss-normalize to 10.0.1 (bb89746f)
- **versions:** version (48910005)

### Ops and CI/CD

- **github:** remove yarn and check unchecked files (bda08778)
- **semanticore:** update package.json upon release (f4c5c9ed)

### Chores and tidying

- **deps:** add renovate.json (ce16a271)

## Version v3.2.1 (2022-05-11)

### Fixes

- **dependencies:** hard pin for now (183d71a4)

### Ops and CI/CD

- **deps:** bump async from 2.6.3 to 2.6.4 (1af0d3e9)

### Chores and tidying

- Update config.json (340877f9)

### Other

- v3.2.0 (8e449257)

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
