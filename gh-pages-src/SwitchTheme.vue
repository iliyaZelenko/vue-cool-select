<template>
  <div class="theme-wrap">
    <template v-for="(theme, i) of themes">
      <div
        :key="theme.name"
        class="theme"
        @click="changeTheme(theme.name)"
      >
        <img
          :src="theme.img"
          alt="theme image"
        >
        <img
          v-if="theme.name === currentTheme"
          src="https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Tick_Mark_Dark-128.png"
          style="width: 20px; position: absolute;  transform: translateX(-5px) translateY(-5px)"
          alt="mark as current image"
        >
        <br>
        {{ theme.name }}
      </div>

      <span
        v-if="i !== themes.length - 1"
        :key="i"
      >
        or
      </span>
    </template>

  </div>
</template>

<script>
import { getTheme, setTheme } from './themeHelpers'

export default {
  data: () => ({
    themes: [
      {
        name: 'bootstrap',
        img: 'http://wordyblend.com/wp-content/uploads/2017/03/bootstrap-solid.jpg'
      },
      {
        name: 'material-design',
        img: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Google_Material_Design_Logo.svg'
      }
    ]
  }),
  computed: {
    currentTheme: getTheme
  },
  methods: {
    changeTheme: setTheme
  }
}
</script>

<style>
  .theme-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 120px;
    margin: 30px 0;
  }

  .theme {
    text-align: center;
    width: 120px;
  }

  .theme img {
    width: 50%;
  }

  .theme:hover {
    font-weight: bold;
    cursor: pointer;
  }

  .theme:hover img {
    width: 55%;
  }
</style>
