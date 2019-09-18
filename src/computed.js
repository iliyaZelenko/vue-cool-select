export default {
  getItems () {
    let items = this.items

    if (typeof items === 'string') {
      items = JSON.parse(this.items)
    }

    return items
  },
  itemsComputed () {
    let items = this.getItems

    return this.filteredBySearchItems(items)
  },
  inputValue () {
    // если указан слот selection, то не надо отображать текст в инпуте, он только мешает
    if (this.$scopedSlots.selection && this.getSearchData() === '') return ''
    // если есть строка поиска, то пусть она там будет
    if (this.getSearchData() !== '') return this.getSearchData()

    // иначе пусть будет текст элемента или его значение
    return this.getItemText(this.selectedItem) || this.currentItemValue
  },
  currentItemValue () {
    return this.getItemValue(this.selectedItem)
  },
  showSelectionSlot () {
    return this.$scopedSlots.selection && this.selectedItem && !this.getSearchData()
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
    const input = this.$refs['IZ-select__input']
    const obj = {
      // ширина и смещение слева такие же как и у поля ввода
      width: input.offsetWidth + 'px',
      left: input.offsetLeft + 'px',
      'pointer-events': this.hasMenu ? 'auto' : 'none'
    }

    if (this.disableSearch) {
      obj.top = input.offsetTop + 'px'
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
