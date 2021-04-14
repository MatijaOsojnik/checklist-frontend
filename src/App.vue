<template>
  <v-app>
    <v-navigation-drawer
      permanent
      expand-on-hover
      app
      :mini-variant.sync="mini"
      v-if="$store.state.token"
    >
      <div>
        <v-list-item class="px-2" v-if="user">
          <v-list-item-avatar>
            <v-img
              src="./assets/luke-chesser-pJadQetzTkI-unsplash.jpg"
            ></v-img>
          </v-list-item-avatar>
          <v-list-item-title
            >{{ user.name }} {{ user.surname }}</v-list-item-title
          >
        </v-list-item>
        <v-divider />

        <v-list expand nav>
          <v-list-item v-for="item in items" :key="item.title" link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </v-navigation-drawer>

    <Header />
    <UserHeader />
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
import Footer from "@/components/Footer";
import UserHeader from "@/components/Header/User-Header";
import Header from "@/components/Header/Header";
import jwtDecode from "jwt-decode";
export default {
  name: "App",

  components: {
    Footer,
    Header,
    UserHeader,
  },

  data: () => ({
    user: null,
    drawer: true,
    items: [
      { title: "Home", icon: "mdi-home-city" },
      { title: "My Account", icon: "mdi-account" },
      { title: "Users", icon: "mdi-account-group-outline" },
    ],
    mini: true,
  }),
  created() {
    this.loadUser()
  },
  methods: {
      async loadUser() {
      if (this.$store.state.token) {
        const token = this.$store.state.token;
        this.user = jwtDecode(token);
        this.$store.dispatch("setUser", this.user);
      }
    },
  }
};
</script>

<style>
</style>
