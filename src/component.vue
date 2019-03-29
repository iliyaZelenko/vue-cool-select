<template>
  <!---->
  <div
    ref="IZ-select"
    :tabindex="disableSearch ? 1 : -1"
    class="IZ-select"
    @keydown.up="onSelectByArrow"
    @keydown.down="onSelectByArrow"
    @keydown.enter="onEnter"
    @keydown.tab.esc="setBlured"
    @mousedown="onClick"
    @focus="onFocus"
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
      :style="inputStyles"
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
        :class="inputForTextClass"
        :disabled="disableSearch || disabled"
        :readonly="readonly"
        :tabindex="disableSearch ? -1 : 1"
        type="text"
        role="combobox"
        autocomplete="off"
        @keyup="onSearchKeyUp"
        @keydown="onSearchKeyDown"
        @input="onSearch"
        @focus="onFocus"
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
      >
        <slot name="before-items-fixed" />

        <div
          ref="IZ-select__menu-items"
          :style="{
            'max-height': menuItemsMaxHeight
          }"
          class="IZ-select__menu-items"
          @scroll="onScroll"
        >
          <slot name="before-items">
            <div style="height: 8px;" />
          </slot>

          <!--itemsComputedWithScrollLimit-->
          <div
            v-for="(item, i) in itemsComputed"
            v-show="i < scrollItemsLimitCurrent || (arrowsIndex && i <= arrowsIndex)"
            ref="items"
            :key="'IZ-item-' + i"
            :class="{
              'IZ-select__item': true,
              'IZ-select__item--selected': isItemSelected(item)
            }"
            @click="onClickSelectItem(item)"
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

          <div
            v-if="!itemsComputed.length && !loading"
            class="IZ-select__no-data"
          >
            <slot name="no-data">
              No data available
            </slot>
          </div>

          <slot name="after-items">
            <div style="height: 8px;" />
          </slot>
        </div>

        <slot name="after-items-fixed" />

        <div style="position: absolute; top: 0; left: 0; right: 0;">
          <slot name="before-items-fixed-absolute" />
        </div>
        <div style="position: absolute; bottom: 0; left: 0; right: 0;">
          <slot name="after-items-fixed-absolute" />
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
import { isObject, getOffsetSum } from './helpers'
import eventsListeners from './eventsListeners'
import props from './props'
import computed from './computed'

export default {
  name: 'VueSelect',
  introduction: 'an amazing select',
  description: `
  This \`select\` is amazing, you should _check_ it out 😊.
  `,
  token: `<cool-select v-model="selected" :items="items" />`,
  props,
  data () {
    return {
      wishShowMenu: false,
      arrowsIndex: null,
      focused: false,
      selectedItem: null,
      selectedItemByArrows: null,
      // readonly
      searchData: '',
      scrollItemsLimitCurrent: this.scrollItemsLimit,
      // addEventListener identifier
      mousedownListener: null
    }
  },
  computed,
  watch: {
    searchText (val) {
      this.setSearchData(val)
    },
    value () {
      this.setSelectedItemByValue()
    },
    items () {
      this.setSelectedItemByValue()
    },
    selectedItem () {
      this.selectedItemByArrows = null

      this.$emit('input', this.currentItemValue)
    },
    itemsComputed (items) {
      this.$emit('change-displayed-items', items)
    }
  },
  created () {
    if (this.eventEmitter) {
      this.eventEmitter.on('set-search', this.setSearchData)
    }

    // TODO возможно стоит убрать чтобы не вызывался лишний setSelectedItemByValue
    this.setSelectedItemByValue()

    // listener for window (see removeEventListener on beforeDestroy hook)
    this.mousedownListener = window.addEventListener('mousedown', ({ target }) => {
      const select = this.$refs['IZ-select']

      if (this.focused && select && !select.contains(target)) {
        this.setBlured()
      }
    })
  },
  beforeDestroy () {
    window.removeEventListener('mousedown', this.mousedownListener)
  },
  methods: {
    ...eventsListeners,
    getSearchData () {
      return this.searchData
    },
    setSearchData (val) {
      this.searchData = val

      this.$emit('update:search-text', val)
    },
    setInputFocused () {
      this.$refs['IZ-select__input-for-text'].focus()
    },
    setFocused () {
      if (this.focused || this.disabled || this.readonly) return

      // if search enabled
      if (!this.disableSearch) {
        // focus text input
        this.setInputFocused()
      }

      // scroll to component input el
      // this.$refs['IZ-select__input'].scrollIntoView({
      //   behavior: 'smooth',
      //   // to top or bottom border
      //   block: this.isMobile ? 'start' : 'end'
      // })

      if (this.allowMobileScroll && this.isMobile) {
        const { top } = getOffsetSum(this.$refs['IZ-select__input'])

        // scroll to component input el
        window.scrollTo({
          // this.$refs['IZ-select__input'].offsetTop - 8
          // (bug with position: relative; https://github.com/iliyaZelenko/vue-cool-select/issues/10)
          top: top - 8,
          behavior: 'smooth'
        })
      }

      this.focused = true

      this.showMenu()
      this.$emit('focus')
    },
    setBlured () {
      if (this.resetSearchOnBlur) {
        this.setSearchData('')
      }
      this.focused = false

      this.hideMenu()
      this.$refs['IZ-select__input-for-text'].blur()
      this.$emit('blur')
    },
    // TODO вызывать только в watch, в остальных местах убрать, там проверять если !== null, то вызывать
    fireSelectEvent (item) {
      this.selectedItemByArrows = null

      this.$nextTick(() => {
        this.$emit('select', item)
      })
    },
    getItemText (item) {
      if (!item) return null
      if (this.itemText) return item[this.itemText]

      if (isObject(item)) {
        const keys = Object.keys(item)

        if (keys.length === 1) {
          return item[keys[0]]
        }

        return item
      }

      return item
    },
    getItemValue (item) {
      if (!item) return null
      if (this.itemValue) return item[this.itemValue]

      if (isObject(item)) {
        const keys = Object.keys(item)

        if (keys.length === 1) {
          return item[keys[0]]
        }

        return item
      }

      return item
    },
    // ставит выбраный элемент по значению
    setSelectedItemByValue () {
      if (!this.items.length) {
        this.selectedItem = null

        return
      }

      this.selectedItem = this.itemsComputed.find(i => {
        // TODO вынести получение this.value в computed (оно только в этом методе пока)
        // сделать тут такую првоерку return this.getItemValue(i) === this.computedValue()

        // если "{}" (не массив, не функция, не null...)
        if (isObject(this.value)) {
          // значение из объекта this.value
          const valFromObjVal = this.getItemValue(this.value)

          return this.getItemValue(i) === valFromObjVal
        }

        return this.getItemValue(i) === this.value
      })
    },
    // возвращает отфильтрованные итемы
    filteredBySearchItems (items) {
      if (!this.getSearchData() || this.disableFilteringBySearch) return items

      return items.filter(i =>
        this.filter(i, this.getSearchData(), this.getItemText(i))
      )
    },
    isItemSelected (item) {
      return item === this.selectedItemByArrows || (item === this.selectedItem && !this.selectedItemByArrows)
    },
    showMenu () {
      if (this.hasMenu) return

      this.wishShowMenu = true
    },
    hideMenu () {
      if (!this.hasMenu) return

      this.wishShowMenu = false
    }
  }
}
</script>
