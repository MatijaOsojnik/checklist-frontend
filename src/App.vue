<template>
  <v-app>
    <main>
      <router-view />
      <Footer />
    </main>
  </v-app>
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
