<template>
 <div><Header />

  <H1 class="main-header">{{currentWindowName}}</H1>
  <div class="container" v-bind:style="[windowOpen ? {'margin-top': '3%'}:{'margin-top': '3%'}]">
    <div class="roundBack col-sm-6">
      <img class ="back-icon" src="@/assets/admin-message.png">
      <router-link to="/main-admin"><strong class="buttonBack">&#60; BACK</strong></router-link>
    </div>
    <div class="row">
        <div class="option-wrapper col-sm-6" v-bind:style="[windowOpen ? {}:{'opacity': '20%'}]">
          <img class ="hp-icon" src="@/assets/upravljaj-redom.png">
          <strong v-if="windowOpen==true" class="button" @click="openQ">MANAGE QUEUE</strong>
          <strong v-if="windowOpen==false" class="button">MANAGE QUEUE</strong>
        </div>

      <div class="option-wrapper col-sm-6">
        <img class ="hp-icon" src="@/assets/zatvori-salter.png">
        <strong v-if="windowOpen==true" class="button" @click="closeWindow();getWindowInfo()">CLOSE WINDOW</strong>
        <strong v-if="windowOpen==false" class="button" @click="openWindow()">OPEN WINDOW</strong>
      </div>

    </div>
  </div>

  <!-- <Footer /> -->
 </div>
</template>

<style scoped>
/* .main {
  margin-top: 3%;
} */

.row {
  margin-left: 10%;
}

.option-wrapper{
  text-align: center;
  width:20%;
  position: relative;
}

.hp-icon {
  width: 50%;
}

.back-icon {
  width: 105%;
  margin-left: 0%;
  margin-top: 20%;

}

/* 
.transparent {
  opacity:20%;
} */

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
  left: 29%;
  margin-top: 15px;
}

.buttonBack {
  background-color: white;
  width: 100px;
  border-radius: 25px;
  color:  #5396E9;
  padding: 5px 15px;
  text-align: center;
  display: block;
  font-size: 16px;
  position: absolute;
  left: -8%;
  margin-top: 30px;
  box-shadow: 0 0 0pt 2pt#5396E9;

}

.roundBack {
    top:180px;
    left:-100px;
    border-radius: 50%;
    border: 4px solid #5396E9;
    width: 100px;
    height: 100px;
}

.main-header {
  color:#5396E9;
  font-size: 4vw;
  text-align: center;
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
  data(){
    return {
      currentWindowName:'',
      windowOpen: '',
      // styleObject: {
      // color: 'red',
      // fontSize: '13px'
      // }
    }
  },
  methods:{
    uniqueID() {
        return Math.floor(Math.random() * Date.now())
    },
    getWindowName(){
      this.currentWindowName=store.selectedWindow.Caption;
      // alert()
    },
    getWindowInfo(){
      firebase
      .firestore()
      .collection('WINDOWS')
      .doc(this.currentWindowName) //Otvara lokaciju u firestoreu gdje ce se odviti spremanje novih info za taj window
      .get()
      .then((doc) =>{
         const data=doc.data();
         this.windowOpen = data.Open;
         console.log('Statement that this window is open is '+ this.windowOpen)
      })
      .catch((error) =>{
        console.log("Error in getting info", error)
      });
      if(store.isEmpty!=true){
        this.getExistingQ();
      }
    },
    addQ(){// Dodaje novi red za odabrani Salter/Window
      alert('creating new queue')      
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
      firebase
              .firestore()
              .collection('WINDOWS')
              .doc(store.selectedWindow.Caption) //Otvara lokaciju u firestoreu gdje ce se odviti spremanje novih info za tu inst
              .set({
                Current: store.Queue.BeingServed,
                Next: store.Queue.NextInQ,
                Total:store.Queue.PeopleInQ,
              },{merge:true})
              .then(() =>{
                // alert(store.Queue.PeopleInQ)
                  console.log('Queue info saved for window '+ store.selectedWindow.Caption);
              })
              .catch((error) =>{
                console.log("Error in saving queue info", error)
              });
    //  store.isEmpty=false; 
    },
    getExistingQ(){
      firebase
      .firestore()
      .collection('WINDOWS')
      .doc(this.currentWindowName) //Otvara lokaciju u firestoreu gdje ce se odviti spremanje novih info za taj window
      .get()
      .then((doc) =>{
         const data=doc.data();
         store.Queue.PeopleInQ = data.Total
         store.Queue.BeingServed = data.Current
         store.Queue.NextInQ = data.Next

         console.log('Queue Info acquired')
      })
      .catch((error) =>{
        console.log("Error in getting queue info", error)
      });
    },
    closeWindow(){
      store.isEmpty=true;

      firebase
      .firestore()
      .collection('WINDOWS')
      .doc(this.currentWindowName) //Otvara lokaciju u firestoreu gdje ce se odviti spremanje novih info za taj window
      .set({
        Open: false
      },{merge:true})
      .then(() =>{
        store.isEmpty=true
        store.Queue.BeingServed='';
        store.Queue.NextInQ='';
        store.Queue.PeopleInQ='';
         this.$router.push({name: "window-closed"});
      })
      .catch((error) =>{
        console.log("Error in closing window", error)
      });
    //dodat reset reda


    },
    openWindow(){
      store.isEmpty=true;
      firebase
      .firestore()
      .collection('WINDOWS')
      .doc(this.currentWindowName) //Otvara lokaciju u firestoreu gdje ce se odviti spremanje novih info za taj window
      .set({
        Open: true
      },{merge:true})
      .then(() =>{
         console.log('window opened')
         this.getWindowInfo();
      })
      .catch((error) =>{
        console.log("Error in opening window", error)
      });
    },
    openQ(){
      if(store.isEmpty==true){
        this.addQ();
      }
      else if(store.isExisting==true){
        this.getExistingQ();
      }
      this.$router.push({name: "manage-q"});
    }
  },
  mounted(){
    // this.addQ();
    this.getWindowName();
    this.getWindowInfo();
  }
}
</script>
