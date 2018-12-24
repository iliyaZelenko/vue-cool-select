<template>
  <div class="demo-page-wrap">
    <div>
      <h1 style="text-align: center;">Usage Example 4</h1>

      <b>Selected:</b> {{ selected || 'not chosen' }}.
      <br><br>

      <cool-select
        v-model="selected"
        :items="items"
        item-value="b"
        placeholder="Select name"
        @blur="validate"
      />
    </div>
  </div>
</template>

<script>
import { CoolSelect } from '../../../src/main'

export default {
  components: { CoolSelect },
  data () {
    const items = [
      {
        'name': '1',
        'b': 11
      },
      {
        'name': '2',
        'b': 22
      },
      {
        'name': '3',
        'b': 33
      }
    ]

    return {
      selected: items[1],
      items,
      errorMessage: null
    }
  },
  methods: {
    validate () {
      this.errorMessage = !this.selected ? 'This is required field!' : null
    }
  }
}
</script>
