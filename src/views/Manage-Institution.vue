<template>
 <div><Header />

 <div class="container-flex">
<div class="row">

 <form class="col-sm-4">

  <div class="form-group first-label">
    <label for="InstName">Name of institution</label>
    <input type="text" v-model="institution_name" class="form-control" id="InstName">
  </div>

  <div class="form-group">
    <label for="InstCity">City of the branch office</label>
    <input type="text" v-model="branch_office_city" class="form-control" id="InstCity">
  </div>

  <div class="form-group">
    <label for="InstAdress">Institution Adress</label>
    <input type="text" v-model="institution_adress" class="form-control" id="InstAdress">
  </div>

  <div class="form-group">
    <label for="WH">Working Hours</label>
    <input type="text" v-model="institution_wh" class="form-control" id="WH">
  </div>

  <div class="form-group">
    <label for="AvgWait">Average waiting time</label>
    <input type="text" v-model="avgWait" class="form-control" id="AvgWait">
  </div>
  <div class="drop">
    <strong type="button" class="button" @click="updateInstitution">Save</strong>
    <strong type="button" class="button2" @click="Back">&#60; BACK TO MAIN</strong>
  </div>
</form>

<div class="col-sm-2">
</div>

<div class="col-sm-6">
  <h2 class="header-3-big">Windows (max: 8)</h2>
  <div class="centered scroll">
      <Windows v-for="window in WNDW" :key="window.Caption" :window="window" @window-selected="setSelectedWindow"/><!-- @window-selected="setSelectedWindow" -->
      <!-- <img class="assign-to-me" src="@/assets/plus.png"> -->
  </div>
  <img  v-if="win_num!=8" class="plus" @click="addWindow();updateWindowList()" src="@/assets/plus.png">
</div>

</div>
 </div>
   

  
  <!-- <Footer /> -->
 </div>
</template>

<style scoped>
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
  left: 4%;
}


.button2 {
  margin-top: 70px;
  width: 199px;
  height: 40px;
  color:  #5396E9;
  padding: 8px 15px;
  text-align: center;
  display: block;
  font-size: 16px;
  position: absolute;
  left: 28.5%;
  box-shadow: 0 0 0pt 2pt#5396E9;
  border-radius: 250px;
  left: 4%;
  }

.form-group input {
  border-radius: 50px;
  border-color: #5396E9;
}

.first-label {
  margin-top: 37px;
}

.form-group label {
  color: #5396E9;
  font-weight: bold;
}

.header-3-big {
  color:#5396E9;
  font-size: 3vw;
  text-align: center;
  margin-top: 37px;
}

.plus {
  width: 50px;
  margin-left: 245px;
}
.drop{
  margin-top:50px;
}

</style>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Windows from '../components/Windows';
import store from '@/store';
import { Institutions } from '@/services'

