<template>
  <div class="demo-page-wrap">
    <div>
      <h1 style="text-align: center;">Usage Example 4</h1>

      <b>Selected:</b> {{ selected || 'not chosen' }}.
      <br><br>

      <button
        @click="search = ''"
      >
        Set search
      </button>

      Search: "{{ search }}"

      <!--disable-first-item-select-on-enter :search.sync="search"-->
      <cool-select
        ref="select"
        v-model="selected"
        :items="items"
        :search-text.sync="search"
        :input-styles="{
          border: '1px solid red',
          backgroundColor: 'yellow'
        }"
        arrows-disable-instant-selection
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
import { CoolSelect } from '../../main'

export default {
  components: { CoolSelect },
  data () {
    const items = []

    for (let i = 1; i <= 42; i++) {
      items.push('Item ' + i)
    }

    return {
      search: '',
      selected: items[1],
      items,
      displayedItems: items
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
