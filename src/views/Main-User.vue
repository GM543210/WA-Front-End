<template>
<div>
  <Header />

  <input class="search" type="text" placeholder="Pretraži ustanovu...">

  <div class="row ustanove" v-if="NumOfInst>0">
    <InstitutionComp v-for="institution in INST" :key="institution._id" :institution="institution" />
    <!-- <br v-if="tempInstList.index % 5 === 0"> -->
  </div>
  <!-- <div class="row ustanove" v-if="NumOfInst>5">
    <InstitutionComp v-for="institution in tempInstList2" :key="institution._id" :institution="institution" />
  </div> -->
</div>
</template>

<style scoped>
.centered {
  text-align: center;
  margin-top: 5%;
}

.search {
margin-top:1rem;
padding:0.5rem;
text-align: center;
width: 50%;
border-radius: 25px;
margin-left:25%;
border-color: #5396E9;
border-width: 6px;
border-style:solid;
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
            NumOfInst:'',
            store
            
      }
  },
  mounted(){
    this.getInstitutions();
    this.getInstitutionsNumber();
    //this.pushToNewRow();
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
      
    }
    //getInstLength(){
    //  alert(this.Institutions);
    //},
  }
}
</script>
