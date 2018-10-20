![](https://i.imgur.com/z7XdAkb.png?1)

## Demo + Documentation

https://iliyazelenko.github.io/vue-cool-select

## Features

- 2 themes: bootstrap 4, material design
- autocomplete
- asynchronous data
- slots

## Installation

`yarn add vue-cool-select` or `npm install --save vue-cool-select`

## Get started

1. Select theme
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

3. Use in template

```vue
<cool-select
  v-model="selected"
  :items="items"
/>
```

See examples [here](https://iliyazelenko.github.io/vue-cool-select).

#### TODO
- Control through arrows and Tab
- Loading indicator
- Tests
