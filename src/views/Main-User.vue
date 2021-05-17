<template>
 <div><Header />
  <div class="jumbotron">
    <h1 class="display-4">Hello, User!</h1>
    <p class="lead">Ovdje ce biti izlistane sve ustanove.</p>
    <hr class="my-4">
    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
    <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
  </div>
  
    <div class="col-4 PrListing">
       <div class="centered scroll">
        <Institutions v-for="institution in INST" :key="institution.Caption" :institution="institution" @institution-selected="setSelectedInstitution" />
       </div>
     </div>
  
  <Footer />
 </div>
</template>

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
    Footer
  },
  data: function() {
      return {
            store,
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
            
      }
  },
  mounted(){
    this.getIntitutions();
  },
  methods:{
    getIntitutions() { //sluzit ce za Listing Ustanova/Institucija
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
                    console.log(data)
                });
            });
    },
    setSelectedInstitution(){
      store.selectedInstitution.Caption = this.selectedInstitution.Caption;
      store.selectedInstitution.Adress = this.selectedInstitution.Adress;
      store.selectedInstitution.WorkingHours = this.selectedInstitution.WorkingHours;
      store.selectedInstitution.City = this.selectedInstitution.City;
    }
  }
}
</script>
