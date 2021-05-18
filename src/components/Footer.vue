<template>
  <div class="footer">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <!-- <router-link class="navbar-brand" to="/">Footer</router-link> -->
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <!-- <li>Todo stranica</li> -->
        </ul>
        <div class="btn btn-outline my-2 my-sm-0 mr-2"><router-link to="/">Home</router-link></div>
        <div class="btn btn-outline my-2 my-sm-0 mr-2"><router-link to="/main-user">Main-User</router-link></div>
        <div class="btn btn-outline my-2 my-sm-0 mr-2"><router-link to="/login">Login</router-link></div>
        <div class="btn btn-outline my-2 my-sm-0 mr-2"><router-link to="/signup">Signup</router-link></div>
        <div class="btn btn-outline my-2 my-sm-0 mr-2"><router-link to="/enter-q">Enter Q</router-link></div>
        <div class="btn btn-outline my-2 my-sm-0 mr-2"><router-link to="/queued">Queued</router-link></div>
        <div class="btn btn-outline my-2 my-sm-0 mr-2"><router-link to="/left-q">Left Q</router-link></div>
        <div class="btn btn-outline my-2 my-sm-0 mr-2"><router-link to="/main-admin">Main-Admin</router-link></div>
        <div class="btn btn-outline my-2 my-sm-0 mr-2"><router-link to="/manage-window">Admin Manage Window (Salter)</router-link></div>
        <div class="btn btn-outline my-2 my-sm-0 mr-2"><router-link to="/manage-institution">Admin Manage Institution (Ustanova)</router-link></div>
        <div class="btn btn-outline my-2 my-sm-0 mr-2"><router-link to="/manage-q">Admin Manage Queue (Upr Redom)</router-link></div>
        <div class="btn btn-outline my-2 my-sm-0 mr-2"><router-link to="/window-closed">Success In Closing Window</router-link></div>

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
.footer {
  margin-top: 150px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
   position:relative;
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

</style>

<script>
import store from '@/store.js'
export default {
  name: 'Footer',
  data () {
    return store;
  },
  methods: {

  }
}
</script>