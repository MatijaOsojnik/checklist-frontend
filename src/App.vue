<template>
  <v-app>
    <v-navigation-drawer
      permanent
      v-model="drawer"
      app
      :mini-variant.sync="mini"
    >
      <div>
        <v-list-item>
          <v-list-item-avatar>
            <v-img v-if="!drawer" :src="require('@/assets/checky-logo-small.svg')" />
            <v-img v-if="drawer" :src="require('@/assets/checky-logo.svg')" />
          </v-list-item-avatar>


        </v-list-item>

        <v-divider class="mx-3 mb-2" />
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
    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>

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
    drawer: true,
    items: [
      { title: "Home", icon: "mdi-home-city" },
      { title: "My Account", icon: "mdi-account" },
      { title: "Users", icon: "mdi-account-group-outline" },
    ],
    mini: true,
  }),
};
</script>

<style>
</style>
