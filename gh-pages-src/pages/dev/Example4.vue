<template>
  <div class="demo-page-wrap">
    <div>
      <h1 style="text-align: center;">Usage Example 4</h1>

      <b>Selected:</b> {{ selected || 'not chosen' }}.
      <br><br>

      <!--arrows-disable-instant-selection-->
      <cool-select
        ref="select"
        v-model="selected"
        :items="items"
        placeholder="Select name"
        @select="onSelect"
        @focus="onFocus"
        @blur="onBlur"
        @change-displayed-items="onChangeDisplayedItems"
      >
        <div
          v-if="displayedItems.length"
          slot="before-items-fixed"
          style="background: red;"
        >
          before-items-fixed
        </div>
        <div
          v-if="displayedItems.length"
          slot="before-items"
          style="background: red;"
        >
          before-items
        </div>
        <div
          v-if="displayedItems.length"
          slot="after-items"
          style="background: blue;"
        >
          after-items
        </div>
        <div
          v-if="displayedItems.length"
          slot="after-items-fixed"
          style="background: blue;"
        >
          after-items-fixed
        </div>
      </cool-select>
    </div>
  </div>
</template>

<script>
import { CoolSelect } from '~/main'

export default {
  components: { CoolSelect },
  data () {
    const items = []

    for (let i = 1; i <= 12; i++) {
      items.push('Item ' + i)
    }

    return {
      selected: items[1],
      items,
      displayedItems: []
    }
  },
  methods: {
    onChangeDisplayedItems (items) {
      this.displayedItems = items
    },
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
