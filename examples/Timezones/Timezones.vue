<template>
  <div class="demo-page-wrap">
    <div>
      <h1 style="text-align: center;">Timezones Example</h1>

      <b>Selected timezone:</b> {{ selectedTimezone || 'not chosen' }}.
      <br><br>

      <cool-select
        v-model="selectedTimezone"
        :items="items"
        item-value="name"
        item-text="name"
      >
        <template
          slot="item"
          slot-scope="{ item: timezone }"
        >
          <div style="display: flex; align-items: center;">
            <img
              :src="getFlag(timezone.countryCode)"
              class="country-flag"
            >

            <div>
              {{ timezone.offset }}

              <b>{{ timezone.name }}</b>
            </div>
          </div>
        </template>
        <template
          slot="selection"
          slot-scope="{ item: timezone }"
        >
          <img
            :src="getFlag(timezone.countryCode)"
            class="country-flag"
          >

          <div>
            {{ timezone.offset }}

            <b>{{ timezone.name }}</b>
          </div>
        </template>
      </cool-select>

      <button
        style="margin-top: 15px;"
        @click="setRandom"
      >
        Set random value
      </button>

      <p>
        Not all time zones are used, the full list is
        <a href="https://gist.github.com/iliyaZelenko/8de4d61ad77ea7fbcfbecc2457ca888b">
          here
        </a>
        .
      </p>
    </div>
  </div>
</template>

<script>
import countries from './countries'
import { CoolSelect } from 'vue-cool-select'

export default {
  components: { CoolSelect },
  data: () => ({
    selectedTimezone: 'Africa/Lome',
    items: countries.data
  }),
  methods: {
    getFlag (flagName) {
      try {
        return require(`./Timezones/flags`)
      } catch (e) {
        return require('./flags/undefined.svg')
      }
    },
    setRandom () {
      const randomIndex = Math.floor(Math.random() * this.items.length)

      this.selectedTimezone = this.items[randomIndex].name
    }
  }
}
</script>

<style scoped>
  .country-flag {
    max-width: 30px;
    margin-right: 10px;
    border: 1px solid #eaecf0;
  }
</style>
