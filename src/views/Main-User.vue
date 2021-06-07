<template>
<div>
  <Header />

<input class="search" type="text" placeholder="Pretraži ustanovu...">

<div class="row ustanove">
  <Institutions v-for="institution in INST" :key="institution.Caption" :institution="institution" @institution-selected="setSelectedInstitution" />
</div>

<Footer />
</div>
</template>

<style scoped>
.centered {
  text-align: center;
  margin-top: 5%;
}

.search {
text-align: center;
width: 100%;
border-radius: 25px;
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

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Institutions from '@/components/Institutions.vue';
import store from '@/store';
import { firebase } from '@/firebase';

export default {
  name: 'main-user',
  components: {
    HelloWorld,
    Header,
    Footer,
    Institutions
  },
  data: function() {
      return {
            Institutions,
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
            store
            
      }
  },
  mounted(){
    this.getInstitutions();
  },
  methods:{
    getInstitutions() { //sluzit ce za Listing Ustanova/Institucija
            firebase.firestore()
            .collection('INSTITUTIONS')
            .get()
            .then((query) => {
                query.forEach((doc) => {

                    const data = doc.data();
                        this.INST.push({
                            'Caption': data.Name,
                            'City': data.InstitutionBranchCity,
                            'Adress' : data.InstitutionAdress,
                            // 'Availabilitydate': data.Availabilitydate,
                            'WorkingHours': data.InstitutionWH,
                        })
                        // alert('Institution Loaded')
                    console.log(data)
                });
            });
    },
    setSelectedInstitution(){
      this.selectedInstitution = institution;
      alert( this.selectedInstitution.Caption)
      
      // store.selectedInstitution.Caption = this.selectedInstitution.Caption;
      // store.selectedInstitution.Adress = this.selectedInstitution.Adress;
      // store.selectedInstitution.WorkingHours = this.selectedInstitution.WorkingHours;
      // store.selectedInstitution.City = this.selectedInstitution.City;

      // alert(store.selectedInstitution.Caption)
    }
  }
}
</script>
