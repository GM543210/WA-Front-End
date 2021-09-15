<template>
  <div>
    <div class="container">
      <h1 class="headline">Register into your working institution</h1>
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
            <button type="button" class="btn btn-primary mt-3 button" @click="signup">Submit</button>
          </form>
        </div>
        <div class="col-sm">
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.container{
  margin-top:2rem
}

.headline{
 text-align:center;
 color:#5396E9;
}

.button{
  background-color:#5396E9;
  margin-bottom:20%
}
</style>

<script>
import { firebase } from '@/firebase';
import store from '@/store.js'
import { Auth, Institutions } from '@/services'

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

           store
       }
   },
   computed:{
        gibUserType(){
            return this.store.userType;
        }
    },
  methods: {
    async signup() {
      let newInstitution = {
        institution_name: this.institution_name,
        institution_adress: this.institution_adress,
        institution_wh: this.institution_wh,
        branch_office_city: this.branch_office_city
      }

      Institutions.create(newInstitution)
      
      let newUser = {
        fullname: this.fullname,
        email: this.email,
        password: this.password,
        institution_name: this.institution_name
      }

      Auth.register(newUser)
        .then(() => {
          this.$router.replace({ name: 'login' })
        })

    },
  }
}
</script>
