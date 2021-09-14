<template>
 <div><Header />

    <H1 class="main-header">{{store.selectedInstitution.institution_name}}</H1>

    <div class="container main">
      <div class="row">

        <div class="option-wrapper col-sm-6">

          <div class="counter">
            <h3 class="header-3">{{ currentNum }}</h3>
          </div>
          <p class="normal-text">You will get served in: ~{{ (queueState-1) * 5 }}min</p>

        </div>

        <div class="option-wrapper col-sm-6">

          <div class="counter">
            <h3 class="header-3">{{ store.queuePosition }}</h3>
          </div>
          <router-link class="button" to="/left-q">LEAVE</router-link>

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
import store from '@/store';
import { Queue } from '@/services'

export default {
  name: 'queued',
  components: {
    HelloWorld,
    Header,
    Footer
  },
  data(){
    return{
      store,
      currentNum: 0,
      queueState: 0,
    }
  },
  mounted() {
    this.getCurrentlyServed()
  },
  methods: {
    async getCurrentlyServed() {
      let inst = {
        institution_name: store.selectedInstitution.institution_name
      }

      Queue.getCurrent(inst)
          .then((res) => {
            this.currentNum = res.data
          })

      Queue.getSize(inst)
          .then((res) => {
            this.queueState = res.data
          })
    }
  }
}
</script>
