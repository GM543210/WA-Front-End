<template>
 <div><Header />

  <div class="container main">
    <div class="row">

      <div class="option-wrapper col-sm-6">
        <img class ="hp-icon" src="@/assets/upravljaj-redom.png">
        <router-link class="button" to="/manage-q">UPRAVLJAJ REDOM</router-link>
      </div>

      <div class="option-wrapper col-sm-6">
        <img class ="hp-icon" src="@/assets/zatvori-salter.png">
        <router-link class="button" to="/window-closed">ZATVORI ŠALTER</router-link>
      </div>

    </div>
  </div>

  <!-- <Footer /> -->
 </div>
</template>

<style scoped>
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
import Windows from '@/components/Windows.vue';
import store from '@/store';
import { firebase } from '@/firebase';

export default {
  name: 'manage-window',
  components: {
    HelloWorld,
    Header,
    Footer
  },
  methods:{
    uniqueID() {
        return Math.floor(Math.random() * Date.now())
    },
    addQ(){// Dodaje novi red za odabrani Salter/Window
            
      store.Queue.WindowID = store.selectedWindow.ID;
      let test_counter
      for(test_counter=0;test_counter<32;test_counter++){//prewritten dio, izmisljen red za testiranje koji pocinje od 32. osobe
        let identificationNum=this.uniqueID();
        // adminQ.enqueue(identificationNum)

        store.PQ.ID[test_counter] = identificationNum;
        store.PQ.PlaceInQ[test_counter] = test_counter+1;
      }
      // alert(adminQ.peek())
      //prewritten podatci o trenutnom stanju reda
      store.Queue.PeopleInQ = store.PQ.PlaceInQ.length-17;
      store.Queue.BeingServed = store.PQ.PlaceInQ[16];
      store.Queue.NextInQ = store.PQ.PlaceInQ[17];

      // alert('Trenutno je ' + store.Queue.PeopleInQ + ' ljudi u redu')
      // alert('Trenutno je ' + store.Queue.BeingServed + ' na redu')
      // alert('Sljedeci je ' + store.Queue.NextInQ + ' na redu')
    },
  },
  mounted(){
    this.addQ();
  }
}
</script>
