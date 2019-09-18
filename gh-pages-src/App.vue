<template>
  <div>
    <link
      href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons"
      rel="stylesheet"
    >

    <!--
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    >
    -->

    <div id="app">
      <v-app>
        <!--
        <v-app-bar
          fixed
          color="#43a047"
          dark
          shrink-on-scroll
          prominent
          src="https://picsum.photos/1920/1080?random"
          fade-img-on-scroll
          scroll-threshold="500"
        >
          <template v-slot:img="{ props }">
            <v-img
              v-bind="props"
              gradient="to top right, rgba(55,236,186,.7), rgba(25,32,72,.7)"
            ></v-img>
          </template>

          <template v-slot:extension>
            <v-tabs
              v-model="tab"
              color="basil"
              grow
            >
              <v-tab
                v-for="route in prodRoutes"
                :key="route.text"
                :to="route.path"
                exact
              >
                {{ route.text }}
              </v-tab>
            </v-tabs>
          </template>

          <v-spacer />

          <h1 class="font-weight-bold display-3 basil--text text-xs-center mt-2">
            Vue Cool Select
          </h1>

          <v-spacer />
        </v-app-bar>
        -->

        <v-content>
          <v-card color="basil">
            <div
              style="position: absolute; right: 0;"
              class="ma-2"
            >
              <v-btn
                href="https://github.com/iliyaZelenko/vue-cool-select"
                target="_blank"
                color="black"
                dark
              >
                <v-icon left>mdi-github-circle</v-icon>

                Github
              </v-btn>

              <v-btn
                :to="docsRoute"
                class="ml-4"
                color="primary"
                large
                dark
              >
                <v-icon left>book</v-icon>

                Documentation
              </v-btn>
            </div>

            <v-card-title class="py-4 justify-center">
              <h1 class="font-weight-bold display-3 basil--text">
                Vue Cool Select
              </h1>
            </v-card-title>

            <h3 class="text-xs-center mt-3">
              Examples
            </h3>

            <v-tabs
              color="basil"
              icons-and-text
              centered
              optional
            >
              <v-tab
                v-for="route in examplesRoutes"
                :key="route.text"
                :to="route.path"
                exact
              >
                {{ route.text }}

                <v-icon>{{ route.icon }}</v-icon>
              </v-tab>
            </v-tabs>
          </v-card>

          <!--Роуты для разработки-->
          <p
            v-if="env === 'development'"
            class="my-4 text-xs-center"
          >
            <span
              v-for="(route, i) of devRoutes"
              :key="route.text"
            >
              <router-link :to="route.path">
                {{ route.text }}
              </router-link>
              <template v-if="i < examplesRoutes.length - 1">
                |
              </template>
            </span>

            <switch-theme v-if="$route.fullPath.includes('dev')" />
          </p>

          <v-container v-if="showCodesanboxWarning">
            <v-alert type="warning">
              If you do not see the <code>iframe</code> (block) with examples under this message,
              then try clicking the button to the right.

              <v-btn
                href="https://codesandbox.io/s/4zlkjr9xow"
                target="_blank"
                class="ml-2"
                rounded
              >
                Visit codesandbox.io examples
              </v-btn>
            </v-alert>
          </v-container>

          <router-view />
        </v-content>
      </v-app>
    </div>
  </div>
</template>

<script>
import SwitchTheme from './SwitchTheme.vue'
import { docsRoute, examplesRoutes, devRoutes } from './router'

export default {
  components: { SwitchTheme },
  data: () => ({
    env: process.env.NODE_ENV,
    tab: null,
    docsRoute,
    examplesRoutes,
    devRoutes
  }),
  computed: {
    showCodesanboxWarning () {
      return this.examplesRoutes.some(i => i.name === this.$route.name)
    }
  }
}
</script>

<style>
  .basil {
    background-color: #FFFBE6 !important;
  }

  .basil--text {
    color: #356859 !important;
  }

  .example-frame {
    width: 100%;
    height: 850px;
    border:0;
    border-radius: 4px;
    overflow: hidden;
  }

  .example-frame-wrapper {
    padding: 30px;
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
