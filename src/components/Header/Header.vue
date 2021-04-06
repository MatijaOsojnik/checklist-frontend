<template>
<div v-if="!$store.state.isUserLoggedIn">
  <v-app-bar
    app
    flat
    color="white"
    class=""
  >
  

    <v-toolbar-title class="my-2">
        <v-img max-width="150px" class="mt-2" src="../../assets/checky.svg"></v-img>
    </v-toolbar-title>
    <!-- <v-menu
      bottom
      transition="scale-transition"
      :close-on-content-click="false"
      v-if="$router.history.current['path'] === '/stories' || !$store.state.isUserLoggedIn"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          :outlined="$router.history.current['path'] === '/' ? true : false"
          :color="`${$router.history.current['path'] === '/' ? 'white' : '#ededed'}`"
          v-on="on"
          style="margin-left: 30px;"
        >
          Browse
          <v-icon small>mdi-menu-down</v-icon>
        </v-btn>
      </template>

      <v-card max-width="200px">
        <v-container fluid>
          <span class="subtitle ma-2 d-block font-weight-bold text-center">Featured</span>
          <div class="d-flex justify-center align-center flex-column ma-3">
            <v-btn depressed small text block :to="{name: `stories`}">All Stories</v-btn>
          </div>
          <v-divider />
          <span class="subtitle ma-2 d-block font-weight-bold text-center">Categories</span>
          <div
            class="d-flex justify-center align-center flex-column ma-1"
            v-for="category in categories"
            :key="category.id"
          >
            <v-btn
              depressed
              small
              text
              block
              :to="{path: `/stories/categories/${category.id}`}"
            >{{category.name}}</v-btn>
          </div>
        </v-container>
      </v-card>
    </v-menu> -->
    <v-spacer></v-spacer>

      <v-btn
        outlined
        :to="{name: 'login'}"
        v-if="!$store.state.isUserLoggedIn && $router.history.current['path'] !== '/login'"
      >Sign in</v-btn>
      <v-btn v-if="$store.state.isUserLoggedIn" @click="logout">
        Logout
      </v-btn>
    
  </v-app-bar>
</div>
</template>

<script>
export default {
  data: () => ({
    menu: false,
  }),
  mounted() {
   
  },
  methods: {
    async logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$router.push({
        name: "login",
      });
    },
    async toPath() {
      this.$router.push({
        path: `/`
      });
    }
  }
};
</script>

<style scoped>
.header-bar {
  position: absolute;
  z-index: 999;
}

.brand-black {
  font-family: "Julius Sans One", sans-serif;
  color: #1b262c !important;
  opacity: 0.9;
  font-weight: 400 !important;
  font-size: 33px !important;
}
.brand {
  font-family: "Julius Sans One", sans-serif;
  color: #1b262c !important;
  font-weight: 400 !important;
  font-size: 33px !important;
}
.cta-btn-active {
  background-color: #3f72af !important;
  color: white !important;
  transition: 0.2s;
}
.cta-btn-hover {
  background-color: white !important;
  color: black !important;
  transition: 0.2s;
}
</style>