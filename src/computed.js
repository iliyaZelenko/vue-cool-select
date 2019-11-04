export default {
  itemsComputed () {
    let items = this.items

    if (typeof this.items === 'string') {
      items = JSON.parse(this.items)
    }

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
    let styles = {}

    if (this.inputElCustomAttributes && this.inputElCustomAttributes.style) {
      styles = {
        ...styles,
        ...this.inputElCustomAttributes.style
      }
    }

    return styles
  },
  hasMenu () {
    return !this.simpleInput && this.wishShowMenu && !this.loading // this.focused && !this.loading
  },
  hasError () {
    return !!this.errorMessage
  },
  isMobile () {
    if (process.server) return false
    // return window.innerWidth + window.innerHeight <= 1800
    return window.innerWidth <= 900 && window.innerHeight <= 900
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
