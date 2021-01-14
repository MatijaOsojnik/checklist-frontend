<template>
<div id="app">
  <v-app>
    <main>
      <router-view />
      <Footer />
    </main>
  </v-app>
</div>
</template>

<script>
import Footer from '@/components/Footer'
export default {
  name: "App",

  components: {
    Footer
  },

  data: () => ({
    //
  }),
};
</script>
