<template>
  <div class="demo-page-wrap">
    <div>
      <h1 style="text-align: center;">Simple Example</h1>

      <b>Selected:</b> {{ selected || 'not chosen' }}.
      <br><br>

      <cool-select
        v-model="selected"
        :items="items"
        placeholder="Select name"
      />
    </div>
  </div>
</template>

<script>
import { CoolSelect } from 'vue-cool-select'

export default {
  components: { CoolSelect },
  data: () => ({
    selected: null,
    items: [
      'Anton',
      'Andrey',
      'Sasha',
      'Vladimir',
      'Dima'
    ]
  })
}
</script>
