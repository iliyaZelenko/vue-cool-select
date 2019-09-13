import { scrollIfNeeded } from '~/helpers'

export default {
  onSelectByArrow (e) {
    e.preventDefault()

    if (this.disabled || this.readonly) return

    this.showMenu()
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

    // Переход на противоположную сторону
    const end = this.itemsComputed.length - 1
    if (this.arrowsIndex < 0) {
      this.arrowsIndex = end
    }
    if (this.arrowsIndex > end) {
      this.arrowsIndex = 0
    }

    const itemByArrowsIndex = this.itemsComputed[this.arrowsIndex]

    if (this.arrowsDisableInstantSelection) { // подсвечивает элемент
      this.selectedItemByArrows = itemByArrowsIndex
    } else { // сразу выбирает элемент
      this.setSearchData('')
      this.selectedItem = itemByArrowsIndex

      this.fireSelectEvent(this.selectedItem)
    }

    if (this.scrollToItemIfNeeded) { // Прокурутка к элементу
      this.$nextTick(() => {
        const selectedElement = this.$refs.items[this.arrowsIndex]

        // на всякий случай (это не ожидаемое поведение)
        if (!selectedElement) return

        scrollIfNeeded(selectedElement, this.$refs['IZ-select__menu-items'])
      })
    }
  },
  onEnter (e) {
    if (this.hasMenu) {
      e.preventDefault()

      let needToResetSearch = false
      // если не выбрано через стрелки, то выбирать первый элемент
      if (!this.arrowsIndex && !this.disableFirstItemSelectOnEnter) {
        const firstItem = this.itemsComputed[0]

        if (!firstItem) return

        this.fireSelectEvent(
          this.selectedItem = firstItem
        )
        needToResetSearch = true
      }
      // если arrowsDisableInstantSelection и выбран элемент через стрелки (подсвечен), то сделать его выбранным
      if (this.arrowsDisableInstantSelection && this.selectedItemByArrows) {
        this.fireSelectEvent(
          this.selectedItem = this.selectedItemByArrows
        )
        needToResetSearch = true
      }

      if (needToResetSearch) this.setSearchData('')
    }

    // show / hide menu
    this.hasMenu ? this.hideMenu() : this.showMenu()
  },
  onClick () {
    if (this.disabled || this.readonly) return

    this.setFocused()
    this.showMenu()
  },
  // on click on item
  onClickSelectItem (item) {
    // this.focused = false
    this.selectedItem = item
    this.setSearchData('')

    this.setInputFocused()
    this.hideMenu()
    this.fireSelectEvent(item)
  },
  onSearchKeyDown (e) {
    if (this.disabled || this.readonly) return

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
    if (this.disabled || this.readonly) return

    this.$emit('keyup', e)
  },
  onSearch (e) {
    if (this.disabled || this.readonly) return

    this.selectedItemByArrows = this.selectedItem = this.arrowsIndex = null
    // e.inputType: "deleteContentBackward"
    // if (!this.focused) this.focused = true
    // console.log(e.target.value)
    // if (!e.target.value) {
    //   this.selectedItem = null
    // }

    this.setSearchData(e.target.value)
    this.$emit('search', this.getSearchData())
  },
  onScroll (event) {
    this.$emit('scroll', event)

    if (this.scrollItemsLimitCurrent >= this.itemsComputed.length) return

    const content = event.target
    const showMoreItems = (
      content.scrollHeight -
      (content.scrollTop + content.clientHeight)
    ) < 200

    // если проскролил вниз то показать больше итемов
    if (showMoreItems) {
      this.scrollItemsLimitCurrent += this.scrollItemsLimitAddAfterScroll
    }
  }
}
