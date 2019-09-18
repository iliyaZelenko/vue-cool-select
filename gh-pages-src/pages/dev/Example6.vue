<template>
  <div class="demo-page-wrap">
    <v-layout>
      <v-flex xs6>
        <input
          class="form-control form-control-lg"
          type="text"
          placeholder=".form-control-lg"
        >

        <br>

        <input
          class="form-control"
          type="text"
          placeholder="Default input"
        >

        <br>

        <input
          class="form-control form-control-sm"
          type="text"
          placeholder=".form-control-sm"
        >
      </v-flex>
      <v-flex xs6>
        <!--
        <cool-select
          v-model="selected"
          :items="items"
          :style="{
            height: '50px'
          }"
          placeholder="Select name"
        />
        -->

        <cool-select
          v-model="selected"
          :items="items"
          placeholder="lg"
          size="lg"
        />

        <br>

        <cool-select
          v-model="selected"
          :items="items"
          placeholder="md"
        />

        <br>

        <!-- TODO вместо size-* использовать size="size-name" -->

        <cool-select
          v-model="selected"
          :items="items"
          placeholder="sm"
          size="sm"
        />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { CoolSelect } from '../../main'
import 'bootstrap/dist/css/bootstrap.min.css'

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
