<template>
  <div class="demo-page-wrap">
    <div style="height: 500px;">
      <h1 style="text-align: center;">Usage Example 5</h1>

      <b>Selected:</b> {{ selected || 'not chosen' }}.
      <br><br>

      <cool-select
        v-model="selected"
        :items="items"
        :error-message="errorMessage"
        :disabled="disabled"
        :readonly="readonly"
        :disable-search="disableSearch"
        placeholder="Select name"
        @blur="validate"
      />

      <br>

      <cool-select
        v-model="selected"
        :items="items"
        :error-message="errorMessage"
        :disabled="disabled"
        :readonly="readonly"
        :disable-search="disableSearch"
        placeholder="Select name"
        @blur="validate"
      />

      <br>

      <cool-select
        v-model="selected2"
        :items="items"
        :disabled="disabled"
        :readonly="readonly"
        :disable-search="disableSearch"
        placeholder="Select name"
      />

      <br>
      <button @click="disabled = !disabled">
        Toggle disable
      </button>

      <button @click="readonly = !readonly">
        Toggle readonly
      </button>

      <button @click="disableSearch = !disableSearch">
        Toggle disable search
      </button>
    </div>
  </div>
</template>

<script>
import { CoolSelect } from '~/main'

export default {
  components: { CoolSelect },
  data: () => ({
    disabled: false,
    readonly: false,
    disableSearch: false,
    selected: null,
    selected2: null,
    items: '[{"first_name":"one"}, {"first_name":"two"}, {"first_name":"three"}, {"first_name":"four"}, {"first_name":"five"}]',
    errorMessage: null
  }),
  watch: {
    selected () {
      this.validate()
    }
  },
  methods: {
    validate () {
      this.errorMessage = this.selected ? null : 'This is required field!'
    }
  }
}
</script>
