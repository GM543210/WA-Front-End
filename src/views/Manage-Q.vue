<template>
 <div>
  <Header />
  <div class="container main">
      <div class="row">

        <div class="option-wrapper col-sm-3">
          <p class="normal-text">People in Queue</p>
          <div class="counter">
            <h3 class="header-3">{{total}}</h3>
          </div>
          

        </div>

         <div class="option-wrapper col-sm-4">
          <p class="text-big">Currently served</p>
          <div class="counter-big">
            <h3 class="header-3-big">#{{current}}</h3>
          </div>
          <strong v-if="total>0" class="button" @click="Next">NEXT</strong>
          <strong v-if="total<=0" class="button transparent">NEXT</strong>
          <strong class="button2" @click="Back">&#60; BACK TO WINDOW</strong>

        </div>

        <div class="option-wrapper col-sm-3">
          <p class="normal-text">Next in Line</p>
          <div v-if="total>0" class="counter">
            <h3 class="header-3">{{next}}</h3>
          </div>
            <h3 v-if="total<=0" class="header-3">{{next}}</h3>


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

.button2 {
  margin-top: 60px;
  /* background-color:white; */
  width: 199px;
  color:  #5396E9;
  padding: 5px 15px;
  text-align: center;
  display: block;
  font-size: 16px;
  position: absolute;
  left: 28.5%;
  /* border-color: #5396E9!important;
  border-radius: 250px;
  outline-color: #5396E9!important;
  outline-width: 50px; */
  /* outline: 5px solid #5396E9; */
  box-shadow: 0 0 0pt 2pt#5396E9;
  border-radius: 250px;
  
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
  white-space: nowrap;
}

.text-big {
  color:#5396E9;
  font-size: 2.5vw;
  margin-left: 16.5%;
}

.transparent {
  opacity:20%;
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
        this.next='#'+store.Queue.NextInQ
        this.total=store.Queue.PeopleInQ

        if(this.total<=0){
          this.next='No one'
        }
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
    Back(){
      if (store.Queue.PeopleInQ!=0) store.isEmpty=false;
      this.$router.push({name: "manage-window"});
    }
  },
  mounted(){
    this.getQData();
  }
}
</script>
