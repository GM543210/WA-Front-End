<template>

<div class="container centered">
    <div class="">
        <div class="col-2">
            <div class="windows">
                <span v-if="IsAssigned  != true" class="caption" v-bind:style="[beBlue == true ? {'background': '#5396E9'}:{'opacity': '20%'}]">{{ window.Caption }}</span>
                <span v-if="IsAssigned  == true" class="caption" @click="onWindowSelected()" v-bind:style="[beBlue == true ? {'background': '#5396E9'}:{'opacity': '20%'}]">{{ window.Caption }}</span>                
                <!-- <span v-if="beBlue == true" type="button" class="assignToMeActive">assigned to me</span> 
                <span v-if="beBlue != true" type="button" class="assignToMePassive" @click="removeAssign();checkAssignedWindow();AssignToMe();">assign to me</span>  -->
                <span v-if="uzas  == true" type="button" class="assignToMeActive">assigned to me</span> 
                <span v-if="uzas  != true" type="button" class="assignToMePassive" @click="removeAssign();checkAssignedWindow();AssignToMe();">assign to me</span> 
                
                <!-- v-bind:style="[windowName==window.Caption ? {'background': '#5396E9'}:{'background': 'white'}]" -->
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
    computed:{
        uzas(){
            

            if(store.assignedWindow==this.window.Caption){
                this.beBlue=true
            }
            else {
                this.beBlue=false       
            }
                return this.beBlue
        },
        IsAssigned(){
            if(store.assignedWindow==this.window.Caption){
                this.assigned=true
            }
            else {
                this.assigned=false                
            }
                return this.assigned
        }
    },
    data(){
        return{
            windowName:'',
            assignedWindowHelp:'',
            beBlue:false,
            assigned:false,
        }
    },
    methods: {
        checkAssignedWindow(){
           if(store.assignedWindow==this.window.Caption){
               this.beBlue=true
               this.assigned=true
            //    alert(this.beBlue)
           } else {
               this.beBlue=false;
               this.assigned=true
             }
        },
        onWindowSelected() {
            this.$emit('window-selected', this.window);
            store.selectedWindow=this.window;
            this.windowName=this.window.Caption;
            this.$router.push({name: "manage-window"});
        },
        AssignToMe(){
            // alert('window info AAAAAAAAAAA' )
            if(store.assignedWinState==false){
                store.selectedWindow=this.window;
                store.selectedWindow.Caption = this.window.Caption;
                store.selectedWindow.ID = this.window.ID;
                // alert(store.selectedWindow.Caption)
                this.windowName=store.selectedWindow.Caption
                store.assignedWindow=this.window.Caption;
                this.assignedWindowHelp=store.assignedWindow;
                store.assignedWinState=true;
                this.assigned=store.assignedWinState;
                this.beBlue=true;
                store.isFirst=false;
                // alert(store.assignedWindow);
                
            }
        },
        removeAssign(){  
          if(store.isFirst==true){
              store.assignedWindow=this.window.Caption;
            //   alert(this.window.Caption )

               firebase
               .firestore()
               .collection('WINDOWS')
               .doc(this.window.Caption) //Otvara lokaciju u firestoreu gdje ce se odviti spremanje novih info za taj window
               .get()
               .then((doc) =>{
                   const data=doc.data();
                //    alert(data.Total)
                 if(data.Total!=15 || data.Total!=0){
                    store.isExisting=true;
                    
                 }
                    //dodah ovo

                   console.log('Queue Info acquired')
                            // alert('Get fresh q data poslije kaze'+ store.Queue.PeopleInQ)

                })
                .catch((error) =>{
                    console.log("Error in getting queue info", error)
                });
              this.checkAssignedWindow();
              this.AssignToMe();

          }

          
          if(store.selectedWindow.Caption!=this.window.Caption ){
            // if(store.assignedWinState!=true){
            //     store.selectedWindow.Caption=this.window.Caption
            // }
         
            firebase
              .firestore()
              .collection('WINDOWS')
              .doc(store.selectedWindow.Caption) //Otvara lokaciju u firestoreu gdje ce se odviti spremanje novih info za tu inst
              .set({
                  Current: store.Queue.BeingServed,
                  Next: store.Queue.NextInQ,
                  Total:store.Queue.PeopleInQ,
                  },{merge:true})
                  .then(() =>{
                      console.log('Queue info saved for window '+ store.selectedWindow.Caption);
                      if(store.assignedWinState==true){
                        this.windowName='';
                        store.assignedWinState=false;
                        this.assigned=store.assignedWinState;
                        // store.selectedWindow=this.window;
                        // store.selectedWindow.Caption = null;
                        // store.selectedWindow.ID = '';
                        // store.assignedWindow='';
                        // this.assignedWindow='';
                        this.beBlue=false;
                        alert('window info saved' )
            }
              })
              .catch((error) =>{
                console.log("Error in saving queue info", error)
              });
          }
          else{
            if(store.assignedWinState==true){
                this.windowName='';
                store.assignedWinState=false;
                this.assigned=store.assignedWinState;
                // store.selectedWindow=this.window;
                // store.selectedWindow.Caption = null;
                // store.selectedWindow.ID = '';
                // store.assignedWindow='';
                // this.assignedWindow='';
                this.beBlue=false;
                // alert('window info AAAAAAAAAAA' )
            }

          }          
        
        //  }
        },
        saveCurrentQState(){
            if(store.selectedWindow.Caption!=this.window.Caption ){
            // if(store.assignedWinState!=true){
            //     store.selectedWindow.Caption=this.window.Caption
            // }
            firebase
              .firestore()
              .collection('WINDOWS')
              .doc(store.selectedWindow.Caption) //Otvara lokaciju u firestoreu gdje ce se odviti spremanje novih info za tu inst
              .set({
                  Current: store.Queue.BeingServed,
                  Next: store.Queue.NextInQ,
                  Total:store.Queue.PeopleInQ,
                  },{merge:true})
                  .then(() =>{
                      console.log('Queue info saved for window '+ store.selectedWindow.Caption);
                      if(store.assignedWinState==true){
                        this.windowName='';
                        store.assignedWinState=false;
                        this.assigned=store.assignedWinState;
                        // store.selectedWindow=this.window;
                        // store.selectedWindow.Caption = null;
                        // store.selectedWindow.ID = '';
                        // store.assignedWindow='';
                        // this.assignedWindow='';
                        this.beBlue=false;
                        // alert('window info saved' )
            }
              })
              .catch((error) =>{
                console.log("Error in saving queue info", error)
              });
            }
        }
    },
    mounted(){
        this.checkAssignedWindow();        
    }
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

.assignToMePassive{
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


.assignToMeActive{
    display: inline-block;
    font-size: 1rem;
    padding:5px;
    font-family: helvetica;
    color: white;
    width: 140px;
    background-color: #5396E9;
    border: 1px solid;
    border-radius: 50px;
    /* opacity:50% */

}

.assignToMePassive:hover {
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