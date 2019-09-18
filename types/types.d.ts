import Vue, { Component, PluginFunction } from 'vue'

// TODO чтобы у Component была связь с VueCoolSelectComponentInterface
export const component: Component
export const CoolSelect: Component
export const VueCoolSelect: Component
export const CoolSelectPlugin: PluginFunction<CoolSelectUseOptionsInterface>
export const EventEmitter: {
  on: (event, listener) => any
  onOnce: (event, listener) => any
  emit: (event, data) => any
}

export interface CoolSelectUseOptionsInterface {
  text: {
    noData: string
  }
}

export interface VueCoolSelectComponentInterface extends Vue {
  [key: string]: any
  wishShowMenu: boolean
  arrowsIndex: number | null
  focused: boolean
  selectedItem: any
  selectedItemByArrows: any
  searchData: string
  scrollItemsLimitCurrent: number
  // addEventListener identifier
  mousedownListener: any

  /* Props */
  arrowsDisableInstantSelection: boolean
  scrollItemsLimitAddAfterScroll: number

  /* Computed */
  hasMenu: boolean
  itemsComputed: any[]

  /* Methods */
  onSelectByArrow (e)
  onEnter (e)
  onClick ()
  onClickSelectItem (item)
  onSearchKeyDown (e)
  onSearchKeyUp (e)
  onSearch (e)
  onScroll (event)

  setBlured ()
}
