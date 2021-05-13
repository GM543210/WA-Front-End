<template>
 <div><Header />
  <div class="jumbotron">
    <h1 class="display-4">Hello, User!</h1>
    <p class="lead">Ovdje ce biti prikazan red i poziv na izlazak.</p>
    <hr class="my-4">
    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
    <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
  </div>
  <Footer />
 </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'queued',
  components: {
    HelloWorld,
    Header,
    Footer
  }
}
</script>
