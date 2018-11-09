<template>
  <div class="demo-page-wrap">
    <div>
      <h1 style="text-align: center;">Usage Example 5</h1>

      <b>Selected:</b> {{ selected || 'not chosen' }}.
      <br><br>

      <cool-select
        v-model="selected"
        :items="items"
        :error-message="errorMessage"
        :disabled="disabled"
        :readonly="readonly"
        placeholder="Select name"
        @blur="validate"
      />

      <br>
      <button @click="disabled = !disabled">
        Toggle disable
      </button>

      <button @click="readonly = !readonly">
        Toggle readonly
      </button>
    </div>
  </div>
</template>

<script>
import { CoolSelect } from '../../../src/main'

export default {
  components: { CoolSelect },
  data: () => ({
    disabled: false,
    readonly: false,
    selected: null,
    items: [
      'Anton',
      'Andrey',
      'Sasha',
      'Vladimir',
      'Dima'
    ],
    errorMessage: null
  }),
  methods: {
    validate () {
      this.errorMessage = !this.selected ? 'This is required field!' : null
    }
  }
}
</script>
