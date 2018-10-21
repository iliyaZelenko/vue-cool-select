<template>
  <div class="IZ-select">
    <div
      ref="IZ-select__input"
      :class="{
        'IZ-select__input': true,
        'IZ-select__input--has-menu': hasMenu,
        'IZ-select__input--selection-slot': showSelectionSlot
      }"
      @click="onInputClick"
    >
      <slot
        v-if="showSelectionSlot"
        :item="selectedItem"
        name="selection"
      >
        <!---->
      </slot>

      <input
        ref="IZ-select__input-for-text"
        :value="inputValue"
        :placeholder="placeholder"
        :style="inputForTextStyles"
        type="text"
        role="combobox"
        autocomplete="off"
        @keyup="onSearchKeyUp"
        @input="onSearch"
      >
    </div>

    <transition name="fade">
      <div
        v-if="hasMenu"
        ref="IZ-select__menu"
        :style="{
          'min-width': this.$refs['IZ-select__input'].offsetWidth + 'px'
        }"
        class="IZ-select__menu"
        @scroll="onScroll"
      >
        <div
          v-for="(item, i) in computedItems"
          v-if="i < itemsLimit"
          :key="'IZ-item-' + i"
          :class="{
            'IZ-select__item': true,
            'IZ-select__item--selected': selectedItem === item
          }"
          @click="onSelect(item)"
        >
          <slot
            :item="item"
            name="item"
          >
            <span>
              {{ getItemText(item) }}
            </span>
          </slot>
        </div>
        <span
          v-if="!computedItems.length && !loading"
          class="IZ-select__no-data"
        >
          <slot name="no-data">
            No data avalidable
          </slot>
        </span>
      </div>
      {{ computedItems }}
    </transition>
  </div>
</template>

<script>
export default {
  name: 'VueSelect',
  introduction: 'an amazing select',
  description: `
  This \`select\` is amazing, you should _check_ it out 😊.
  `,
  token: `<cool-select v-model="selected" :items="items" />`,
  props: {
    value: {
      type: [Array, Object, String, Number, Boolean], // TODO set to null (any type) after issue fix
      // required: true,
      default: () => null,
      note: 'value for v-model'
    },
    items: {
      type: Array,
      required: true,
      note: 'array of suggestions (data fetched from backend, etc)'
    },
    itemText: {
      type: String,
      default: null, // 'text',
      // required: true,
      note: 'property in item for text'
    },
    itemValue: {
      type: String,
      default: null, // значит вернуть весь объект, 'value'
      note: 'property in item for value'
    },
    placeholder: {
      type: String,
      default: null,
      note: 'placeholder for input'
    },
    loading: {
      type: Boolean,
      default: false,
      note: 'display the loading indicator'
    },
    loadingIndicator: { // http://loadinggif.com/images/image-selection/3.gif
      type: String,
      default: 'https://i.imgur.com/fLYd7PN.gif',
      note: 'sets custom loading spinner/indicator. https://loading.io/'
    },
    filter: {
      type: Function,
      default: (item, queryText, itemText) => {
        const hasValue = val => val != null ? val : ''

        const text = hasValue(itemText)
        const query = hasValue(queryText)

        return text.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      },
      note: 'filter function for search'
    },
    disableFilteringBySearch: {
      type: Boolean,
      default: false,
      note: 'disable filtering by search (you can use search for manually getting items)'
    }
  },
  data: () => ({
    focused: false,
    selectedItem: null,
    itemsLimit: 20,
    search: '' // null
  }),
  computed: {
    inputValue () {
      // если указан слот selection, то не надо отображать текст в инпуте, он только мешает
      if (this.$scopedSlots.selection && this.search === '') return ''
      // если есть строка поиска, то пусть она там будет
      if (this.search !== '') return this.search

      // иначе пусть будет текст элемента или его значение
      return this.getItemText(this.selectedItem) || this.currentItemValue
    },
    currentItemValue () {
      return this.getItemValue(this.selectedItem)
    },
    computedItems () {
      return this.filteredBySearchItems
    },
    filteredBySearchItems () {
      if (!this.search || this.disableFilteringBySearch) return this.items

      return this.items.filter(i =>
        this.filter(i, this.search, this.getItemText(i))
      )
    },
    showSelectionSlot () {
      return this.$scopedSlots.selection && this.selectedItem && !this.search
    },
    inputForTextStyles () {
      if (this.loading) {
        return {
          'background-image': `url(${this.loadingIndicator})`
        }
      }

      return {}
    },
    hasMenu () {
      return this.focused && !this.loading
    }
  },
  watch: {
    value () {
      this.setSelectedItemByValue()
    },
    items (items) {
      // console.log(122)
      this.setSelectedItemByValue()
      // console.log(items, this.items)
    },
    selectedItem () {
      this.$emit('input', this.currentItemValue)
    },
    focused () {
      this.$emit('focus', this.focused)
    }
  },
  created () {
    this.setSelectedItemByValue()

    window.addEventListener('click', ({ target }) => {
      const itemsWrap = this.$refs['IZ-select__menu']
      const input = this.$refs['IZ-select__input']

      if (itemsWrap && !itemsWrap.contains(target) && !input.contains(target)) {
        this.focused = false
      }
    })
  },
  methods: {
    onInputClick () {
      this.$refs['IZ-select__input-for-text'].focus()
      this.focused = true
    },
    onSelect (item) {
      this.selectedItem = item
      this.focused = false
      this.search = ''

      this.$emit('select', item)
    },
    onSearchKeyUp (e) {
      if (!this.search && e.key === 'Backspace') {
        this.selectedItem = null
      }
    },
    onSearch (e) {
      // if (!this.focused) this.focused = true

      this.search = e.target.value
      this.$emit('search', this.search)
    },
    onScroll (event) {
      this.$emit('scroll', event)

      if (this.itemsLimit >= this.computedItems.length) return

      const content = event.target
      const showMoreItems = (
        content.scrollHeight -
        (content.scrollTop + content.clientHeight)
      ) < 200

      // если проскролил вниз то показать больше итемов
      if (showMoreItems) {
        this.itemsLimit += 20
      }
    },
    getItemText (item) {
      if (!item) return null
      if (this.itemText) return item[this.itemText]

      return item
    },
    getItemValue (item) {
      if (!item) return null
      if (this.itemValue) return item[this.itemValue]

      return item
    },
    setSelectedItemByValue () {
      this.selectedItem = this.items.find(i => this.getItemValue(i) === this.value)
    }
  }
}
</script>
