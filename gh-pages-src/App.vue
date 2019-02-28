<template>
  <div id="app">
    <p style="text-align: center; font-size: 20px;">
      <span
        v-for="(route, i) of prodRoutes"
        :key="route.text"
      >
        <router-link :to="{ name: route.name }">
          {{ route.text }}
        </router-link>
        <template v-if="i < prodRoutes.length - 1">
          |
        </template>
      </span>
    </p>

    <!--Роуты для разработки-->
    <p
      v-if="env === 'development'"
      style="text-align: center; font-size: 20px;"
    >
      <span
        v-for="(route, i) of devRoutes"
        :key="route.text"
      >
        <router-link :to="route.path">
          {{ route.text }}
        </router-link>
        <template v-if="i < prodRoutes.length - 1">
          |
        </template>
      </span>

      <switch-theme v-if="$route.fullPath.includes('dev')" />
    </p>

    <router-view/>
  </div>
</template>

<script>
import SwitchTheme from './SwitchTheme.vue'
import { prodRoutes, devRoutes } from './router'

export default {
  components: { SwitchTheme },
  data: () => ({
    env: process.env.NODE_ENV,
    prodRoutes,
    devRoutes
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
