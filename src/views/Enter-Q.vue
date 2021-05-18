<template>
 <div><Header />
  <div class="jumbotron">
    <h1 class="display-4">Hello, User!</h1>
    <p class="lead">Ovdje ce biti prikazan broj u redu i poziv na ulaz u red.</p>
     <!-- <p class="lead">{{store.selectedInstitution.Caption}}</p> -->
    <hr class="my-4">
    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
    <a class="btn btn-primary btn-lg" href="#" role="button" @click="getInLine">Learn more</a>
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
const localQ = new Queue();
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
