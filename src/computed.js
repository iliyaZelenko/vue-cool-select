export default {
  search: {
    get () {
      if (this.searchText) return this.searchText

      // return this.searchData
    },
    set (val) {
      this.$emit('update:search-text', val)

      // this.searchData = val
    }
  },
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
    return this.wishShowMenu && !this.loading // this.focused && !this.loading
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
      'pointer-events': this.hasMenu ? 'auto' : 'none'
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
}
