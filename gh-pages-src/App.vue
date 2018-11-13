<template>
  <div id="app">
    <p style="text-align: center; font-size: 20px;">
      <router-link :to="{ name: 'Example1' }">
        Countries example
      </router-link>
      |
      <router-link :to="{ name: 'Example2' }">
        Async search example
      </router-link>
      |
      <router-link :to="{ name: 'Example3' }">
        Simple example
      </router-link>
      |
      <router-link :to="{ name: 'Example4' }">
        Validation example
      </router-link>

      <br>

      <router-link :to="{ name: 'Docs' }">
        Documentation 🗎
      </router-link>
    </p>

    <!--Роуты для разработки-->
    <p
      v-if="env === 'development'"
      style="text-align: center; font-size: 20px;"
    >
      <router-link to="/dev/">
        Dev 1
      </router-link>
      |
      <router-link to="/dev/2">
        Dev 2
      </router-link>
      |
      <router-link to="/dev/3">
        Dev 3
      </router-link>
      |
      <router-link to="/dev/4">
        Dev 4
      </router-link>
      |
      <router-link to="/dev/5">
        Dev 5
      </router-link>

      <switch-theme v-if="$route.fullPath.includes('dev')" />
    </p>

    <router-view/>
  </div>
</template>

<script>
import SwitchTheme from './SwitchTheme.vue'

export default {
  components: { SwitchTheme },
  data: () => ({
    env: process.env.NODE_ENV
  })
}
</script>

<style>
  .example-frame {
    width: 100%;
    height: 800px;
    border:0;
    border-radius: 4px;
    overflow: hidden;
  }

  /* Page styles (no need) */
  .demo-page-wrap {
    display: flex;
    justify-content: center;
    /*align-items: center;*/
    height: 100vh;
  }

  .demo-page-wrap > div {
    width: 450px;
    height: 100%;
  }

  /*body {*/
    /*margin: 0;*/
  /*}*/
</style>
