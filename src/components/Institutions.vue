<template>

 <!-- <div class="row prvi ustanove"> -->
    <!-- <div class="col"> -->
        <!-- <div  class="list-container"> -->
            <!-- <div class="institutions">
                <img class="resize" src="@/assets/institution.png">
                <span class="caption" @click="onInstitutionSelected()">{{ institution.Caption }}</span>
            </div> -->
            <figure>
                <img class="resize" src="@/assets/institution.png">
                <figcaption @click="onInstitutionSelected()">{{ institution.Caption }}</figcaption>
            </figure>
        <!-- </div> -->
        <!-- </div> -->
  <!-- </div> -->

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
        },
    },
};

</script>

<style>

figure{
    display:inline;
}

.institutions {
    vertical-align: top;
    /* display: inline-block; */
    text-align: center;
    margin-right: 3%;
    display: inline; 

}
.resize {
    width: 10%;
    /* display: inline; */
}

.caption {
   position: absolute;
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
  position: absolute;
  margin-top: 15px;
  left:28%;
}

</style>
