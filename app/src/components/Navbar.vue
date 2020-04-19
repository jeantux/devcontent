<template>
<nav class="nav-devcontent navbar is-transparent is-fixed-top">
  <div class="navbar-brand">
    <router-link class="navbar-item" to="/">
      <img src="@/assets/img/logo.png" alt="Logo devcontent">
    </router-link>
    <div
      class="navbar-burger burger"
      data-target="navbarExampleTransparentExample"
      v-on:click="toogleMenu()"
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>

  <div id="navbarExampleTransparentExample" v-bind:class="{ 'is-active' : showMenu }" class="navbar-menu">
    <div class="navbar-start">
        <router-link class="navbar-item" to="/">Home</router-link>
      <div class="navbar-item has-dropdown is-hoverable">
        <router-link class="navbar-link" to="/about">Sobre</router-link>
        <div class="navbar-dropdown is-boxed">
          <router-link class="navbar-item" to="/about">Devcontent</router-link>
          <router-link class="navbar-item" to="/stacks">Stacks</router-link>
        </div>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="field is-grouped">
          <p class="control">
            <a class="bd-tw-button button"
               target="_blank"
               href="https://twitter.com/intent/tweet?text=Conheça os melhores educadores da internet;url=https://devcontent.tech">
              <span class="icon">
                <i class="fa fa-twitter"></i>
              </span>
              <span>
                Tweet
              </span>
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
export default {
    name: 'Navbar',
    data () {
      return {
        showMenu: false
      }
    },
    methods: {
      toogleMenu () {
        this.showMenu = !this.showMenu
      }
    }
}
</script>

<style scoped>
    .nav-devcontent { box-shadow: 0px 0px 3px 0px #999; }
</style>