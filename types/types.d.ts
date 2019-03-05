// 1. Make sure to import 'vue' before declaring augmented types
import Vue from 'vue'
import { Wrapper } from '@vue/test-utils'

export interface VueCoolSelectComponentInterface extends Vue {
  focused: boolean
  wishShowMenu: boolean
  selectedItem: any
  searchData: string
  selectedItemByArrows: any

  // computed
  hasMenu: boolean

  onSelectByArrow (e)
  onEnter ()
  onClick ()
  onClickSelectItem (item)
  onSearchKeyDown (e)
  onSearchKeyUp (e)
  onSearch (e)
  onScroll (event)

  setBlured ()
}

declare module '@vue/test-utils' {
  interface Wrapper  {
    readonly vm: any
  }
}

// 2. Specify a file with the types you want to augment
//    Vue has the constructor type in types/vue.d.ts
declare module 'vue/types/vue' {
  // 3. Declare augmentation for Vue
  interface Vue {

  }
}
