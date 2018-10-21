<template>
  <div id="app">
    <p style="text-align: center; font-size: 20px;">
      <router-link to="/">
        Example 1
      </router-link>
      |
      <router-link to="/ex2">
        Example 2
      </router-link>
      |
      <router-link to="/ex3">
        Example 3
      </router-link>
      |
      <router-link to="/docs">
        Documentation
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

      <switch-theme />
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
    height: 700px;
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

  body {
    margin: 0;
  }
</style>