export default {
  name: 'manage-institution',
  components: {
    HelloWorld,
    Header,
    Footer,
    Windows
  },
  data: function(){
    return{
      Windows,
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
      old_avgWait:'',
      avgWait:'',
      temp_avgWait:'',
      selectedWindow: {
         'Caption': "",
         'ID':"",
        //  'Assigned': false
      },
      WNDW:[],
      lastWindow:'',
      win_num:'',
      windowOpen: true

    }
  },
  methods:{
    // getOldInfo(){
    //   firebase.firestore()
    //   .collection('INSTITUTIONS')
    //   .get(getOptions)
    //   .then((query) => { //fcija za citanje iz dokumenta iz db
    //     query.forEach((doc) => {
    //       const data = doc.data();
    //       for(var i=0;i<data.AuthorizedAdmins.length;++i){
    //         if(data.AuthorizedAdmins[i] == uid){
    //           this.old_inst_name = doc.data().Name;
    //           this.old_branch_city = doc.data().InstitutionBranchCity;
    //           this.old_adress = doc.data().InstitutionAdress;
    //           this.old_wh = doc.data().InstitutionWH;
    //           this.old_number_of_windows = doc.data().NumberOfWindows;
    //           this.old_avgWait=doc.data().WaitingTime;
    //           // alert(this.old_wh)
    //           //sve radi
    //         }
    //       }
    //     });
    //   }).catch((error) => {
    //       console.log("Error getting cached document:", error);
    //   });
    // },
    // getCurrentInfo(){
    //   firebase.firestore()
    //   .collection('INSTITUTIONS')
    //   .get(getOptions)
    //   .then((query) => { //fcija za citanje iz dokumenta iz db
    //     query.forEach((doc) => {
    //       const data = doc.data();
    //       for(var i=0;i<data.AuthorizedAdmins.length;++i){
    //         if(data.AuthorizedAdmins[i] == uid){
    //           this.institution_name = doc.data().Name;
    //           this.branch_office_city = doc.data().InstitutionBranchCity;
    //           this.institution_adress = doc.data().InstitutionAdress;
    //           this.institution_wh = doc.data().InstitutionWH;
    //           this.number_of_windows = doc.data().NumberOfWindows;
    //           this.avgWait=doc.data().WaitingTime;
    //         }
    //       }
    //     });
    //   }).catch((error) => {
    //       console.log("Error getting cached document:", error);
    //   });
    // },
    // storeOldInfo(){ //sprema prvotni admin info privremeno
    //   this.temp_institution_name = this.old_inst_name;
    //   this.temp_branch_office_city = this.old_branch_city;
    //   this.temp_institution_adress = this.old_adress;
    //   this.temp_institution_wh = this.old_wh;
    //   this.temp_number_of_windows = this.old_number_of_windows;
    //   this.temp_avgWait=this.old_avgWait;
    // },
    // getAllWindows(){
    //          window_counter=0;
    //          firebase.firestore()
    //         .collection('WINDOWS')
    //         .get()
    //         .then((query) => {
    //             query.forEach((doc) => {

    //                 const data = doc.data();
    //                   if(data.AuthorizedAdmins==uid){
    //                     this.WNDW.push({
    //                         'Caption': data.Name,
    //                         'ID': data.WindowID,
    //                         // 'Assigned': store.assignedWinState
    //                     })
    //                     this.lastWindow=data.Name;
    //                     window_counter++;
    //                   }
    //                 console.log(data)
    //             });
    //             this.win_num=window_counter;
    //             this.number_of_windows=window_counter;
    //             // alert(this.number_of_windows)
    //             console.log('This Institution has '+ window_counter + ' windows.')
    //             store.isFirst=true
    //            store.assignedWinState=true 
    //         });
    // },
    // saveInfo(){ //sprema novi info u Firestore
    //     // alert(this.number_of_windows)
    //     firebase
    //     .firestore()
    //     .collection('INSTITUTIONS')
    //     .doc(this.institution_name) //Otvara lokaciju u firestoreu gdje ce se odviti spremanje novih info za tu ustanovu
    //     .set({
    //         Name : this.institution_name,
    //         InstitutionBranchCity : this.branch_office_city,
    //         InstitutionAdress : this.institution_adress,
    //         InstitutionWH: this.institution_wh,
    //         NumberOfWindows: this.number_of_windows,
    //         WaitingTime: this.avgWait
    //     },{merge:true})
    //     .then(() =>{
    //         console.log("User information updated")
    //         // alert(this.number_of_windows)
    //     })
    //     .catch((error) =>{
    //         console.log("Error in updating information", error)
    //      });
    //     //  this.getCurrentInfo();
    //   },
    //   uniqueID() {
    //     return Math.floor(Math.random() * Date.now())
    //   },
    // addWindow(){// 1. Sprema novi salter, ako vec postoji provjerava podatke
    //         // let user = firebase.auth().currentUser;
    //         let rid = this.uniqueID();
    //         window_counter++;
    //         // alert(store.i)
    //         if(window_counter<9){
    //           firebase
    //           .firestore()
    //           .collection('WINDOWS')
    //           .doc(this.institution_name + ' - Window ' + window_counter ) //Otvara lokaciju u firestoreu gdje ce se odviti spremanje novih info za tu inst
    //           .set({
    //               Name : this.institution_name + ' - Window ' + window_counter,
    //               WindowID: rid,
    //               InstitutionOfWindow: this.institution_name,
    //               AuthorizedAdmins: firebase.firestore.FieldValue.arrayUnion(uid),
    //               Open: this.windowOpen,
    //               Current: '',
    //               Next: '',
    //               Total:'',
    //               },{merge:true})
    //               .then(() =>{
    //                   // alert(`Institution ${store.institution_name} added`)
    //                   console.log(`Window ${window_counter} for institution ${store.institution_name} added`)
    //                   this.number_of_windows=window_counter;
    //                   // alert(`UID is ${store.UID}`)
    //                   this.lastWindow=data.Name;
    //                   // store.i=window_counter;
    //           })
    //           .catch((error) =>{
    //             console.log("Error in saving institution", error)
    //           });
    //         }
    //         else{
    //           console.log('Maximum open windows reached')
    //         }
    //   },
    //   setSelectedWindow(){ //ovo se vjerojatno moze direkt iz
    //     this.selectedWindow = window;
    //     // store.selectedWindow.Caption = this.selectedWindow.Caption;
    //     // store.selectedWindow.ID = this.selectedWindow.ID;
    //   },
    //   updateWindowList(){
    //         if(window_counter<9){
    //           firebase.firestore()
    //           .collection('WINDOWS')
    //           .orderBy("Name")
    //           .startAt(this.lastWindow)
    //           .get()
    //           .then((query) => {
    //               query.forEach((doc) => {

    //                   const data = doc.data();
    //                   if(data.Name!=this.lastWindow){
    //                     if(data.AuthorizedAdmins==uid){
    //                       this.WNDW.push({
    //                           'Caption': data.Name,
    //                           'ID': data.WindowID,
    //                           // 'Assigned': store.assignedWinState
    //                       })
    //                       // window_counter++;
    //                       this.lastWindow=data.Name;
    //                     }
    //                   }
    //                   console.log(data)
    //               });
    //               this.win_num=window_counter;
    //               this.number_of_windows=this.window_counter;
    //               console.log('This Institution has '+ window_counter + ' windows.')
    //           });
    //         }
    //   },
      Back(){
      this.$router.push({name: "main-admin"});
      },
      checkAssigned(){
          //  if(store.assignedWindow==''){
          //      alert('Assigned je undefined')
          //  }else alert('Assigned je defined')
          // alert(store.assignedWindow)
  
          // store.assignedWindow
      },

      getInstitutionInfo() {
        let inst = {
          institution_name: store.institution_name
        }

        Institutions.getByName(inst)
                    .then((res) => {
                      this.institution_name = res.data.institution_name
                      this.institution_wh = res.data.institution_wh
                      this.institution_adress = res.data.institution_adress
                      this.branch_office_city = res.data.branch_office_city
                      this.avgWait = res.data.avgWait
                    })
      },

      updateInstitution() {
        let inst = {
          institution_old_name: store.institution_name,
          institution_name: this.institution_name,
          institution_wh: this.institution_wh,
          institution_adress: this.institution_adress,
          branch_office_city: this.branch_office_city,
          avgWait: this.avgWait
        }

        Institutions.update(inst)
                  .then(() => {
                    console.log('Update successful')
                    store.institution_name = this.institution_name
                    this.getInstitutionInfo()
                  })
      }

  },
  mounted() {
        this.getInstitutionInfo();
        // this.getCurrentInfo();
        // this.getAllWindows();
        // this.checkAssigned();
  },

}
</script>
