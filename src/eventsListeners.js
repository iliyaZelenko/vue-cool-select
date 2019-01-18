export default {
  onSelectByArrow (e) {
    this.showMenu()
    // if (!this.hasMenu) return

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

    const itemByArrowsIndex = this.itemsComputed[this.arrowsIndex]

    if (this.arrowsDisableInstantSelection) {
      this.selectedItemByArrows = itemByArrowsIndex
    } else {
      this.search = ''
      this.selectedItem = itemByArrowsIndex

      this.fireSelectEvent(this.selectedItem)
    }

    e.preventDefault()
  },
  onEnter () {
    // if (this.arrowsIndex === null) {
    //   this.selectedItem = this.itemsComputed[0]
    // }
    //
    // this.fireSelectEvent(this.selectedItem)

    if (!this.arrowsIndex && this.hasMenu) {
      const firstItem = this.itemsComputed[0]

      if (!firstItem) return

      this.fireSelectEvent(
        this.selectedItem = firstItem
      )
    }
    if (this.arrowsDisableInstantSelection && this.selectedItemByArrows) {
      this.fireSelectEvent(
        this.selectedItem = this.selectedItemByArrows
      )
    }

    this.search = ''
    // show / hide menu
    this.hasMenu ? this.hideMenu() : this.showMenu()
  },
  onClick () {
    this.setFocused()
    this.showMenu()
  },
  // on click on item
  onClickSelectItem (item) {
    this.selectedItem = item
    this.hideMenu() // this.focused = false
    this.search = ''

    this.fireSelectEvent(item)
  },
  onSearchKeyDown (e) {
    // ignore special keys
    if (['Enter', 'ArrowDown', 'ArrowUp', 'Tab'].includes(e.key)) return

    // key === 'Delete' ||
    // !!! Эта часть важна когда используешь слот "selection"
    if (!e.target.value && e.key === 'Backspace') {
      this.selectedItem = null
      this.arrowsIndex = null
    }
    // this.setFocused()
    this.showMenu()
    this.$emit('keydown', e)
  },
  onSearchKeyUp (e) {
    this.$emit('keyup', e)
  },
  onSearch (e) {
    this.selectedItemByArrows = this.selectedItem = this.arrowsIndex = null
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
  }
}
