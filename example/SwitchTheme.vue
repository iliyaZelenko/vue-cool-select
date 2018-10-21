<template>
  <div class="theme-wrapp">
    <template
      v-for="(theme, i) of themes"
    >
      <div
        :key="theme.name"
        class="theme"
      >
        <img
          :src="theme.img"
          @click="changeTheme(theme.name)"
        >
        <img
          v-if="theme.name === currentTheme"
          src="https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Tick_Mark_Dark-128.png"
          style="width: 20px; position: absolute;  transform: translateX(-5px) translateY(-5px)"
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
    currentTheme: () => window.location.hash.slice(1) || 'bootstrap'
  },
  methods: {
    changeTheme (theme) {
      window.location.hash = theme
      document.location.reload()
    }
  }
}
</script>

<style>
  .theme-wrapp {
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
