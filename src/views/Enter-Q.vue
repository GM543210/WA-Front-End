<template>
 <div><Header />
  <div class="jumbotron">
    <h1 class="display-4">Hello, User!</h1>
    <p class="lead">Ovdje ce biti prikazan broj u redu i poziv na ulaz u red.</p>
     <!-- <p class="lead">{{store.selectedInstitution.Caption}}</p> -->
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

export default {
  name: 'enter-q',
  components: {
    HelloWorld,
    Header,
    Footer
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
    getInQ(){
      const q = new Queue();

        store.PQ.ID = this.uniqueID();
        let PersonID = store.PQ.ID;
      
        q.enqueue(PersonID);
        store.PQ.PlaceInQ = q.length
      // alert(q.length);

    }

  }
}
</script>
