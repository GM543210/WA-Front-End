<template>
 <div><Header />

<H1 class="main-header">{{store.selectedInstitution.Caption}}</H1>

<h2 class="header-2">People in Queue:</h2>

<div class="counter">
<h3 class="header-3">33</h3>
<router-link class="button" to="/queued">GET QUEUE'D</router-link>
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
import { firebase } from '@/firebase';

class Queue{
  constructor(){
    this.people = {};
    this.headIndex = 0;
    this.tailIndex = 0;
  }

  enqueue(PersonID){
    this.people[this.tailIndex] = PersonID;
    this.tailIndex++;
  }

  dequeue(){
    const PersonID = this.people[this.headIndex];
    delete this.people[this.headIndex];
    this.headIndex++;
    return PersonID;
  }

  peek(){
    return this.people[this.headIndex];
  }

  get length(){
    return this.tailIndex - this.headIndex;
  }
}
const localQ = new Queue();
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
      institutionName:'',
    }
  },
  methods:{
    uniqueID() {
        return Math.floor(Math.random() * Date.now())
    },
    getInQTest(){ //test n info
      const q = new Queue();
      let a;
      for(a=0 ; a<5 ; a++){ //vrti pet puta samo za test
        store.PQ.ID = this.uniqueID();
        let PersonID = store.PQ.ID;
        // alert(PersonID)

        q.enqueue(PersonID);
        if(a==4){
          let brojuredu = q.length;
            // alert(brojuredu) //vraca broj u redu
        }
      }
      // alert(q.length);

    },
    getInLine(){ //dodaje osobu u red
        // store.PQ.ID = this.uniqueID();
        // let PersonID = store.PQ.ID;
        let PersonID = this.uniqueID();
        store.PQ.ID[store.PQ.PlaceInQ.length] = PersonID;
        store.PQ.PlaceInQ[store.PQ.PlaceInQ.length] = store.PQ.PlaceInQ.length+1;

        localQ.enqueue(PersonID); //u lokalni red ubacuje person ID
            // q.enqueue(PersonID);
        store.q=localQ; //u pravi red iz storea ubacuje person ID
        // alert(store.q.peek()) vraca prvog na redu
        // alert(store.q.length) vraca duzinu reda
        alert('U redu si, na '+ (store.PQ.PlaceInQ.length) +'. mjestu')
        this.$router.replace({name: "queued"})

    }

  }
}
</script>
