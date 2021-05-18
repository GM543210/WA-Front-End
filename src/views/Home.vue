<template>
<div>

<H1 class="main-header">MOLIMO IZABERITE OPCIJU</H1>

  <div class="container main">
    <div class="row">

    <div class="option-wrapper col-sm-6">
      <img class ="hp-icon" src="@/assets/Admin-circle.png">
      <router-link class="button" to="/main-admin">ADMIN</router-link>
    </div>

    <div class="option-wrapper col-sm-6">
      <img class ="hp-icon" src="@/assets/PQ-circle.png">
      <router-link class="button" to="/main-user">KORISNIK</router-link>
    </div>

    </div>
  </div>

</div>
</template>

<style scoped>

.main-header {
  color:#5396E9;
  font-size: 5vw;
  text-align: center;
}

.main {
  margin-top: 10%;
}

.row {
  margin-left: 10%;
}

.option-wrapper{
  text-align: center;
  width:50%;
  position: relative;
}

.hp-icon {
  width: 50%;
}

.button {
  background-color: #5396E9; /* Green */
  width: 200px;
  border-radius: 25px;
  color: white;
  padding: 5px 15px;
  text-align: center;
  display: block;
  font-size: 25px;
  position: absolute;
  left: 29%;
  margin-top: 15px;
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
    },
}
</script>
