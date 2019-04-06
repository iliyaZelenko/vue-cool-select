  <p align="center">
    <a href="https://codecov.io/gh/iliyaZelenko/vue-cool-select">
      <img src="https://img.shields.io/codecov/c/github/iliyaZelenko/vue-cool-select.svg" alt="Coverage">
    </a>
    <a href="https://www.npmjs.com/package/vue-cool-select">
      <img src="https://img.shields.io/npm/dm/vue-cool-select.svg" alt="Downloads">
    </a>
    <a href="https://www.npmjs.com/package/vue-cool-select">
      <img src="https://img.shields.io/npm/v/vue-cool-select.svg" alt="Version">
    </a>
    <a href="https://www.npmjs.com/package/vue-cool-select">
      <img src="https://img.shields.io/npm/l/vue-cool-select.svg" alt="License">
    </a>
    <a href="https://circleci.com/gh/iliyaZelenko/vue-cool-select">
      <img src="https://circleci.com/gh/iliyaZelenko/vue-cool-select.svg?style=shield" alt="CircleCI Build Status">
    </a>
    <a href="https://lgtm.com/projects/g/iliyaZelenko/vue-cool-select/context:javascript">
      <img alt="Language grade: JavaScript" src="https://img.shields.io/lgtm/grade/javascript/g/iliyaZelenko/vue-cool-select.svg?logo=lgtm&logoWidth=18" />
    </a>
    <a href="https://codebeat.co/projects/github-com-iliyazelenko-vue-cool-select-master">
      <img alt="codebeat badge" src="https://codebeat.co/badges/a6d9cfc8-529e-48c7-ae04-7d69fe6b1239" />
    </a>
    <a href="https://standardjs.com/">
      <img alt="codebeat badge" src="https://badgen.net/badge/code%20style/standard/f2a" />
    </a>
  </p>

# [Flexible select](https://iliyazelenko.github.io/vue-cool-select) [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Vue%20select%20component%20with%20autocomplete,%20slots,%20bootstrap%20and%20material%20design%20themes.&url=https://github.com/iliyaZelenko/vue-cool-select&via=IlyaZelenko&hashtags=vue,bootstrap,developers,github,html,js,web,npm,material-design)

<div style="text-align: center">
  <img src="https://i.imgur.com/z7XdAkb.png?3" width="210px;">
  <img src="https://i.imgur.com/Ko1XsvT.png" width="210px;">
  <img src="https://i.imgur.com/FeOD4Go.png" width="210px;">
  <img src="https://i.imgur.com/38xQWCg.png" width="210px;">
</div>

## [Demos + Documentation](https://iliyazelenko.github.io/vue-cool-select)

[![](https://i.imgur.com/b7wxLPT.png)](https://iliyazelenko.github.io/vue-cool-select)

## Features

- 2 themes: Bootstrap 4 (equal styles), Material Design
- autocomplete (you can use custom search)
- keyboard controls (not only through the arrows)
- slots (13) allow content to be changed anywhere
- events (7) will let you know about everything
- props (24) allow you to customize a component in a variety of ways
- loading indicator (helpful for REST requests)
- validation, state of error and success
- support on mobile devices
- disabled and readonly
- smile and large sizes (as in bootstrap)
- ability to set styles for a component
- TypeScript support

Write your suggestions, glad to add.

## Installation

`yarn add vue-cool-select` or `npm install --save vue-cool-select`

## Get started

1. Import and select a theme:
```js
import { CoolSelectPlugin } from 'vue-cool-select'

// paste the line below only if you need theme "bootstrap"
import 'vue-cool-select/dist/themes/bootstrap.css'
// paste the line below only if you need theme "material-design"
import 'vue-cool-select/dist/themes/material-design.css'

Vue.use(CoolSelectPlugin)
```

2. Use inside inside another component:
```js
import { CoolSelect } from 'vue-cool-select'

export default {
  components: { CoolSelect },
  data () {
    return {
      items: ['Item 1', 'Item 2', 'Item 3'],
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

Documentation and examples [here](https://iliyazelenko.github.io/vue-cool-select).

#### TODO
- multi-select
- 100% tests coverage

I am happy to add something or improve, you can write what you want to see.
I also have more motivation to work if you give a star.
