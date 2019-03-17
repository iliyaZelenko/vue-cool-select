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

- 2 themes: Bootstrap 4, Material Design
- autocomplete (you can use custom search)
- control through arrows
- slots (9)
- events (7)
- props (24)
- loading indicator (helpful for REST requests)
- validation
- support on mobile devices
- disabled and readonly

Write your suggestions, glad to add.

## Installation

`yarn add vue-cool-select` or `npm install --save vue-cool-select`

## Get started

1. Import and select a theme:
  ```js
  import VueSelect from 'vue-cool-select'
  
  Vue.use(VueSelect, {
    theme: 'bootstrap' // or 'material-design'
  })
  ```

2. Use inside inside another component:
```js
import { CoolSelect } from 'vue-cool-select'

export default {
  components: { CoolSelect },
  data () {
    return {
      items: [...],
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
- rebuild build system (rollup)
- 100% tests coverage

I am happy to add something or improve, you can write what you want to see.
I also have more motivation to work if you give a star.
