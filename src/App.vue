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
        <v-list-item class="px-2" v-if="$store.state.user">
          <v-list-item-avatar>
            <v-img src="./assets/luke-chesser-pJadQetzTkI-unsplash.jpg"></v-img>
          </v-list-item-avatar>
          <v-list-item-title
            >{{ $store.state.user.name }} {{ $store.state.user.surname }}</v-list-item-title
          >
        </v-list-item>
        <v-divider />

        <v-list expand nav>
          <v-list-item :to="{ name: items[0].link }">
            <v-list-item-icon>
              <v-icon>{{ items[0].icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ items[0].title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{ name: items[1].link }">
            <v-list-item-icon>
              <v-icon>{{ items[1].icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ items[1].title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="admin" :to="{ name: items[2].link }">
            <v-list-item-icon>
              <v-icon>{{ items[2].icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ items[2].title }}</v-list-item-title>
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
    admin: false,
    drawer: true,
    items: [
      { title: "Projekti", icon: "mdi-folder-multiple", link: "projects" },
      { title: "Statistika", icon: "mdi-chart-line", link: "user-view" },
      { title: "Nadzorna plošča", icon: "mdi-account", link: "admin-view" },
    ],
    mini: true,
  }),
  mounted() {
    this.loadUser();
  },
  methods: {
    async loadUser() {
        const isAdmin = this.$store.state.user.roles.filter(role => role.name === 'admin' ? true : null)
        if(isAdmin.length) {
          this.admin = true
        }
      }
  },
};
</script>

<style>
</style>
