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

    <router-view/>
  </div>
</template>

<style>
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
