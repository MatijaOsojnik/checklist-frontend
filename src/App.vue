<template>
<div id="app">
  <v-app>
    <main>
      <UserHeader />
      <router-view />
      <Footer />
    </main>
  </v-app>
</div>
</template>

<script>
import Footer from '@/components/Footer'
import UserHeader from '@/components/Header/User-Header'
export default {
  name: "App",

  components: {
    Footer,
    UserHeader
  },

  data: () => ({
    //
  }),
};
</script>
