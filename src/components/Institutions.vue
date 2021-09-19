<template>


    <div class="institution-listing">
                <img class="resize" src="@/assets/institution-placeholder.png">
                <span class="button" @click="onInstitutionSelected()">{{ institution.institution_name }}</span>
    </div>


</template>

<script>
import { firebase } from '@/firebase';
import store from '@/store';
import lodash from 'lodash';
export default {
    name: 'Institutions',
    props: ['institution',],
    methods: {
        onInstitutionSelected() { // unknown method god knows what this does
            this.$emit('institution-selected', this.institution);
            store.selectedInstitution= this.institution;
            this.$router.push({name: "enter-q"});
        },
        setIdx(){
            /* for svaki inst iz storea, chekiraj ako ima isto ime ko ova inst - ako ima onda mu dodjeli index i 
            provjeri ako je taj index djeljiv s 5. 
            ispod div-a cemo imat br koji reagira na v-if od computed propertya koji zove funkciju koja


            odnosno u main user-u u break stavimo v-if koji reagira na to dal je index jednak brojevima djeljivim s 5 i 5 br nakon njega */
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
.institution-listing{
    margin-bottom:10%
}
.resize {
    width: 60%;
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
