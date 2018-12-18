<template>
  <div
    ref="IZ-select"
    class="IZ-select"
    tabindex="0"
    @keydown.up="selectByArrow"
    @keydown.down="selectByArrow"
    @keydown.enter="focused = !focused"
    @keydown.tab.esc="focused = false"
  >
    <div
      ref="IZ-select__input"
      :class="{
        'IZ-select__input': true,
        'IZ-select__input--focused': focused,
        'IZ-select__input--has-menu': hasMenu,
        'IZ-select__input--has-error': hasError,
        'IZ-select__input--selection-slot': showSelectionSlot,
        'IZ-select__input--disabled': disabled,
        'IZ-select__input--readonly': readonly
      }"
      @mousedown="setFocus"
    >
      <slot
        v-if="showSelectionSlot"
        :item="selectedItem"
        name="selection"
      />

      <input
        ref="IZ-select__input-for-text"
        v-bind="inputElCustomAttributes"
        :value="inputValue"
        :placeholder="placeholder"
        :style="inputForTextStyles"
        :disabled="disableSearch || disabled"
        :readonly="readonly"
        type="text"
        role="combobox"
        autocomplete="off"
        @keyup="onSearchKeyUp"
        @keydown="onSearchKeyDown"
        @input="onSearch"
      >
    </div>

    <transition name="fade">
      <div
        v-if="hasMenu"
        ref="IZ-select__menu"
        :style="menuDynamicStyles"
        :class="{
          'IZ-select__menu': true,
          'IZ-select__menu--disable-search': disableSearch
        }"
        @scroll="onScroll"
      >
        <div
          v-for="(item, i) in itemsComputed"
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
        <!-- TODO до этого тут был span, не проверил на div'e -->
        <div
          v-if="!itemsComputed.length && !loading"
          class="IZ-select__no-data"
        >
          <slot name="no-data">
            No data avalidable
          </slot>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div
        v-show="errorMessage"
        class="IZ-select__error"
      >
        <slot
          :errorMessage="errorMessage"
          name="error"
        >
          {{ errorMessage }}
        </slot>
      </div>
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
      type: [Array, String],
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
    // invalid: {
    //   type: Boolean,
    // },
    errorMessage: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false,
      note: 'disable the select'
    },
    readonly: {
      type: Boolean,
      default: false,
      note: 'readonly state'
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
    inputElCustomAttributes: {
      type: Object,
      default: () => ({}),
      note: 'you can pass your attributes to the input element'
    },
    disableSearch: {
      type: Boolean,
      default: false,
      note: 'disable search input element'
    },
    disableFilteringBySearch: {
      type: Boolean,
      default: false,
      note: 'disable filtering by search (you can use search for manually getting items)'
    },
    resetSearchOnBlur: {
      type: Boolean,
      default: true,
      note: 'reset search on blur event'
    }
  },
  data: () => ({
    arrowsIndex: null,
    focused: false,
    selectedItem: null,
    itemsLimit: 20,
    search: '' // null
  }),
  computed: {
    itemsComputed () {
      let items = this.items

      if (typeof this.items === 'string') {
        items = JSON.parse(this.items)
      }

      return this.filteredBySearchItems(items)
    },
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
    },
    hasError () {
      return !!this.errorMessage
    },
    isMobile () {
      // return window.innerWidth + window.innerHeight <= 1800
      return window.innerWidth <= 900 && window.innerHeight <= 900
    },
    menuDynamicStyles () {
      let obj = {
        // ширина такая же как и у поля ввода
        'width': this.$refs['IZ-select__input'].offsetWidth + 'px',
        'pointer-events': !this.hasMenu ? 'none' : 'auto'
      }

      if (this.disableSearch) {
        obj.top = this.$refs['IZ-select__input'].offsetTop + 'px'
      }

      return obj
    },
    // get item index from arr
    selectedItemIndex () {
      for (let itemKey in this.itemsComputed) {
        if (this.selectedItem === this.itemsComputed[itemKey] && this.itemsComputed.hasOwnProperty(itemKey)) {
          return itemKey
        }
      }

      return null
    }
  },
  watch: {
    value () {
      this.setSelectedItemByValue()
    },
    items () {
      this.setSelectedItemByValue()
    },
    selectedItem () {
      this.$emit('input', this.currentItemValue)
    },
    focused () {
      // TODO я знаю что это ламающее изменение, но лучше пусть немного пользователей пострадают чем это будет запутывать людей
      // this.$emit('focus', this.focused)

      if (this.focused) {
        this.$emit('focus')
      } else {
        this.$emit('blur')

        if (this.resetSearchOnBlur) {
          this.search = ''
        }
      }
    }
  },
  created () {
    // TODO возможно стоит убрать чтобы не вызывался лишний setSelectedItemByValue
    this.setSelectedItemByValue()

    // listener for window
    window.addEventListener('mousedown', ({ target }) => {
      const select = this.$refs['IZ-select']

      if (!select.contains(target)) {
        this.focused = false
      }
    })
  },
  methods: {
    selectByArrow (e) {
      if (this.arrowsIndex === null) {
        // если arrowsIndex не был задан, то ставит из выбранного элемента или из -1 (не 0 чтобы когда вниз нажимаешь, то не выбирался второй элемент)
        this.arrowsIndex = this.selectedItemIndex || -1
      }

      if (e.key === 'ArrowDown') {
        this.arrowsIndex++
      }
      if (e.key === 'ArrowUp') {
        this.arrowsIndex--
      }

      const end = this.itemsComputed.length - 1
      if (this.arrowsIndex < 0) {
        this.arrowsIndex = end
      }
      if (this.arrowsIndex > end) {
        this.arrowsIndex = 0
      }

      this.selectedItem = this.itemsComputed[this.arrowsIndex]

      e.preventDefault()
    },
    setFocus () {
      if (this.disabled || this.readonly) return

      // if search enabled
      if (!this.disableSearch) {
        // focus text input
        this.$refs['IZ-select__input-for-text'].focus()
      }

      // scroll to component input el
      // this.$refs['IZ-select__input'].scrollIntoView({
      //   behavior: 'smooth',
      //   // to top or bottom border
      //   block: this.isMobile ? 'start' : 'end'
      // })

      if (this.isMobile) {
        // scroll to component input el
        scrollTo({
          top: this.$refs['IZ-select__input'].offsetTop - 8,
          behavior: 'smooth'
        })
      }

      this.focused = true
    },
    onSelect (item) {
      this.selectedItem = item
      this.focused = false
      this.search = ''

      // TODO это выполняете перед input, поэтому в обработчике select то что в v-model будет не определенно
      this.$emit('select', item)
    },
    onSearchKeyDown (e) {
      // key === 'Delete' ||
      if (!e.target.value && e.key === 'Backspace') {
        this.selectedItem = null
      }
      this.setFocus()
      this.$emit('keydown', e)
    },
    onSearchKeyUp (e) {
      this.$emit('keyup', e)
    },
    onSearch (e) {
      this.selectedItem = null
      // e.inputType: "deleteContentBackward"
      // if (!this.focused) this.focused = true
      // console.log(e.target.value)
      // if (!e.target.value) {
      //   this.selectedItem = null
      // }

      this.search = e.target.value
      this.$emit('search', this.search)
    },
    onScroll (event) {
      this.$emit('scroll', event)

      if (this.itemsLimit >= this.itemsComputed.length) return

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

      const keys = Object.keys(item)

      if (keys.length === 1) {
        return item[keys[0]]
      }

      return item
    },
    getItemValue (item) {
      if (!item) return null
      if (this.itemValue) return item[this.itemValue]

      const keys = Object.keys(item)

      if (keys.length === 1) {
        return item[keys[0]]
      }

      return item
    },
    // ставит выбраный элемент по значению
    setSelectedItemByValue () {
      if (!this.items.length) return

      this.selectedItem = this.itemsComputed.find(i =>
        this.getItemValue(i) === this.value
      )
    },
    // возвращает отфильтрованные итемы
    filteredBySearchItems (items) {
      if (!this.search || this.disableFilteringBySearch) return items

      return items.filter(i =>
        this.filter(i, this.search, this.getItemText(i))
      )
    }
  }
}
</script>
