<template>
 <div><Header />
  <div class="jumbotron">
    <h1 class="display-4">Hello, Admin!</h1>
    <p class="lead">Ovdje smo unutar reda i tu ce bit opcija za Admina za prebacit na sljedecu osobu u redu.</p>
    <hr class="my-4">
    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
    <a class="btn btn-primary btn-lg" href="#" role="button" @click="Next">Learn more</a>
  </div>
  <!-- <Footer /> -->
 </div>
</template>

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
