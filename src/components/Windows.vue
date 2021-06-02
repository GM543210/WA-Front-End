<template>

<div class="container centered">
    <div class="">
        <div class="col-2">
            <div class="windows">
                <span class="caption" @click="onWindowSelected()">{{ window.Caption }}
                    <!-- <strong class="hide-button" @click="deleteWindow()">x</strong> -->
                </span>
                <span type="button" class="assignToMe" v-bind:style="[window.Caption==windowName ? {'background': '#5396E9'}:{}]">assign to me</span>
            </div>
        </div>
        <br>

    </div>
</div>

</template>

<script>
import { firebase } from '@/firebase';
import store from '@/store';
export default {
    name: 'Windows',
    props: ['window',],
    // data(){
    //     return{
    //         windowName:'',
    //     }
    // },
    methods: {
        onWindowSelected() {
            this.$emit('window-selected', this.window);
            store.selectedWindow=this.window;
            this.windowName=this.window.Caption;
            // this.$router.push({name: "manage-window"});
        },
        // deleteWindow(){
        //     // alert('Window '+ this.window.Caption)
        //     firebase
        //     .firestore()
        //     .collection('WINDOWS')
        //     .doc(this.window.Caption)
        //     .delete()
        //     .then(() =>{
        //         console.log('Window '+ this.window.Caption+' closed.')
        //     }).catch((error) => {
        //         console.error("Error in closing window: ", error);
        //     });
        // }
    },
};

</script>

<style>
strong{
    display: block
}

.windows {
    cursor: pointer;
    margin-left:0px;
    text-align:center;
    white-space: nowrap;    
}

.caption {
    display: block;
    margin-top: 2px;
    width: 300px;
    border: 1px solid;
    border-radius: 50px;
    border-color: #5396E9;
    background-color: #5396E9;
    display: inline-block;
    height: calc(1.5em + .75rem + 2px);
    /* white-space: nowrap; */
    /* overflow: hidden; */
    padding:5px;
    color:white;
    white-space: nowrap;
}

.assignToMe{
    display: inline-block;
    font-size: 1rem;
    padding:5px;
    font-family: helvetica;
    color:  #5396E9;
    width: 140px;
    background-color:white;
    border: 1px solid;
    border-radius: 50px;
    opacity:50%

}

.assignToMe:hover {
opacity:100%;
}

/* .hide-button {
    float: right;
    margin-left: -15px;
    font-size: 20px;
    font-family: helvetica;
    color: white;
    display: none;
    margin-top: -2px;
    margin-right: 8px;
} */

/* .windows:hover {
background-color:white;
} */

</style>