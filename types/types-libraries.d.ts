import Vue from 'vue'
import { CoolSelectUseOptionsInterface } from './types'

declare module 'vue/types/vue' {

  interface Vue {
    $coolSelect: {
      options: CoolSelectUseOptionsInterface
    }
  }
}
