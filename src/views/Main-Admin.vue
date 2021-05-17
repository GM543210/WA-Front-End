<template>
 <div><Header />
  <div class="jumbotron">
    <h1 class="display-4">Hello, Admin!</h1>
    <p class="lead">Ovdje ce biti odabir za Admina zeli li Upravljat Salterom ili Ustanovom.</p>
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
                AuthorizedAdmins: firebase.firestore.FieldValue.arrayUnion(store.UID)
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
