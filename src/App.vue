<template>
    <router-view/>
</template>

<script>
import store from '@/store.js'
import router from '@/router';
// import { firebase } from '@/firebase';

export default {
  data () {
    return store;
  },

  methods: {
    logout() {
      store.authenticated = false
    },
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
