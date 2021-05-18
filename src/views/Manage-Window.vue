<template>
 <div><Header />
  <div class="jumbotron">
    <h1 class="display-4">Hello, Admin!</h1>
    <p class="lead">Ovdje smo unutar saltera i tu ce bit odabir za Admina zeli li Upravljat Redom ili Zatvoriti ga.</p>
    <hr class="my-4">
    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
    <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
  </div>
  <Footer />
 </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Windows from '@/components/Windows.vue';
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
const adminQ = new Queue();

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
        adminQ.enqueue(identificationNum)

        store.PQ.ID[test_counter] = identificationNum;
        store.PQ.PlaceInQ[test_counter] = test_counter+1;
      }
      // alert(adminQ.peek())
      //prewritten podatci o trenutnom stanju reda
      store.Queue.PeopleInQ = store.PQ.PlaceInQ.length;
      store.Queue.BeingServed = '#' + store.PQ.PlaceInQ[16];
      store.Queue.NextInQ = '#' + store.PQ.PlaceInQ[17];

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
