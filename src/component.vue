<template>
  <div
    ref="IZ-select"
    :tabindex="disableSearch ? 0 : -1"
    :class="{
      'IZ-select': true,
      'IZ-select--with-value': inputValue,
      // ставит класс размера если prop size не дефолтное
      ...(size === SIZES.DEFAULT
        ? null
        : ({ ['IZ-select--' + size]: true })
      )
    }"
    @keydown.up="onSelectByArrow"
    @keydown.down="onSelectByArrow"
    @keydown.enter="onEnter"
    @keydown.tab.esc="setBlured"
    @mousedown="onClick"
    @focus="setFocused"
  >
    <div class="IZ-select__input-wrap">
      <slot
        name="input-before"
      />

      <div
        ref="IZ-select__input"
        :class="{
          'IZ-select__input': true,
          'IZ-select__input--focused': focused,
          'IZ-select__input--has-menu': hasMenu,
          'IZ-select__input--has-error': hasError,
          'IZ-select__input--successful': successful,
          'IZ-select__input--selection-slot': showSelectionSlot,
          'IZ-select__input--disabled': disabled,
          'IZ-select__input--readonly': readonly
        }"
        :style="inputStyles"
      >
        <slot
          name="input-start"
        />

        <slot
          v-if="showSelectionSlot"
          :item="selectedItem"
          name="selection"
        />

        <input
          v-if="simpleInput"
          ref="IZ-select__input-for-text"
          v-bind="{
            value,
            placeholder,
            class: inputForTextClass,
            disabled,
            readonly,
            tabindex: 0,
            type: 'text',
            autocomplete: 'new-password',
            ...inputElCustomAttributes,
            style: inputForTextStyles,
          }"
          @keyup="onSearchKeyUp"
          @keydown="onSearchKeyDown"
          @input="$emit('input', $event.target.value)"
          @mousedown="onClick"
          @focus="setFocused(true)"
        >
        <input
          v-else
          ref="IZ-select__input-for-text"
          v-bind="{
            value: inputValue,
            placeholder,
            class: inputForTextClass,
            disabled: disableSearch || disabled,
            readonly,
            tabindex: disableSearch ? -1 : 0,
            type: 'text',
            role: 'combobox',
            autocomplete: 'new-password',
            ...inputElCustomAttributes,
            style: inputForTextStyles,
          }"
          @keyup="onSearchKeyUp"
          @keydown="onSearchKeyDown"
          @input="onSearch"
          @mousedown="onClick"
          @focus="setFocused(true)"
        >

        <slot
          name="input-end"
        />
      </div>

      <slot
        name="input-after"
      />
    </div>

    <template v-if="!simpleInput">
      <div
        v-for="menuPos of [MENU_POSITIONS.TOP, MENU_POSITIONS.BOTTOM]"
        :key="'menu-position-' + menuPos"
        :ref="'IZ-select__menu-' + menuPos"
        :style="{
          'pointer-events': hasMenu ? 'auto' : 'none',
          ...getMenuDynamicStyles(menuPos)
        }"
        :class="{
          [`IZ-select__menu IZ-select__menu--at-${menuPos}`]: true,
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
              {{ $coolSelect.options.text.noData }}
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
    </template>

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
import { SIZES, MENU_POSITIONS } from '~/constants'
import { outOfViewportGetFreePosition } from '~/helpers'

