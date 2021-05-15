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
               this.$router.replace({name: "main-admin"})
           })
	   .catch((e) => {
               console.error('greska', e);
               //this.kriviUser=true;
           })
        //return kriviUser;
        
       }
  }
}
</script>
