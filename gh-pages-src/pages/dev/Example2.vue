<template>
  <div class="demo-page-wrap">
    <div>
      <h1 style="text-align: center;">Usage Example 2</h1>

      <p>
        This example shows how to work with asynchronous data through REST API.
      </p>

      <div v-if="selected">
        <img
          :src="selected.logo"
          alt="Logo"
        >
        <ul>
          <li>Name: {{ selected.name }}</li>
          <li>Domain: {{ selected.domain }}</li>
        </ul>
      </div>

      <br>
      <b>Loading:</b> {{ loading }}.
      <br><br>

      <cool-select
        v-model="selected"
        :items="items"
        :loading="loading"
        placeholder="Search"
        item-text="name"
        disable-filtering-by-search
        @search="onSearch"
      >
        <template
          slot="no-data"
        >
          {{ noData ? 'No information found by request.' : 'We need at least 2 letters to search.' }}
        </template>
        <template
          slot="item"
          slot-scope="{ item }"
        >
          <div style="display: flex; align-items: center;">
            <img
              :src="item.logo"
              class="logo"
            >

            <div>
              <span class="item-name">
                {{ item.name }}
              </span>
              <br>
              <span class="item-domain">
                {{ item.domain }}
              </span>
            </div>
          </div>
        </template>
      </cool-select>
    </div>
  </div>
</template>

<script>
import { CoolSelect } from '~/main'

export default {
  components: { CoolSelect },
  data: () => ({
    selected: null,
    items: [],
    loading: false,
    timeoutId: null,
    noData: false
  }),
  methods: {
    async onSearch (search) {
      const lettersLimit = 2

      this.noData = false
      if (search.length < lettersLimit) {
        this.items = []
        this.loading = false
        return
      }
      this.loading = true

      clearTimeout(this.timeoutId)
      this.timeoutId = setTimeout(async () => {
        const response = await fetch(`https://autocomplete.clearbit.com/v1/companies/suggest?query="${search}"`)

        this.items = await response.json()
        this.loading = false

        if (!this.items.length) this.noData = true

        console.log(this.items)
      }, 500)
    }
  }
}
</script>

<style scoped>
  .item-name {
    font-size: 25px;
  }
  .item-domain {
    color: grey;
  }

  .logo {
    max-width: 60px;
    margin-right: 10px;
    border: 1px solid #eaecf0;
  }
</style>
