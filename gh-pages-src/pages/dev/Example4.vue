<template>
  <div class="demo-page-wrap">
    <div>
      <h1 style="text-align: center;">Usage Example 4</h1>

      <b>Selected:</b> {{ selected || 'not chosen' }}.
      <br><br>

      <!--arrows-disable-instant-selection-->
      <cool-select
        v-model="selected"
        :items="items"
        item-value="id"
        item-text="name"
        placeholder="Select name"
        @select="onSelect"
        @focus="onFocus"
        @blur="onBlur"
      >
        <div
          slot="before-items-fixed"
          style="background: red;"
        >
          before-items-fixed
        </div>
        <div
          slot="before-items"
          style="background: red;"
        >
          before-items
        </div>
        <div
          slot="after-items"
          style="background: blue;"
        >
          after-items
        </div>
        <div
          slot="after-items-fixed"
          style="background: blue;"
        >
          after-items-fixed
        </div>
        <div slot="no-data" />
      </cool-select>
    </div>
  </div>
</template>

<script>
import { CoolSelect } from '~/main'

export default {
  components: { CoolSelect },
  data () {
    const items = [
      {
        id: '1',
        name: 'Product 1',
        price: '30.0'
      },
      {
        id: '2',
        name: 'Product 2',
        price: '100.0'
      },
      {
        id: '3',
        name: 'Product 3',
        price: '150.0'
      },
      {
        id: '4',
        name: 'Product 4',
        price: '120.0'
      },
      {
        id: '4',
        name: 'Product 4',
        price: '120.0'
      },
      {
        id: '4',
        name: 'Product 4',
        price: '120.0'
      },
      {
        id: '4',
        name: 'Product 4',
        price: '120.0'
      },
      {
        id: '3',
        name: 'Product 3',
        price: '150.0'
      },
      {
        id: '4',
        name: 'Product 4',
        price: '120.0'
      },
      {
        id: '4',
        name: 'Product 4',
        price: '120.0'
      },
      {
        id: '4',
        name: 'Product 4',
        price: '120.0'
      },
      {
        id: '4',
        name: 'Product 4',
        price: '120.0'
      }
    ]

    return {
      selected: items[1],
      items
    }
  },
  methods: {
    onSelect (selected) {
      console.log('onSelect', selected, this.selected)
    },
    onBlur () {
      console.log('blur')
    },
    onFocus () {
      console.log('focus')
    }
  }
}
</script>
