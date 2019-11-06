  <p align="center">
    <a href="https://codecov.io/gh/iliyaZelenko/vue-cool-select" rel="noopener noreferrer" target="_blank">
      <img src="https://img.shields.io/codecov/c/github/iliyaZelenko/vue-cool-select.svg" alt="Coverage">
    </a>
    <a href="https://www.npmjs.com/package/vue-cool-select" rel="noopener noreferrer" target="_blank">
      <img src="https://img.shields.io/npm/dm/vue-cool-select.svg" alt="Downloads">
    </a>
    <a href="https://www.npmjs.com/package/vue-cool-select" rel="noopener noreferrer" target="_blank">
      <img src="https://img.shields.io/npm/v/vue-cool-select.svg" alt="Version">
    </a>
    <a href="https://www.npmjs.com/package/vue-cool-select" rel="noopener noreferrer" target="_blank">
      <img src="https://img.shields.io/npm/l/vue-cool-select.svg" alt="License">
    </a>
    <a href="https://circleci.com/gh/iliyaZelenko/vue-cool-select" rel="noopener noreferrer" target="_blank">
      <img src="https://circleci.com/gh/iliyaZelenko/vue-cool-select.svg?style=shield" alt="CircleCI Build Status">
    </a>
    <a href="https://lgtm.com/projects/g/iliyaZelenko/vue-cool-select/context:javascript" rel="noopener noreferrer" target="_blank">
      <img alt="Language grade: JavaScript" src="https://img.shields.io/lgtm/grade/javascript/g/iliyaZelenko/vue-cool-select.svg?logo=lgtm&logoWidth=18" />
    </a>
    <a href="https://codebeat.co/projects/github-com-iliyazelenko-vue-cool-select-master" rel="noopener noreferrer" target="_blank">
      <img alt="codebeat badge" src="https://codebeat.co/badges/a6d9cfc8-529e-48c7-ae04-7d69fe6b1239" />
    </a>
    <a href="https://standardjs.com/" rel="noopener noreferrer" target="_blank">
      <img alt="codebeat badge" src="https://badgen.net/badge/code%20style/standard/f2a" />
    </a>
    <a href="https://www.npmjs.com/package/vue-cool-select" rel="noopener noreferrer" target="_blank">
      <img src="https://img.shields.io/npm/dt/vue-cool-select?color=red&label=total%20downloads" alt="Downloads">
    </a>
    <a href="https://github.com/iliyaZelenko/vue-cool-select/graphs/contributors" rel="noopener noreferrer" target="_blank">
      <img src="https://img.shields.io/github/contributors/iliyaZelenko/vue-cool-select.svg" alt="Contributors">
    </a>
  </p>

The current version is `3.x`, if you are looking for `2.x`, you can find [it here](README_2VERSION.md) (also, see [breaking changes](https://github.com/iliyaZelenko/vue-cool-select/blob/master/CHANGELOG.md#300-2019-09-18)).

# [Flexible select](https://iliyazelenko.github.io/vue-cool-select) [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Vue%20select%20component%20with%20autocomplete,%20slots,%20bootstrap%20and%20material%20design%20themes.&url=https://github.com/iliyaZelenko/vue-cool-select&via=IlyaZelenko&hashtags=vue,bootstrap,developers,github,html,js,web,npm,material-design)

<div style="text-align: center">
  <img src="https://i.imgur.com/z7XdAkb.png?3" width="210px;">
  <img src="https://i.imgur.com/Ko1XsvT.png" width="210px;">
  <img src="https://i.imgur.com/FeOD4Go.png" width="210px;">
  <img src="https://i.imgur.com/38xQWCg.png" width="210px;">
</div>

## [Demo + Documentation](https://iliyazelenko.github.io/vue-cool-select)

[![](https://i.imgur.com/b7wxLPT.png)](https://iliyazelenko.github.io/vue-cool-select)

## Features

- no dependencies
- props (30) allow you to customize a component in a various ways
- slots (13) allow content to be changed anywhere
- events (8) will let you know about everything
- autocomplete (you can use custom search, you can also disable the search input)
- keyboard controls (not only through the arrows)
- support on mobile devices
- validation, state of error and success
- disabled and readonly
- small and large sizes (as in bootstrap)
- the ability to set your styles, you can write theme from scratch. 2 themes: Bootstrap 4 (equal styles), Material Design
- TypeScript support
- tab navigation
- SSR (Server-Side Rendering)

- auto determine the suitable position for the menu if it goes beyond the viewport

Write your suggestions, glad to add.

## Installation

`yarn add vue-cool-select` or `npm install --save vue-cool-select`

## Get started

### NPM

1. Import this plugin, css (theme) and add plugin via `Vue.use`:
```js
import { CoolSelectPlugin } from 'vue-cool-select'

// paste the line below only if you need "bootstrap" theme
import 'vue-cool-select/dist/themes/bootstrap.css'
// paste the line below only if you need "material-design" theme
import 'vue-cool-select/dist/themes/material-design.css'
// you can also import your theme

Vue.use(CoolSelectPlugin)
```

2. Use inside another component:
```js
import { CoolSelect } from 'vue-cool-select'

export default {
  components: { CoolSelect },
  data () {
    return {
      // simple example of items
      items: ['Item 1', 'Item 2', 'Item 3'],
      // there will be a selected item
      selected: null
    }
  }
}
```

3. Add to `<template>`:

```vue
<cool-select
  v-model="selected"
  :items="items"
/>
```

### Browser (CDN)

Include vue-cool-select in the page.

```html
<script src="https://unpkg.com/vue-cool-select"></script>

<!-- paste the line below only if you need "bootstrap" theme -->
<link rel="stylesheet" href="https://unpkg.com/vue-cool-select/dist/themes/bootstrap.css">
<!-- paste the line below only if you need "material-design" theme -->
<link rel="stylesheet" href="https://unpkg.com/vue-cool-select/dist/themes/material-design.css">
```

If Vue is detected in the Page, the plugin is installed automatically.

---

Documentation and examples [here](https://iliyazelenko.github.io/vue-cool-select).

#### TODO
- multi-select
- 100% tests coverage

I am happy to add something or improve, you can write what you want to see.
I also have more motivation to work if you give a star, thanks! :smile:
