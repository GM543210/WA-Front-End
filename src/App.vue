<template>
    <router-view/>
</template>

<script>
import store from '@/store.js'
import router from '@/router';
// import { firebase } from '@/firebase';

export default {
  data () {
    return {
      store,
      windowName:'',
    }
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
// .container{
//   padding-right:0px;
//   margin-left: 0px;
//   max-width:100%;
// }

// .main-ui{
//   margin-top:10%;
//   max-width:1140px;
//   width:100%;
//   padding-right: 15px;
//   padding-left: 15px;
//   margin-right: auto;
//   margin-left: auto;
// }

.col{
  padding-left:0px;
  padding-right:0px;
}
</style>
