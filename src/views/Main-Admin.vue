<template>
 <div><Header />

  <div class="container main">
    <div class="row">

      <div class="option-wrapper col-sm-6">
        <img class ="hp-icon" src="@/assets/upravljaj-redom.png">
        <router-link to="/manage-window">
          <strong class="button">MANAGE WINDOW</strong>
        </router-link>
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
</style>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import store from '@/store.js'
import { firebase } from '@/firebase';

export default {
  name: 'main-admin',
  components: {
    HelloWorld,
    Header,
    Footer
  },
  data() {
       return {
         store
       }
  },
  methods:{
    fakeSaveInstitution(){// 1. Sprema novu instituciju, ako vec postoji provjerava podatke
            let user = firebase.auth().currentUser;
            firebase
            .firestore()
            .collection('INSTITUTIONS')
            .doc(store.institution_name) //Otvara lokaciju u firestoreu gdje ce se odviti spremanje novih info za tu inst
            .set({
                Name : store.institution_name,
                InstitutionBranchCity : store.branch_office_city,
                InstitutionAdress : store.institution_adress,
                InstitutionWH:  store.institution_wh,
                AuthorizedAdmins: firebase.firestore.FieldValue.arrayUnion(store.UID),
                NumberOfWindows: []
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
    fakelogin() {
        store.fullname='Ivan Ivan'
        store.email='test123@mail.com'
        store.password='12312'
        store.UID='YjwXx3uMw7YCLvB8u2NsJSg53Q7O'
        store.institution_name='Zagrebacka Banka'
        store.branch_office_city='Pula'
        store.institution_adress='Laginjina ulica 1'
        store.institution_wh='PON-PET 08-19h'
        store.userType='Admin'


        console.log('logging in user -> ' + store.email)
        
       },

  },
   mounted(){
      this.fakelogin();
      this.fakeSaveInstitution();
  },
}
</script>
