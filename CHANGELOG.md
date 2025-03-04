# Changelog

## Version v4.5.0 (2025-03-04)

### Features

- add showSearch toggle (#480) (1231dd87)
- update eslint to 9.21.0 (8b5d2201)
- update to react 19 and next.js 15.2 (1687f930)
- restore scroll position when navigating back (5484b04c)

### Fixes

- uri-encode tag when used as query parameter (#472) (86c446b7)

### Chores and tidying

- **deps:** update dependency @types/node to v22.13.9 (#501) (d364a120)
- **deps:** update nextjs monorepo to v15.2.1 (#477) (81758057)
- remove superfluous Dialog component and deps (d6b41d0f)
- update postcss-nested and postcss-preset-env to latest versions (45d9015e)
- update prettier and related plugins (e2df29a1)
- update demo entry with code highlighting and bump dependencies (3315d8ca)
- ignore /techradar/ (953432c9)
- update commitlint and husky dependencies (bef138f7)
- bump version to 4.5.0-rc.1 (0d230035)

## Version v4.4.0 (2024-07-01)

### Features

- add `jsFile` option to include custom JavaScript (6a5b8637)

### Fixes

- **css:** increase ol padding to accommodate two-digit list items (a443aef0)

### Chores and tidying

- update dependencies (717bc238)
- update dependencies and sync version (cca35eaa)

## Version v4.3.0 (2024-03-26)

### Features

- add configurable meta description for homepage (8c407ca0)
- support alternative logos like png (d254ec1a)

### Fixes

- mention basePath in local URL and set default to /techradar (969306c7)

## Version v4.2.0 (2024-03-25)

### Features

- add sitemap.xml (a8172e65)
- allow to change order of sections on main page (7c08e520)

### Fixes

- use webpack for dev-server to keep consistent css-module classnames (335ecf6d)

### Chores and tidying

- **deps:** update @types/react (4fc9babf)
- **deps:** update dependencies (43513bb1)
- **deps:** update dependencies (3dff4eda)
- add key attribute to homepage components and remove superfluous deep-merge (7dfd28bd)

## Version v4.1.0 (2024-03-14)

### Features

- throw error if no single radar item was found (c267082c)
- add custom.css support (1a7ea352)
- add social icon GitLab (76b5c38e)
- reintroduce `config.toggles` to hide parts of the radar and change behaviour (92b7c282)
- improve config values by extending default config (04053c67)

### Fixes

- allow tags to be optional in items (5750723c)

### Chores and tidying

- update dependencies (f94c94ff)
- update dependencies (3c982420)
- commit updated package-lock.json (c5186353)

## Version v4.0.2 (2024-03-13)

### Fixes

- remove empty revisions to fix typescript error and use default flag for first release (9381aa9d)
- avoid line-breaks before flag and improve responsive lists (b6b4709e)

### Chores and tidying

- improve output on markdown parsing errors (858e10b7)

## Version v4.0.1 (2024-03-12)

### Fixes

- unignore data files to include them in npm package (0eda733b)
- remove `private`-flag from package.json (eb440902)

### Chores and tidying

- update commitlint dependencies (60b0c0e1)

## Version v4.0.0 (2024-03-11)

Version 4.0.0 is a complete rewrite of the AOE Technology Radar. It is now based
on [Next.js](https://nextjs.org/) to provide enhanced static site generation. The visualization has
been rewritten without the need for the D3 dependency. New features include a fuzzy search based on
Fuse.js, non-overlapping blips on the radar, and a reworked tag filter on the homepage.

To migrate from the old version please migrate your `package.json`'s scripts and create a
new `config.json` based on the documentation below. You can find a reference implementation in
our [repo](https://github.com/AOEpeople/techradar). The old version is still available in the `v3`
branch.

Version 4.0.0 also removes the .html extension from the URLs. If you want to support the old URLs,
we recommend to add a redirect rule. For nginx, you can use the following rule:

```nginx
rewrite ^/techradar/(.+)\.html$ /techradar/$1/ permanent;
```

## Version v3.6.0 (2023-06-29)

### Features

- allow to define format for page title (810db6ae)

### Fixes

- remove &lt;noscript&gt; when static content is generated and rendered already (8876d3b1)

### Refactoring

- remove test code (dd9ce8ed)
- prevent duplicated title for index page by making prop optional (0d2265c5)

### Chores and tidying

- **deps:** update dependency @types/node to v18.16.18 (fbb23ab3)
- **deps:** update dependency react-router-dom to v6.14.0 (12ed5828)
- **deps:** update dependency jsdom to v22 (4ae9299a)
- **deps:** update react monorepo (9d53b958)
- **deps:** update dependency xml2js to v0.6.0 (769cc905)
- **deps:** update dependency react-icons to v4.10.1 (28aed80c)
- **deps:** update dependency d3 to v7.8.5 (fcc77016)

## Version v3.5.3 (2023-06-01)

### Fixes

- deterministic behaviour for radar by storing the random fractions when generating rd.json (#372) (3b272dac)
- generate static files content (71e39745)

### Ops and CI/CD

- **deps:** update transitive dependency xml2js to v0.5.0 (34e6f0eb)

### Chores and tidying

- **deps:** update react monorepo (b82d5a9d)
- **deps:** remove unused dependency yaml (8dd67b76)
- **deps:** update dependency highlight.js to v11.8.0 (398b3026)
- **deps:** update dependency @types/marked to v4.3.1 (c1a0c194)
- **deps:** update dependency @types/react-modal to v3.16.0 (a7370854)
- **deps:** update dependency @types/node to v18.16.16 (2e2def59)
- **deps:** update dependency @types/jest to v29.5.2 (b0820aa5)
- **deps:** update dependency jsdom to v21.1.2 (f0276509)
- **deps:** update dependency sass to v1.62.1 (eeb40569)
- **deps:** update dependency @typescript-eslint/parser to v5.59.8 (fcd15907)
- **deps:** update dependency eslint to v8.41.0 (90863555)
- **deps:** update dependency yaml to v2.2.2 [security] (37dbc4ed)

### Other

- style: run prettier on pre-commit hook (99487126)

## Version v3.5.2 (2023-04-14)

### Fixes

- fix build (24a295cb)

## Version v3.5.1 (2023-04-14)

### Fixes

- include index.html in sitemap (d2e54003)

### Ops and CI/CD

- **deps:** bump webpack from 5.72.1 to 5.79.0 (cd144101)
- **deps:** bump dns-packet from 5.3.1 to 5.4.0 (#337) (5845fc10)

### Chores and tidying

- **deps:** update dependency @typescript-eslint/parser to v5.58.0 (114534c1)
- **deps:** update dependency eslint to v8.38.0 (e906c79a)
- **deps:** update actions/setup-go action to v4 (58a31cb8)
- **deps:** update dependency marked to v4.3.0 (cd98daa2)
- **deps:** update dependency @types/jest to v29.5.0 (af11d27c)
- **deps:** update dependency fs-extra to v11.1.1 (14effde0)
- **deps:** update dependency d3 to v7.8.4 (62b2657d)
- **deps:** update dependency sass to v1.62.0 (d469d428)
- **deps:** update dependency @types/react to v18.0.35 (9799892c)
- **deps:** update dependency react-router-dom to v6.10.0 (ff9c013b)
- **deps:** update dependency eslint-config-prettier to v8.8.0 (4144445d)
- **deps:** update dependency react-icons to v4.8.0 (8768d109)
- **deps:** update dependency @types/sanitize-html to v2.9.0 (a059778e)
- **deps:** update dependency @types/node to v18.15.11 (98e5f186)
- **deps:** update dependency @testing-library/react to v14 (#334) (db086f30)
- **deps:** update dependency sass to v1.58.3 (bb35b88b)
- **deps:** update dependency sanitize-html to v2.10.0 (ad5013e7)
- **deps:** update react monorepo (d0c7b6bd)
- **deps:** update dependency @trivago/prettier-plugin-sort-imports to v4.1.1 (b7467481)
- **deps:** update dependency @types/node to v18.14.2 (caebaad6)
- **deps:** update dependency typescript to v4.9.5 (2f2b365d)
- **deps:** update dependency eslint-plugin-react to v7.32.2 (3f79d4ba)
- **deps:** update dependency eslint to v8.35.0 (bfafa19d)
- **deps:** update dependency react-router-dom to v6.8.2 (0c977536)
- **deps:** update dependency @types/jest to v29.4.0 (a688e401)
- **deps:** update dependency @typescript-eslint/parser to v5.54.0 (a3efebc7)

### Other

- Add cross-env to allow building on windows too. (#333) (77acfddf)

## Version v3.5.0 (2023-01-19)

### Features

- allow/describe how to define custom styles (f71edaef)
- provide sitemap (caff3640)

### Fixes

- **sitemap:** correct prefix (2c97343b)
- **badges:** use relative coloring for badges (a48e0bb7)
- **build:** do not generate sourcemap, fixes #295 (e4d9a6fb)

### Ops and CI/CD

- **deps:** bump json5 from 1.0.1 to 1.0.2 (3df8aec1)

### Chores and tidying

- **deps:** update dependency @typescript-eslint/parser to v5.48.2 (1bb5fdb0)
- **deps:** update dependency @types/react to v18.0.27 (9208f523)
- **deps:** update dependency react-router-dom to v6.7.0 (f01684fc)
- **deps:** update dependency @types/jest to v29.2.6 (4ff746ac)
- **deps:** update dependency eslint-plugin-react to v7.32.1 (cf1d0704)
- **deps:** update dependency eslint to v8.32.0 (540a9a5d)
- **deps:** update dependency marked to v4.2.12 (c22c308b)
- **deps:** update dependency d3 to v7.8.2 (7537c9a8)
- **deps:** update dependency eslint-plugin-react to v7.32.0 (692cbb60)
- **deps:** update dependency @types/fs-extra to v11.0.1 (0e5f7ec2)
- **deps:** update dependency marked to v4.2.5 (e2c0f3e7)
- **deps:** update dependency @types/fs-extra to v11 (29d9bf58)
- **deps:** update dependency husky to v8.0.3 (a87c3be5)
- **deps:** update dependency yaml to v2.2.1 (2b371ca2)
- **deps:** update dependency react-router-dom to v6.6.2 (bff64b22)
- **deps:** update dependency eslint-config-prettier to v8.6.0 (06d7e5ad)
- **deps:** update dependency @typescript-eslint/parser to v5.48.1 (6ca06dac)
- **deps:** update dependency query-string to v8 (beec091e)
- **deps:** update dependency @types/react-dom to v18.0.10 (6ef01dae)
- **deps:** update dependency sanitize-html to v2.8.1 (ed373c51)
- **deps:** update dependency @types/jest to v29.2.5 (301ed5f1)
- **deps:** update dependency eslint to v8.31.0 (c9290047)
- **deps:** update dependency react-router-dom to v6.6.1 (e551f4c8)
- **deps:** update dependency @types/node to v18.11.18 (e5b38e63)
- **deps:** update dependency d3 to v7.8.0 (7aba927c)
- **deps:** update dependency sass to v1.57.1 (5e922824)
- **deps:** update dependency query-string to v7.1.3 (7d0a6dd7)
- **deps:** update dependency @types/react to v18.0.26 (63cf8010)

## Version v3.4.2 (2022-12-16)

### Fixes

- **codegen:** PUBLIC_URL fallback (4686cc2e)

### Ops and CI/CD

- **deps:** bump decode-uri-component from 0.2.0 to 0.2.2 (f39c2533)

### Chores and tidying

- **deps:** update dependency typescript to v4.9.4 (e462bcce)
- **deps:** update dependency @types/node to v18.11.15 (a04fa68c)
- **deps:** update dependency @trivago/prettier-plugin-sort-imports to v4 (765d8ef2)
- **deps:** update dependency highlight.js to v11.7.0 (fbc82e1b)
- **deps:** update dependency @typescript-eslint/parser to v5.46.1 (29d773ed)
- **deps:** update dependency @types/jest to v29.2.4 (8cc3250b)
- **deps:** update dependency react-icons to v4.7.1 (cbd66ab9)
- **deps:** update dependency fs-extra to v11 (1f4820c2)
- **deps:** update dependency react-tooltip to v4.5.1 (239e1b7f)
- **deps:** update dependency marked to v4.2.4 (112f43a1)
- **deps:** update dependency eslint to v8.29.0 (df28e46a)
- **deps:** update dependency eslint-plugin-react to v7.31.11 (064c9038)

## Version v3.4.1 (2022-11-15)

### Fixes

- **radar:** angle arc colors (5a45f204)

## Version v3.4.0 (2022-11-15)

### Features

- support items filtering by tags on UI (f54d4937)

### Fixes

- **buttons:** use pointer cursor (8d1ddfc4)
- use same order of quadrants for radar and grid visualization (36b63db1)
- **nth-check:** remove vulnerability by overriding @svgr/webpack (97a74bb1)

### Ops and CI/CD

- **deps:** bump loader-utils from 2.0.2 to 2.0.4 (92ce9174)
- **deps:** bump minimatch and recursive-readdir (796355ed)

### Chores and tidying

- **deps:** update dependency sass to v1.56.1 (bc5a45dc)
- **deps:** update dependency marked to v4.2.2 (3000b839)
- **deps:** update dependency sanitize-html to v2.7.3 (5cd247be)
- **deps:** update dependency eslint to v8.27.0 (3b3b2103)
- **deps:** update dependency @types/node to v18.11.9 (341ff9dc)
- **deps:** update dependency react-router-dom to v6.4.3 (d4fe1046)
- **deps:** update dependency husky to v8.0.2 (26440a80)
- **deps:** update dependency @types/react to v18.0.25 (0a21d44b)
- **deps:** update dependency react-icons to v4.6.0 (3af1916c)
- **deps:** update dependency @types/react-dom to v18.0.9 (f7453063)
- **deps:** update dependency @types/jest to v29.2.3 (159b5c2c)
- **deps:** update dependency @typescript-eslint/parser to v5.43.0 (a754d31e)
- **deps:** update dependency @trivago/prettier-plugin-sort-imports to v3.4.0 (369b1c97)
- **deps:** update dependency @svgr/webpack to v6.5.1 (838c8099)
- **deps:** update dependency react-tooltip to v4.5.0 (5ffa9892)
- **deps:** update dependency @typescript-eslint/parser to v5.40.0 (c119d67f)
- **deps:** update dependency react-tooltip to v4.3.0 (c8a5c725)
- **deps:** update dependency sass to v1.55.0 (29fd1506)
- **deps:** update dependency eslint-plugin-react to v7.31.10 (4b7fab4e)
- **deps:** update dependency eslint to v8.25.0 (bbb4b15c)
- **deps:** update dependency yaml to v2.1.3 (c223a9b3)
- **deps:** update dependency marked to v4.1.1 (d6ce0f0b)
- **deps:** update dependency typescript to v4.8.4 (5bb99efc)
- **deps:** update dependency @types/react to v18.0.21 (474e9556)
- **deps:** update dependency react-router-dom to v6.4.2 (3c83b3f3)
- **deps:** update dependency sanitize-html to v2.7.2 (81ac9bf6)
- **deps:** update dependency @types/jest to v29.1.2 (44656d0a)

### Other

- Add Run the Prepare Script (ee0bec6c)
- No longer necessary to have quadrant subfolders? (1e814249)

## Version v3.3.4 (2022-09-13)

### Fixes

- **build:** check if radar folder exists (48cf4b53)
- **build:** create random hash for cache invalidation #209 (af9d7c87)
- **build:** export REACT_APP variables during build (4535ef3b)

### Documentation

- **readme:** remove yarn, fixes #162 (5e0158c2)

### Chores and tidying

- **deps:** update dependency classnames to v2.3.2 (a2843ad6)
- **codestyle:** cleanup and reformat (37c43712)

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
