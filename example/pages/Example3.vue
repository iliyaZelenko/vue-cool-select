<template>
  <div class="demo-page-wrap">
    <div>
      <h1 style="text-align: center;">Usage Example 3</h1>

      <b>Selected:</b> {{ selected || 'not chosen' }}.
      <br><br>

      <h3>Select name</h3>

      <cool-select
        v-model="selected"
        :items="items"
      />
    </div>
  </div>
</template>

<script>
import { CoolSelect } from '../../src/main'

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
