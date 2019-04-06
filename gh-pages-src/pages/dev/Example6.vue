<template>
  <div class="demo-page-wrap">
    <div>
      <cool-select
        ref="select"
        v-model="selected"
        :items="items"
        placeholder="Select name"
        disable-search
      />
    </div>
  </div>
</template>

<script>
import { CoolSelect } from '../../main'

const initSeconds = 5

export default {
  components: {
    CoolSelect
  },
  data () {
    return {
      seconds: initSeconds,
      selected: null,
      items: ['Anton', 'Andrey', 'Sasha', 'Vladimir', 'Dima']
    }
  }
}
</script>
