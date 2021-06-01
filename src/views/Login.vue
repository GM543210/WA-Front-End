<template>
  <div>
    <h1>This is a login page for Admin</h1>
    <div class="container">
      <div class="row">
        <div class="col-sm">
        </div>
        <div class="col-sm">
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1" >Password</label>
              <input type="password" v-model="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
            </div>
            <button type="button" class="btn btn-primary mt-5"  @click="login">Submit</button>
          </form>
        </div>
        <div class="col-sm">
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { firebase } from '@/firebase';
import store from '@/store.js'

export default {
  name: 'login',
   components: {
   },
   data() {
       return {
           email: '',
           password: '',
          //  uid:'',
          // kriviUser: '',
           store
       }
   },
  methods: {
   login() {
        console.log('logging in user -> ' + this.email)

        firebase.auth()
           .signInWithEmailAndPassword(this.email, this.password)
           .then((result) => {
               
               console.log('Uspješna prijava', result);
               store.authenticated=true;
               let uid=firebase.auth().currentUser.uid;
               let userRef = firebase.firestore().collection('ADMIN-USERS').doc(uid);
               userRef
               .get()
               .then((doc)=>{
                 const data = doc.data();

                  store.fullname=data.FullName;;
                  store.email=data.Email;
                  store.password=data.Password;
                  store.UID=uid;
                  store.institution_name=data.InstitutionName;
                  // store.branch_office_city=data.InstitutionBranchCity;
                  // store.institution_adress=data.InstitutionAdress;
                  // store.institution_wh=data.InstitutionWH;
                });
              let instRef = firebase.firestore().collection('INSTITUTIONS').doc(store.institution_name);
              instRef
              .get()
              .then((doc)=>{
                const data = doc.data();

                store.branch_office_city=data.InstitutionBranchCity;
                store.institution_adress=data.InstitutionAdress;
                store.institution_wh=data.InstitutionWH;
              });
                this.$router.replace({name: "main-admin"})
           })
	   .catch((e) => {
               console.error('greska', e);
               //this.kriviUser=true;
           })
        //return kriviUser;
        
       },
      //  getLoginInfo() {
      //   firebase
      //   .firestore()
      //   .collection('ADMIN-USERS')
      //   .doc(this.uid)
      //   .get()
      //   .then(()=>{
      //     const data = doc.data();

      //     store.fullname=data.FullName;;
      //     store.email=data.Email;
      //     store.password=data.Password;
      //     store.UID=this.uid;
      //     store.institution_name=data.InstitutionName;
      //     store.branch_office_city=data.InstitutionBranchCity;
      //     store.institution_adress=data.InstitutionAdress;
      //     store.institution_wh=data.InstitutionWH;
      //   });
      //     console.log('logging in user -> ' + store.email)
        
      //  },
  }
}
</script>
