<template>
 <div><Header />
  <div class="jumbotron">
    <h1 class="display-4">Hello, Marin!</h1>
    <p class="lead">Ovdje stavi selection ADMIN and USER</p>
    <hr class="my-4">
    <p>Please pick an option.</p>
    <router-link to="/login">
      <a class="btn btn-primary btn-lg" href="#" role="button" @click="IamPQ">Get in Queue!</a> 
    </router-link>
    <router-link to="/login">
      <a class="btn btn-primary btn-lg mov" role="button" @click="IamAdmin">Log in as ADMIN</a>
    </router-link>
  </div>
  <Footer />
 </div>
</template>

<style scoped>
.mov{
  margin-left:5px;
}
a{
  color: white;
}
</style>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import store from '@/store.js'

export default {
  name: 'home',
  components: {
    HelloWorld,
    Header,
    Footer
  },
  data(){
        return {
            store
        };
    },
    methods: {
        IamPQ() {
            store.userType='Person-queued';
        },
        IamAdmin() {
            store.userType='Admin';
        }
    }
}
</script>
