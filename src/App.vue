<template>
  <v-app>
    <v-navigation-drawer
      permanent
      expand-on-hover
      app
      :mini-variant.sync="mini"
    >
      <div>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img
              src="https://randomuser.me/api/portraits/women/85.jpg"
            ></v-img>
          </v-list-item-avatar>
          <v-list-item-title
            >{{ user.name }} {{ user.surname }}</v-list-item-title
          >
        </v-list-item>

        <!-- <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="title">
                {{user.name}} {{user.surname}}
              </v-list-item-title>
              <v-list-item-subtitle>{{user.email}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item> -->
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
      this.user = this.$store.state.user;
  },
};
</script>

<style>
</style>
