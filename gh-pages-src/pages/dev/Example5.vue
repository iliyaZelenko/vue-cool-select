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
      />

      <br>

      <cool-select
        v-model="selected"
        :items="items"
        :error-message="errorMessage"
        :successful="!!(!errorMessage && selected)"
        :disabled="disabled"
        :readonly="readonly"
        :disable-search="disableSearch"
        placeholder="Select name"
      >
        <template
          v-if="!errorMessage && selected"
          #input-end
        >
          <span style="color: green; margin-right: 8px;">
            ✔
          </span>
        </template>
      </cool-select>

      <br>

      <cool-select
        v-model="selected"
        :items="items"
        :error-message="errorMessage"
        :disabled="disabled"
        :readonly="readonly"
        :disable-search="disableSearch"
        placeholder="Select name"
      >
        <template #input-before>
          before
        </template>
        <template #input-start>
          start
        </template>

        <template #input-end>
          end
        </template>
        <template #input-after>
          after
        </template>
      </cool-select>

      <v-layout
        class="mt-5"
        justify-center
        wrap
      >
        <v-btn
          class="ma-2"
          @click="disabled = !disabled"
        >
          Toggle disable
        </v-btn>

        <v-btn
          class="ma-2"
          @click="readonly = !readonly"
        >
          Toggle readonly
        </v-btn>

        <v-btn
          class="ma-2"
          @click="disableSearch = !disableSearch"
        >
          Toggle disable search
        </v-btn>
      </v-layout>
    </div>
  </div>
</template>

<script>
import { CoolSelect } from '../../main'

export default {
  components: { CoolSelect },
  data: () => ({
    disabled: false,
    readonly: false,
    disableSearch: false,
    selected: null,
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