export default {
  name: 'VueSelect',
  // introduction: 'an amazing select',
  description: `
  This \`select\` is amazing, you should _check_ it out 😊.
  `,
  token: `<cool-select v-model="selected" :items="items" />`,
  props,
  data () {
    return {
      MENU_POSITIONS,
      SIZES,
      wishShowMenu: false,
      arrowsIndex: null,
      focused: false,
      selectedItem: null,
      selectedItemByArrows: null,
      // readonly
      searchData: '',
      scrollItemsLimitCurrent: this.scrollItemsLimit,
      // addEventListener identifier
      listeners: {
        mousedown: ({ target }) => {
          const select = this.$refs['IZ-select']

          if (this.focused && select && !select.contains(target)) {
            this.setBlured()
          }
        },
        scroll: this.menuCalculatePos,
        resize: this.menuCalculatePos
      },
      menuCurrentPosition: this.menuDefaultPosition,
      lastMenuDynamicStyles: null,
      // чтобы не вызывался input из-за selectedItem (в created вызывается setSelectedItemByValue)
      ignoreFirstInputEvent: true
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
      if (this.ignoreFirstInputEvent) {
        this.ignoreFirstInputEvent = false

        return
      }

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
  },
  mounted () {
    // listener for window (see removeEventListener on beforeDestroy hook)
    window.addEventListener('mousedown', this.listeners.mousedown)

    if (this.menuDynamicPosition) {
      window.addEventListener('scroll', this.listeners.scroll)
      window.addEventListener('resize', this.listeners.resize)
    }
  },
  beforeDestroy () {
    window.removeEventListener('mousedown', this.listeners.mousedown)

    if (this.menuDynamicPosition) {
      window.removeEventListener('scroll', this.listeners.scroll)
      window.removeEventListener('resize', this.listeners.resize)
    }
  },
  methods: {
    ...eventsListeners,
    getMenuDynamicStyles (menuPos) {
      const isCurrentMenu = this.menuCurrentPosition === menuPos && this.hasMenu
      const obj = {
        visibility: isCurrentMenu ? 'visible' : 'hidden',
        opacity: +isCurrentMenu
      }

      // возвращать старую позицию если нет меню, чтобы стили не дёргались
      if (!this.hasMenu) return { ...this.lastMenuDynamicStyles, ...obj }

      const input = this.$refs['IZ-select__input']
      // ширина и смещение слева такие же как и у поля ввода
      obj.width = input.offsetWidth + 'px'
      obj.left = input.offsetLeft + 'px'

      if (menuPos === MENU_POSITIONS.BOTTOM) {
        obj.top = input.offsetTop + input.offsetHeight + 'px'

        if (this.disableSearch) {
          obj.top = input.offsetTop + 'px'
        }
      } else if (menuPos === MENU_POSITIONS.TOP) {
        obj.bottom = '100%'

        if (this.disableSearch) {
          obj.bottom = 0
        }
      }

      this.lastMenuDynamicStyles = obj

      return obj
    },
    // динамически позиционирует меню чтобы не выходило за границу viewport
    menuCalculatePos () {
      if (!this.menuDynamicPosition) return

      if (this.hasMenu) {
        const newPosTop = outOfViewportGetFreePosition(this.$refs['IZ-select__menu-' + MENU_POSITIONS.TOP][0])
        const newPosBottom = outOfViewportGetFreePosition(this.$refs['IZ-select__menu-' + MENU_POSITIONS.BOTTOM][0])

        if (!newPosTop && !newPosBottom) {
          this.menuCurrentPosition = this.menuDefaultPosition
        } else {
          this.menuCurrentPosition = newPosTop || newPosBottom
        }
      }
    },
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
    setInputSelected () {
      setTimeout(() => {
        // Вроде не нужно https://stackoverflow.com/a/5001669/5286034
        // if (isTextSelected(this.$refs['IZ-select__input-for-text'])) return

        this.$refs['IZ-select__input-for-text'].select()
      }, 100)
    },
    setFocused (byInput = false) {
      if (this.focused || this.disabled || this.readonly) return

      // if search enabled
      if (!this.disableSearch && !byInput) {
        // focus text input
        this.setInputFocused()
      }

      if (window.scrollTo && this.allowMobileScroll && this.isMobile) {
        const { top } = getOffsetSum(this.$refs['IZ-select__input'])

        // scroll to component input el
        window.scrollTo({
          // this.$refs['IZ-select__input'].offsetTop - 8
          // (bug with position: relative; https://github.com/iliyaZelenko/vue-cool-select/issues/10)
          top: top - 8,
          behavior: 'smooth'
        })
      }

      if (this.selectTextOnFocus) this.setInputSelected()

      this.focused = true

      this.showMenu()
      this.$emit('focus')
    },
    // TODO правильнее blurred!
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
      // if null or undefined
      if (item == null) return null
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

      this.menuCalculatePos()
    },
    hideMenu () {
      if (!this.hasMenu) return

      this.wishShowMenu = false
    }
  }
}
</script>

<!--Стили не писать в тег <style>, вместо этого в .styl файлы, всеравно используется BEM.-->
