<template>
 <div><Header />

<H1 class="main-header">YOU HAVE CLOSED THE QUEUEING WINDOW!</H1>

  <!-- <Footer /> -->
 </div>
</template>

<style scoped>

.main-header {
  color:#5396E9;
  font-size: 5vw;
  text-align: center;
  margin-top: 20%;
}

</style>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'window-closed',
  components: {
    HelloWorld,
    Header,
    Footer
  },
  mounted(){
        // const self = this;
        setTimeout( () => this.$router.push({name: 'main-admin'}), 2000);
    }
}
</script>
