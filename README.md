# Flexible select, you can use slots and 2 style themes.

<div style="text-align: center">
  <img src="https://i.imgur.com/z7XdAkb.png?3" width="350px;">
  <img src="https://i.imgur.com/Ko1XsvT.png" width="350px;">
</div>

## [Demo + Documentation](https://iliyazelenko.github.io/vue-cool-select)

https://iliyazelenko.github.io/vue-cool-select

[![](https://i.imgur.com/XqHoHxM.png)](https://iliyazelenko.github.io/vue-cool-select)

## Features

- 2 themes: bootstrap 4, material design
- autocomplete
- asynchronous data
- slots

## Installation

`yarn add vue-cool-select` or `npm install --save vue-cool-select`

## Get started

1. Import and select theme
  ```js
  import VueSelect from 'vue-cool-select'
  
  Vue.use(VueSelect, {
    theme: 'bootstrap' // or 'material-design'
  })
  ```

2. Use inside component
```js
import { CoolSelect } from 'vue-cool-select'

export default {
  components: { CoolSelect }
  // ...
}
```

3. Add to template
```vue
<cool-select
  v-model="selected"
  :items="items"
/>
```

Documentation and examples [here](https://iliyazelenko.github.io/vue-cool-select).

#### TODO
- Control through arrows and Tab
- Loading indicator
- Tests
