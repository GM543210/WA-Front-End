<template>
    <div id="app">

    <nav class="navbar navbar-expand-lg navbar-light mb-5 navbar-custom">
      <router-link class="navbar-brand" to="/">REDOMAT <em>exQs-Me</em></router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <!-- <li>Todo stranica</li> -->
        </ul>
        <img class="resized" alt="user-settings" src="@/assets/user.png">
        <div class="btn btn-outline my-2 my-sm-0 mr-2">John Doe</div>
        <div class="btn btn-outline my-2 my-sm-0 mr-2" @click="backToHome">Logout</div>

        <!-- <router-link v-if="!authenticated" class="btn btn-info my-2 my-sm-0 mr-2" to="/login">Login</router-link>
        <span v-if="authenticated">
          {{ userName }}
          <a @click="logout" class="btn btn-info my-2 my-sm-0 mr-2" href="#">Logout</a>
        </span>
        <router-link class="btn btn-outline my-2 my-sm-0 mr-2" to="/signup">Signup</router-link> -->
      </div>
    </nav>

    <router-view/>
  </div>
</template>

<style lang='scss'>
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
img.resized { /*resized the user settings and cart icons*/
    width: 30px;
    height: 30px;
    margin-left: 15px
}
.navbar-custom{
  background-color: #5396E9;
  
}
</style>

<script>
import store from '@/store.js'
export default {
  name: 'Header',
  data () {
    return store;
  },
  methods: {
    logout() {
      store.authenticated = false
    },
    backToHome(){
      this.$router.push({name: 'home'})
    }
  }
}
</script>