<template>
  <div class="demo-page-wrap">
    <div>
      <h1 style="text-align: center;">Reset search example</h1>

      <template v-if="resetSecondsLeft">
        Search will reset in {{ resetSecondsLeft }}
      </template>
      <template v-else>
        Search is reset
      </template>

      <!--Search: "{{ search }}"-->

      <button @click="resetSearchAndSelected">
        Set search to ""
      </button>

      <!--:search-text.sync="search"-->
      <cool-select
        ref="select"
        v-model="selected"
        :items="items"
        :event-emitter="selectEventEmitter"
        placeholder="Select name"
      />
    </div>
  </div>
</template>

<script>
import { CoolSelect, EventEmitter } from '~/main'

const initSeconds = 5

export default {
  components: {
    CoolSelect
  },
  data () {
    return {
      selectEventEmitter: new EventEmitter(),
      // search: '',
      seconds: initSeconds,
      selected: null,
      items: ['Anton', 'Andrey', 'Sasha', 'Vladimir', 'Dima']
    }
  },
  computed: {
    resetSecondsLeft () {
      return this.seconds % (initSeconds + 1)
    }
  },
  mounted () {
    setInterval(() => {
      this.seconds -= 1

      if (this.seconds === -1) {
        this.seconds = initSeconds

        this.resetSearchAndSelected()
      }
    }, 1000)
  },
  methods: {
    resetSearchAndSelected () {
      this.selectEventEmitter.emit('set-search', '')
      this.selected = null
    }
  }
}
</script>
