<template>
<div>
  <Header />

  <input class="search" type="text" placeholder="Pretraži ustanovu...">

  <div class="row ustanove">
    <InstitutionComp v-for="institution in INST" :key="institution._id" :institution="institution" />
    <InstitutionComp v-for="institution in tempInstList" :key="institution._id" :institution="institution" />
  </div>

<!-- 
    <div class="row ustanove">
    <InstitutionComp v-for="institution in INST" :key="institution._id" :institution="institution" />
  </div>
-->
</div>
</template>

<style scoped>
.centered {
  text-align: center;
  margin-top: 5%;
}

.search {
margin-top:0.5rem;
padding:0.2rem;
text-align: center;
width: 50%;
border-radius: 25px;
margin-left:25%;
border-color: #5396E9;
border-width: 2px;
margin-bottom:12%;
}

.prvi {
  margin-top: 100px;
}

.ustanove {
  margin-bottom: 100px;
  margin-top: 100px;
  text-align: center;
}

.button {
  background-color: #5396E9;
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

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import InstitutionComp from '@/components/Institutions.vue';
import store from '@/store';
import { Institutions } from '@/services';
import lodash from 'lodash';


export default {
  name: 'main-user',
  components: {
    HelloWorld,
    Header,
    Footer,
    InstitutionComp
  },
  data: function() {
      return {
            InstitutionComp,
            imageReference1: null,
            institution_name: '',
            branch_office_city: '',
            institution_adress: '',
            institution_wh: '',
            selectedInstitution: {
                'Caption': "",
                'Adress':"",
                'WorkingHours': "",
                'City': ""
            },
            INST:[],
            tempInstList:[],
            NumOfInst:'',
            store
            
      }
  },
  computed: {
    figureRows(){
      if(this.NumOfInst > 5){
        alert('Alo')
        //this.pushToNewRow()
      }
    }
  },
  mounted(){
    this.getInstitutions();
    this.getInstitutionsNumber();
    this.pushToNewRow()
  },
  methods:{
    async getInstitutions() { //sluzit ce za Listing Ustanova/Institucija
      Institutions.getAll()
                  .then((res) => {
                    this.INST = res.data
                  })
    },
    async getInstitutionsNumber(){
      Institutions.getAllNum()
                  .then((res)=>{
                    this.NumOfInst=res.data
                  })
    },
    pushToNewRow(){
      if(this.NumOfInst > 5){
        for(let i=5;i>this.NumOfInst;i++){
          this.tempInstList[i] = INST[i]
          alert('Alo')
        }
      }
    }
    //getInstLength(){
    //  alert(this.Institutions);
    //},
  }
}
</script>
