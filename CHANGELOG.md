## [3.5.2](https://github.com/iliyaZelenko/vue-cool-select/compare/v3.5.1...v3.5.2) (2020-02-04)


### Bug Fixes

* pin core-js to 3.4.6 ([081a676](https://github.com/iliyaZelenko/vue-cool-select/commit/081a676))
* **types:** incorrect work with config strict: true ([0f1d2f8](https://github.com/iliyaZelenko/vue-cool-select/commit/0f1d2f8)), closes [#315](https://github.com/iliyaZelenko/vue-cool-select/issues/315)
* **types:** incorrect work with config strict: true ([8fbb9a5](https://github.com/iliyaZelenko/vue-cool-select/commit/8fbb9a5))

## [3.5.1](https://github.com/iliyaZelenko/vue-cool-select/compare/v3.5.0...v3.5.1) (2019-11-12)


### Bug Fixes

* input event on component's created hook. The items prop is not required when simple-input prop ([b2c17b4](https://github.com/iliyaZelenko/vue-cool-select/commit/b2c17b4))

# [3.5.0](https://github.com/iliyaZelenko/vue-cool-select/compare/v3.4.0...v3.5.0) (2019-11-06)


### Bug Fixes

* **component:** fixes [#254](https://github.com/iliyaZelenko/vue-cool-select/issues/254) - Remove async from showMenu() ([223160f](https://github.com/iliyaZelenko/vue-cool-select/commit/223160f))

# [3.4.0](https://github.com/iliyaZelenko/vue-cool-select/compare/v3.3.0...v3.4.0) (2019-11-04)


### Features

* **props:** simple-input prop ([4c534cc](https://github.com/iliyaZelenko/vue-cool-select/commit/4c534cc))

# [3.3.0](https://github.com/iliyaZelenko/vue-cool-select/compare/v3.2.0...v3.3.0) (2019-10-24)


### Features

* **component:** add prop to toggle full input selection on click/focus ([dc1b997](https://github.com/iliyaZelenko/vue-cool-select/commit/dc1b997))

# [3.2.0](https://github.com/iliyaZelenko/vue-cool-select/compare/v3.1.0...v3.2.0) (2019-10-17)


### Features

* **menu:** new props: menuDynamicPosition, menuDefaultPosition. Smart position for menu ([6a30ed3](https://github.com/iliyaZelenko/vue-cool-select/commit/6a30ed3)), closes [#228](https://github.com/iliyaZelenko/vue-cool-select/issues/228) [#234](https://github.com/iliyaZelenko/vue-cool-select/issues/234)

# [3.1.0](https://github.com/iliyaZelenko/vue-cool-select/compare/v3.0.2...v3.1.0) (2019-09-30)


### Features

* **plugin:** auto-install for CDN usage (script tag) ([2174ad1](https://github.com/iliyaZelenko/vue-cool-select/commit/2174ad1)), closes [#213](https://github.com/iliyaZelenko/vue-cool-select/issues/213)

## [3.0.2](https://github.com/iliyaZelenko/vue-cool-select/compare/v3.0.1...v3.0.2) (2019-09-18)


### Bug Fixes

* **ssr:** access window only on client ([84c042b](https://github.com/iliyaZelenko/vue-cool-select/commit/84c042b))

## [3.0.1](https://github.com/iliyaZelenko/vue-cool-select/compare/v3.0.0...v3.0.1) (2019-09-18)


### Bug Fixes

* **types:** incorrect type setting fixed ([e13ba79](https://github.com/iliyaZelenko/vue-cool-select/commit/e13ba79))

# [3.0.0](https://github.com/iliyaZelenko/vue-cool-select/compare/v2.11.1...v3.0.0) (2019-09-18)


### Bug Fixes

* **getitemvalue:** improve comparison to null and undefined ([a53dfe4](https://github.com/iliyaZelenko/vue-cool-select/commit/a53dfe4)), closes [#199](https://github.com/iliyaZelenko/vue-cool-select/issues/199)


### Features

* **build:** added rollup, postcss ([d901fd9](https://github.com/iliyaZelenko/vue-cool-select/commit/d901fd9))
* **classes:** iZ-select--with-value class if select has value ([c978a76](https://github.com/iliyaZelenko/vue-cool-select/commit/c978a76))
* **component:** different sizes ([1e498e5](https://github.com/iliyaZelenko/vue-cool-select/commit/1e498e5))
* **component:** improve the `inputStyles` logic and height style ([1aeb01d](https://github.com/iliyaZelenko/vue-cool-select/commit/1aeb01d))
* **plugin's options:** the text option to set custom no data text ([9698298](https://github.com/iliyaZelenko/vue-cool-select/commit/9698298))
* **props:** arrowsDisableInstantSelection prop ([59e9af4](https://github.com/iliyaZelenko/vue-cool-select/commit/59e9af4)), closes [#9](https://github.com/iliyaZelenko/vue-cool-select/issues/9)
* **props:** discard the loadingIndicator prop ([0c18790](https://github.com/iliyaZelenko/vue-cool-select/commit/0c18790))
* **sizes:** changed the idea about different sizes ([1abdf8d](https://github.com/iliyaZelenko/vue-cool-select/commit/1abdf8d))


### BREAKING CHANGES

* **props:** `loadingIndicator` prop no longer exists
* **props:** `arrowsDisableInstantSelection` now is `true`, previously there was the `false` value, which led to the immediate selection of a menu
item. I decided that this was not the best practice.
* **component:** the sizes are adjusted to fit the bootstrap styles perfectly, maybe they changed a
little
* **build:** new build system (styles separated)

## [2.11.1](https://github.com/iliyaZelenko/vue-cool-select/compare/v2.11.0...v2.11.1) (2019-09-13)


### Bug Fixes

* **input:** do not submit the form if there was a menu choice (if the component is inside the form) ([50bc64d](https://github.com/iliyaZelenko/vue-cool-select/commit/50bc64d)), closes [#196](https://github.com/iliyaZelenko/vue-cool-select/issues/196)

# [2.11.0](https://github.com/iliyaZelenko/vue-cool-select/compare/v2.10.2...v2.11.0) (2019-09-12)


### Features

* **input:** update component to ignore chrome autofill ([b64671f](https://github.com/iliyaZelenko/vue-cool-select/commit/b64671f))

## [2.10.2](https://github.com/iliyaZelenko/vue-cool-select/compare/v2.10.1...v2.10.2) (2019-03-29)


### Bug Fixes

* **component:** set tabindex to 0 instead of 1 ([ebe593e](https://github.com/iliyaZelenko/vue-cool-select/commit/ebe593e)), closes [#98](https://github.com/iliyaZelenko/vue-cool-select/issues/98)

## [2.10.1](https://github.com/iliyaZelenko/vue-cool-select/compare/v2.10.0...v2.10.1) (2019-03-29)


### Bug Fixes

* **component:** fixed opening the menu when you click again ([046689f](https://github.com/iliyaZelenko/vue-cool-select/commit/046689f))

# [2.10.0](https://github.com/iliyaZelenko/vue-cool-select/compare/v2.9.0...v2.10.0) (2019-03-29)


### Bug Fixes

* **component:** fix circular call for methods ([03053bd](https://github.com/iliyaZelenko/vue-cool-select/commit/03053bd))
* **component:** fix tab navigation ([a03694b](https://github.com/iliyaZelenko/vue-cool-select/commit/a03694b)), closes [#98](https://github.com/iliyaZelenko/vue-cool-select/issues/98)
* **component:** when you clear the elements, the selected element is not cleared ([b184378](https://github.com/iliyaZelenko/vue-cool-select/commit/b184378)), closes [#42](https://github.com/iliyaZelenko/vue-cool-select/issues/42)


### Features

* **props:** added inputForTextClass prop ([ddb2c32](https://github.com/iliyaZelenko/vue-cool-select/commit/ddb2c32)), closes [#90](https://github.com/iliyaZelenko/vue-cool-select/issues/90)
* **slots:** added 4 new slots for input ([3f892e0](https://github.com/iliyaZelenko/vue-cool-select/commit/3f892e0)), closes [#98](https://github.com/iliyaZelenko/vue-cool-select/issues/98)

# [2.9.0](https://github.com/iliyaZelenko/vue-cool-select/compare/v2.8.0...v2.9.0) (2019-03-17)


### Bug Fixes

* **component:** when you clear the elements, the selected element is not cleared ([381ddcd](https://github.com/iliyaZelenko/vue-cool-select/commit/381ddcd)), closes [#42](https://github.com/iliyaZelenko/vue-cool-select/issues/42)


### Features

* **props:** added inputForTextClass prop ([3be99d8](https://github.com/iliyaZelenko/vue-cool-select/commit/3be99d8)), closes [#90](https://github.com/iliyaZelenko/vue-cool-select/issues/90)

# [2.8.0](https://github.com/iliyaZelenko/vue-cool-select/compare/v2.7.0...v2.8.0) (2019-03-17)


### Features

* **items menu:** added scrollToItemIfNeeded with true by default ([aec02ef](https://github.com/iliyaZelenko/vue-cool-select/commit/aec02ef)), closes [#50](https://github.com/iliyaZelenko/vue-cool-select/issues/50)
* **props:** added `input-styles` prop for custom styles on input ([472d176](https://github.com/iliyaZelenko/vue-cool-select/commit/472d176)), closes [#2](https://github.com/iliyaZelenko/vue-cool-select/issues/2)
* **props:** added new prop disableFirstItemSelectOnEnter ([ef56833](https://github.com/iliyaZelenko/vue-cool-select/commit/ef56833)), closes [#53](https://github.com/iliyaZelenko/vue-cool-select/issues/53)

# [2.7.0](https://github.com/iliyaZelenko/vue-cool-select/compare/v2.6.1...v2.7.0) (2019-03-08)


### Features

* **items menu:** added scrollToItemIfNeeded with true by default ([cdaa072](https://github.com/iliyaZelenko/vue-cool-select/commit/cdaa072)), closes [#50](https://github.com/iliyaZelenko/vue-cool-select/issues/50)
* **props:** added new prop disableFirstItemSelectOnEnter ([1483b9e](https://github.com/iliyaZelenko/vue-cool-select/commit/1483b9e)), closes [#53](https://github.com/iliyaZelenko/vue-cool-select/issues/53)
