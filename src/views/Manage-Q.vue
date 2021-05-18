<template>
 <div>
  <Header />
  <div class="container main">
      <div class="row">

        <div class="option-wrapper col-sm-3">
          <p class="normal-text">Ljudi u redu</p>
          <div class="counter">
            <h3 class="header-3">28</h3>
          </div>
          

        </div>

         <div class="option-wrapper col-sm-4">
          <p class="text-big">Trenutni broj</p>
          <div class="counter-big">
            <h3 class="header-3-big">173</h3>
          </div>
          <router-link class="button" to="#">SLJEDEĆI</router-link>

        </div>

        <div class="option-wrapper col-sm-3">
          <p class="normal-text">Sljedeći broj</p>
          <div class="counter">
            <h3 class="header-3">174</h3>
          </div>

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
  background-color: #5396E9;
  width: 200px;
  border-radius: 25px;
  color: white;
  padding: 5px 15px;
  text-align: center;
  display: block;
  font-size: 25px;
  position: absolute;
  left: 28.5%;
}

.header-3 {
  color:#5396E9;
  font-size: 3vw;
  text-align: center;
  margin-top: 15px;
}

.header-3-big {
  color:#5396E9;
  font-size: 3vw;
  text-align: center;
  margin-top: 37px;
}

.counter {
  border-radius: 50%;
  border: 5px solid #5396E9;
  width:100px;
  height: 100px;
  margin-left: 32%;
  margin-bottom:5%;
}

.counter-big {
  border-radius: 50%;
  border: 5px solid #5396E9;
  width:150px;
  height: 150px;
  margin-left: 35%;
  margin-bottom:5%;
}

.normal-text {
  color:#5396E9;
  font-size: 1.8vw;
  margin-left: 10%;
}

.text-big {
  color:#5396E9;
  font-size: 2.5vw;
  margin-left: 16.5%;
}
</style>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import store from '@/store';

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
const adminQ_ID = new Queue();
const adminQ_Place = new Queue();

export default {
  name: 'manage-q',
  components: {
    HelloWorld,
    Header,
    Footer
  },
  data(){
    return{
        current:'',
        next:'',
        total:'',
    }
  },
  methods:{
    uniqueID() {
        return Math.floor(Math.random() * Date.now())
    },
    getQData(){
        this.current=store.Queue.BeingServed
        this.next=store.Queue.NextInQ
        this.total=store.Queue.PeopleInQ
        // alert('Trenutno je ' + this.total + ' ljudi u redu')
        // alert('Trenutno je #' + this.current + ' na redu')
        // alert('Sljedeci je #' + this.next + ' na redu')

    },
    Next(){// Mice osobu iz reda i sluzi novu
        store.PQ.ID.shift();
        store.PQ.PlaceInQ.shift();

        store.Queue.PeopleInQ = store.Queue.PeopleInQ-1;
        store.Queue.BeingServed = store.Queue.NextInQ;
        store.Queue.NextInQ = store.Queue.NextInQ+1;

        this.getQData();
    },
  },
  mounted(){
    this.getQData();
  }
}
</script>
