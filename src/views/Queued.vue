<template>
 <div><Header />

    <H1 class="main-header">IME USTANOVE</H1>

    <div class="container main">
      <div class="row">

        <div class="option-wrapper col-sm-6">

          <div class="counter">
            <h3 class="header-3">28</h3>
          </div>
          <p class="normal-text">Na redu za: ~20min</p>

        </div>

        <div class="option-wrapper col-sm-6">

          <div class="counter">
            <h3 class="header-3">33</h3>
          </div>
          <router-link class="button" to="/left-q">ODUSTANI</router-link>

        </div>

      </div>
    </div>

  <!-- <Footer /> -->
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
  background-color: #F7387E;
  width: 200px;
  border-radius: 25px;
  color: white;
  padding: 5px 15px;
  text-align: center;
  display: block;
  font-size: 25px;
  position: absolute;
  left: 35%;
}

.header-3 {
  color:#5396E9;
  font-size: 3vw;
  text-align: center;
  margin-top: 15px;
}

.counter {
  border-radius: 50%;
  border: 5px solid #5396E9;
  width:100px;
  height: 100px;
  margin-left: 46%;
  margin-bottom:5%;
}

.normal-text {
  color:#5396E9;
  font-size: 1.8vw;
  margin-left: 10%;
}

</style>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'queued',
  components: {
    HelloWorld,
    Header,
    Footer
  }
}
</script>
