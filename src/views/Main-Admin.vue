<template>
 <div><Header />
  <H1 class="main-header">{{ store.institution_name }}</H1>

  <div class="container main">

    <!-- <div class="roundBack col-sm-6">
      <img class ="back-icon" src="@/assets/admin-message.png">
      <router-link to="/main-admin"><strong class="buttonBack">&#60; BACK</strong></router-link>
    </div> -->
    <div class="row">
      <div class="option-wrapper col-sm-6">
          <img class ="hp-icon" src="@/assets/upravljaj-redom.png">
        <!-- <router-link to="/manage-window"> -->
        <strong class="button" @click="getToWindow">MANAGE WINDOW</strong>
          <!-- <strong v-if="windowOpen==true" class="button" @click="getToWindow">MANAGE WINDOW</strong>
          <strong v-if="windowOpen==false" class="button">MANAGE WINDOW</strong> -->
        <!-- </router-link> -->
      </div>

      <div class="option-wrapper col-sm-6">
        <img class ="hp-icon" src="@/assets/upravljaj-ustanovom.png">
        <router-link to="/manage-institution">
          <strong class="button">MANAGE INSTITUTION</strong>
        </router-link>
      </div>

    </div>
  </div>

  <!-- <Footer /> -->
 </div>
</template>

<style scoped>
.main {
  margin-top: 19%;
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
  background-color: #5396E9; /* Green */
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

.main-header {
  color:#5396E9;
  font-size: 4vw;
  text-align: center;
}

/* .back-icon {
  width: 105%;
  margin-left: 0%;
  margin-top: 20%;

} */
/* 
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
} */
.container{
margin-left:-5%
}
</style>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import store from '@/store.js'

export default {
  name: 'main-admin',
  components: {
    HelloWorld,
    Header,
    Footer
  },
  data() {
       return {
         store,
         windowOpen: '',
       }
  },
  methods:{
    windowState(){
      if(store.selectedWindow.Caption!=''){
        this.windowOpen=true;
      }
      else{ this.windowOpen=false; }
    },
    getToWindow(){
      this.$router.push({name: "manage-window"});
    }
  //   fakeSaveInstitution(){// 1. Sprema novu instituciju, ako vec postoji provjerava podatke
  //           let user = firebase.auth().currentUser;
  //           firebase
  //           .firestore()
  //           .collection('INSTITUTIONS')
  //           .doc(store.institution_name) //Otvara lokaciju u firestoreu gdje ce se odviti spremanje novih info za tu inst
  //           .set({
  //               Name : store.institution_name,
  //               InstitutionBranchCity : store.branch_office_city,
  //               InstitutionAdress : store.institution_adress,
  //               InstitutionWH:  store.institution_wh,
  //               AuthorizedAdmins: firebase.firestore.FieldValue.arrayUnion(store.UID),
  //               NumberOfWindows: []
  //               },{merge:true})
  //               .then(() =>{
  //                   // alert(`Institution ${store.institution_name} added`)
  //                   console.log(`Institution ${store.institution_name} added`)
  //                   // alert(`UID is ${store.UID}`)
  //           })
  //           .catch((error) =>{
  //             console.log("Error in saving institution", error)
  //           });
  //  },
  //   fakelogin() {
  //       store.fullname='Ivan Ivan'
  //       store.email='test123@mail.com'
  //       store.password='12312'
  //       store.UID='YjwXx3uMw7YCLvB8u2NsJSg53Q7O'
  //       store.institution_name='Zagrebacka Banka'
  //       store.branch_office_city='Pula'
  //       store.institution_adress='Laginjina ulica 1'
  //       store.institution_wh='PON-PET 08-19h'
  //       store.userType='Admin'


  //       console.log('logging in user -> ' + store.email)
        
  //      },

  },
   mounted(){
      // this.fakelogin();
      // this.fakeSaveInstitution();
      this.windowState();
  },
}
</script>
