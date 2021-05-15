<template>
  <div>
    <h1>This is a signup page</h1>
    <div class="container">
      <div class="row mt-5">
        <div class="col-sm">
        </div>
        <div class="col-sm">
          <form>
            <div class="form-group">
              <label for="nameField">Full name</label>
              <input type="text" v-model="fullname" class="form-control" id="nameField" placeholder="John Doe">
            </div>
            <div class="form-group">
              <label for="emailField">Email address</label>
              <input type="email" v-model="email" class="form-control" id="emailField" aria-describedby="emailHelp" placeholder="Enter email">
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              <label for="passwordField">Password</label>
              <input type="password" v-model="password" class="form-control" id="passwordField" placeholder="Password">
            </div>
            <div class="form-group">
              <label for="confirmPasswordField">Confirm Password</label>
              <input type="password" v-model="repeat_password" class="form-control" id="confirmPasswordField" placeholder="Confirm password">
            </div>
            <div class="form-group">
              <label for="institutionField">Name of the institution you work for</label>
              <input type="text" v-model="institution_name" class="form-control" id="institutionField" aria-describedby="emailHelp" placeholder="Institution name">
            </div>
            <div class="form-group">
              <label for="institutionBranchCity">City of the branch office</label>
              <input type="text" v-model="branch_office_city" class="form-control" id="institutionBranchCity" aria-describedby="emailHelp" placeholder="Institution branch city">
            </div>
            <div class="form-group">
              <label for="institutionAdress">Institution adress</label>
              <input type="text" v-model="institution_adress" class="form-control" id="institutionAdress" placeholder="Institution adress">
            </div>
            <div class="form-group">
              <label for="institutionWorkingHours">Institution working hours</label>
              <input type="text" v-model="institution_wh" class="form-control" id="institutionWorkingHours" placeholder="9 AM - 15 PM">
            </div>
            <button type="button" class="btn btn-primary mt-5" @click="signup">Submit</button>
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
  name: 'signup',
   components: {
   },
   data() {
       return {
           fullname: '',
           email: '',
           password: '',
           repeat_password: '',
           institution_name: '',
           branch_office_city: '',
           institution_adress: '',
           institution_wh: '',
          // kriviUser: '',
           store
       }
   },
   computed:{
        gibUserType(){
            return this.store.userType;
        }
    },
  methods: {
   signup() {
        console.log('logging in user -> ' + this.email)

        firebase.auth()
           .createUserWithEmailAndPassword(this.email, this.password)
           .then(cred => {
               firebase.firestore().collection('ADMIN-USERS').doc(cred.user.uid).set({ //uzimamo podatke s .get
               // and we add to the database additional requested details
               FullName: this.fullname,
               Email : this.email,
               IntitutionName : this.institution_name,
               InstitutionBranchCity : this.branch_office_city,
               InstitutionAdress : this.institution_adress,
               InstitutionWH: this.institution_wh,
               Password : this.password,
               TypeOfUser : Admin 
               // console.log('Uspješna Registracija');
                })
               console.log('Uspješna prijava');
              //  this.$router.replace({name: "main-admin"})
           })
	        .catch(function(error) {
               console.error('greska', error);
               //this.kriviUser=true;
           })
        //return kriviUser;
        
       }
  }
}
</script>
