<template>
 <div><Header />
  <div class="jumbotron">
    <h1 class="display-4">Hello, Admin!</h1>
    <p class="lead">Ovdje smo unutar institucije i tu ce bit opcije za Admina kojima moze mijenjat info ustanove ili dodat saltere.</p>
    <hr class="my-4">
    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
    <a class="btn btn-primary btn-lg" href="#" role="button" @click="addWindow">Learn more</a>
  </div>
   <!-- 
    <div class="col-4 PrListing">
       <div class="centered scroll">
        <Windows v-for="window in WNDW" :key="window.Caption" :window="window" @window-selected="setSelectedWindow" />
       </div>
        <button type="button" class="button addbtn showBtn" @click="showMore"><span>Show more windows</span></button>
     </div>
   -->
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


// let uid = firebase.auth().currentUser.uid; //pravi UID, za sada ne treba
let uid = store.UID; //za testiranje
let window_counter = 0;
var getOptions = {
    source: 'default'
};

export default {
  name: 'manage-institution',
  components: {
    HelloWorld,
    Header,
    Footer
  },
  data: function(){
    return{
      store,
      imageReference1: null,
      old_inst_name:'',
      institution_name: '',
      temp_institution_name: '',
      old_branch_city:'',
      branch_office_city: '',
      temp_branch_office_city: '',
      old_adress:'',
      institution_adress: '',
      temp_institution_adress: '',
      old_wh:'',
      institution_wh: '',
      temp_institution_wh: '',
      old_number_of_windows:'',
      number_of_windows: '',
      temp_number_of_windows: '',
      selectedWindow: {
         'Caption': "",
         'ID':""
      },
      WNDW:[]

    }
  },
  methods:{
    getOldInfo(){
      firebase.firestore()
      .collection('INSTITUTIONS')
      .get(getOptions)
      .then((query) => { //fcija za citanje iz dokumenta iz db
        query.forEach((doc) => {
          const data = doc.data();
          for(var i=0;i<data.AuthorizedAdmins.length;++i){
            if(data.AuthorizedAdmins[i] == uid){
              this.old_inst_name = doc.data().Name;
              this.old_branch_city = doc.data().InstitutionBranchCity;
              this.old_adress = doc.data().InstitutionAdress;
              this.old_wh = doc.data().InstitutionWH;
              this.old_number_of_windows = doc.data().NumberOfWindows
              // alert(this.old_wh)
              //sve radi
            }
          }
        });
      }).catch((error) => {
          console.log("Error getting cached document:", error);
      });
    },
    getCurrentInfo(){
      firebase.firestore()
      .collection('INSTITUTIONS')
      .get(getOptions)
      .then((query) => { //fcija za citanje iz dokumenta iz db
        query.forEach((doc) => {
          const data = doc.data();
          for(var i=0;i<data.AuthorizedAdmins.length;++i){
            if(data.AuthorizedAdmins[i] == uid){
              this.institution_name = doc.data().Name;
              this.branch_office_city = doc.data().InstitutionBranchCity;
              this.institution_adress = doc.data().InstitutionAdress;
              this.institution_wh = doc.data().InstitutionWH;
              this.number_of_windows = doc.data().NumberOfWindows
            }
          }
        });
      }).catch((error) => {
          console.log("Error getting cached document:", error);
      });
    },
    storeOldInfo(){ //sprema prvotni admin info privremeno
      this.temp_institution_name = this.old_inst_name;
      this.temp_branch_office_city = this.old_branch_city;
      this.temp_institution_adress = this.old_adress;
      this.temp_institution_wh = this.old_wh;
      this.temp_number_of_windows = this.old_number_of_windows
    },
    getAllWindows(){
             
             firebase.firestore()
            .collection('WINDOWS')
            .get()
            .then((query) => {
                query.forEach((doc) => {

                    const data = doc.data();
                      if(data.AuthorizedAdmins==uid){
                        this.WNDW.push({
                            'Caption': data.Name,
                            'ID': data.WindowID
                        })
                        window_counter++;
                      }
                    console.log(data)
                });
                console.log('This Institution has '+ window_counter + ' windows.')
            });
    },
    saveInfo(){ //sprema novi info u Firestore
        
        firebase
        .firestore()
        .collection('INSTITUTIONS')
        .doc(this.institution_name) //Otvara lokaciju u firestoreu gdje ce se odviti spremanje novih info za tu ustanovu
        .set({
            Name : this.institution_name,
            InstitutionBranchCity : this.branch_office_city,
            InstitutionAdress : this.institution_adress,
            InstitutionWH: this.institution_wh,
            NumberOfWindows: this.number_of_windows
        },{merge:true})
        .then(() =>{
            console.log("User information updated")
        })
        .catch((error) =>{
            console.log("Error in updating information", error)
         });
      },
      uniqueID() {
        return Math.floor(Math.random() * Date.now())
      },
      addWindow(){// 1. Sprema novu instituciju, ako vec postoji provjerava podatke
            // let user = firebase.auth().currentUser;
            let rid = this.uniqueID();
            store.i++;
            alert(store.i)
            firebase
            .firestore()
            .collection('WINDOWS')
            .doc(this.institution_name + ' - Window ' + store.i ) //Otvara lokaciju u firestoreu gdje ce se odviti spremanje novih info za tu inst
            .set({
                Name : this.institution_name + ' - Window ' + store.i,
                WindowID: rid,
                InstitutionOfWindow: this.institution_name,
                AuthorizedAdmins: firebase.firestore.FieldValue.arrayUnion(uid),
                },{merge:true})
                .then(() =>{
                    // alert(`Institution ${store.institution_name} added`)
                    console.log(`Institution ${store.institution_name} added`)
                    // alert(`UID is ${store.UID}`)
            })
            .catch((error) =>{
              console.log("Error in saving institution", error)
            });
      },
      setSelectedWindow(){ //ovo se vjerojatno moze direkt iz
        store.selectedWindow.Caption = this.selectedWindow.Caption;
        store.selectedWindow.ID = this.selectedWindow.ID;
      },
  },
  mounted() {
        this.getOldInfo();
        this.getCurrentInfo();
        this.getAllWindows();
  },

}
</script>
