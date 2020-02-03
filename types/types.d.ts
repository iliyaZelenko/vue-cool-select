import Vue, { Component, PluginFunction } from 'vue'

// TODO чтобы у Component была связь с VueCoolSelectComponentInterface
export const component: Component
export const CoolSelect: Component
export const VueCoolSelect: Component
export const CoolSelectPlugin: PluginFunction<CoolSelectUseOptionsInterface>
export const EventEmitter: {
  on: (event: Event, listener: EventListener) => any
  onOnce: (event: Event, listener: EventListener) => any
  emit: (event: Event, data: any) => any
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
  onSelectByArrow (e: Event): any
  onEnter (e: Event): any
  onClick (): any
  onClickSelectItem (item: any): any
  onSearchKeyDown (e: Event): any
  onSearchKeyUp (e: Event): any
  onSearch (e: Event): any
  onScroll (event: any): any

  setBlured (): any
}
