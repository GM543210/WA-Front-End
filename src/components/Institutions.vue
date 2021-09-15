<template>


    <div class="col">
                <img class="resize" src="@/assets/institution.png">
                <span class="button" @click="onInstitutionSelected()">{{ institution.institution_name }}</span>
        </div>


</template>

<script>
import { firebase } from '@/firebase';
import store from '@/store';
export default {
    name: 'Institutions',
    props: ['institution',],
    methods: {
        onInstitutionSelected() { // unknown method god knows what this does
            this.$emit('institution-selected', this.institution);
            store.selectedInstitution= this.institution;
            this.$router.push({name: "enter-q"});
        },
    },
};

</script>

<style>
.institutions {
    vertical-align: top;
    /* display: inline-block; */
    text-align: center;
    margin-right: 3%;
    display: inline; 

}
.resize {
    width: 50%;
    /* display: inline; */
}

.caption {
   position: relative;
   text-align: center;
   /* display: block; */
    margin-top: 2px;
   /* display: inline; */

}

.prvi {
  margin-top: 100px;
}

.button {
  background-color: #5396E9; /* Green */
  width: 100px;
  border-radius: 25px;
  color: white;
  padding: 6px 8px;
  text-align: center;
  display: block;
  font-size: 15px;
  position: relative;
  margin:auto; 
  margin-top: 15px;
}

</style>
