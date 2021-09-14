<template>
 <div><Header />

<H1 class="main-header">{{store.selectedInstitution.institution_name}}</H1>

<h2 class="header-2">People in Queue:</h2>

<div class="counter">
<h3 class="header-3">{{ queue_size }}</h3>
<span class="button" @click="onGetQueuedPressed()">GET QUEUE'D</span>
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

.centered {
  text-align: center;
}

.header-2 {
  color:#5396E9;
  font-size: 3vw;
  text-align: center;
  margin-top: 10%;
  margin-bottom: 5%;
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
  margin-bottom:20%
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
  left: 41.5%;
  margin-top: 70px;
}

</style>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import store from '@/store';
import { Queue } from '@/services'

export default {
  name: 'enter-q',
  components: {
    HelloWorld,
    Header,
    Footer
  },
  data(){
    return{
      store,
      queue_size: 0,
      institutionName:'',
    }
  },
  mounted() {
    this.getQueueSize()
  },
  methods:{
    async getQueueSize() {
      let data = {
        institution_name: store.selectedInstitution.institution_name
      }

      Queue.getSize(data)
          .then((res) => {
            this.queue_size = res.data
          })
    },

    onGetQueuedPressed() {
      let inst = {
        institution_name: store.selectedInstitution.institution_name
      }

      Queue.addToQueue(inst)
          .then((res) => {
            store.queuePosition = res.data
            this.$router.replace('/queued')
          })
    }
  }
}
</script>
