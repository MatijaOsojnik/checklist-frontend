<template>
  <div v-if="$store.state.isUserLoggedIn">
    <v-app-bar
      flat
      color="white"
    >
          <!-- <v-toolbar-title v-if="$router.history.current['path'] === '/'">
      <router-link :to="{name: 'home'}" class="brand">Checklist</router-link>
    </v-toolbar-title> -->
    <v-toolbar-title>
      <router-link :to="{name: 'home'}" class="brand-black">
        <v-img max-width="150px" src="../../assets/checky-logo.svg"></v-img>
      </router-link>
    </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- <v-menu
        offset-y
        v-if="
          currentRouteName !== 'story-create' &&
          currentRouteName !== 'story-edit'"
        transition="scroll-y-transition"
        :close-on-content-click="false"
        v-model="showMenu"
      >
        <template v-slot:activator="{ attrs }">
          <v-text-field
            class="d-xl-flex d-lg-flex d-md-flex d-none"
            color="#8d93ab"
            hide-details
            outlined
            dense
            prepend-icon="mdi-magnify"
            style="max-width: 250px"
            single-line
            v-model="keyword"
            v-bind="attrs"
          ></v-text-field>
        </template>
        <v-card>
          <v-list>
            <div v-if="profiles.length > 0">
              <span class="subtitle d-block pa-4 font-weight-bold">PEOPLE</span>
              <v-divider />
              <v-list-item
                v-for="profile in profiles"
                :key="profile.id"
                :to="{
                  path: `/users/${profile.display_name
                    .toLowerCase()
                    .replace(/\s/g, '')}/${profile.id}/profile`,
                }"
              >
                <div class="d-flex justify-space-between align-center">
                  <div>
                    <v-avatar v-if="!profile.icon_url" size="40px">
                      <v-icon>mdi-account-circle-outline</v-icon>
                    </v-avatar>
                    <v-avatar v-else size="40px">
                      <v-img :src="profile.icon_url" />
                    </v-avatar>
                  </div>
                  <v-spacer></v-spacer>
                  <div>
                    <span class="d-block font-weight-bold align-center pa-4">{{
                      profile.display_name
                    }}</span>
                  </div>
                </div>
              </v-list-item>
            </div>
            <div v-if="stories.length > 0">
              <span class="subtitle d-block pa-4 font-weight-bold"
                >STORIES</span
              >
              <v-divider />
              <v-list-item
                v-for="story in stories"
                :key="story.id"
                :to="{ path: `/stories/${story.id}` }"
              >
                <div class="d-flex justify-space-between align-center">
                  <div>
                    <v-avatar v-if="!story.thumbnail_url" tile size="40px">
                      <v-icon>mdi-image</v-icon>
                    </v-avatar>
                    <v-avatar v-else tile size="40px">
                      <v-img :src="story.thumbnail_url" />
                    </v-avatar>
                  </div>
                  <v-spacer></v-spacer>
                  <div>
                    <span class="d-block font-weight-bold align-center pa-4">{{
                      story.title
                    }}</span>
                  </div>
                </div>
              </v-list-item>
            </div>
          </v-list>
        </v-card>
      </v-menu> -->

      <v-menu
        bottom
        offset-y
        transition="scroll-y-transition"
        :close-on-content-click="false"
        v-if="$store.state.isUserLoggedIn"
      >
        <template v-slot:activator="{ on }">
          <v-btn color="#1b262c" v-on="on" icon style="margin-right: 0.3em">
            <v-avatar size="40px">
              <!-- <v-img :src="$store.state.user.icon_url" /> -->
              <v-icon size="35px">mdi-account-circle-outline</v-icon>
            </v-avatar>
          </v-btn>
        </template>

        <v-card max-width="200px">
          <v-container fluid>
            <div class="d-flex justify-center align-center flex-column ma-3">
              <!-- <router-link
                :to="{
                  path: `/users/${$store.state.user.display_name
                    .toLowerCase()
                    .replace(/\s/g, '')}/${$store.state.user.id}/profile`,
                }"
              >
                <v-avatar v-if="!$store.state.user.icon_url">
                  <v-icon large>mdi-account-circle</v-icon>
                </v-avatar>
                <v-avatar v-else>
                  <v-img :src="$store.state.user.icon_url" />
                </v-avatar>
              </router-link>
              <router-link
                class="d-block ma-2 bold"
                style="font-size: 16px"
                :to="{
                  path: `/users/${$store.state.user.display_name
                    .toLowerCase()
                    .replace(/\s/g, '')}/${$store.state.user.id}/profile`,
                }"
              >
                <span>{{ $store.state.user.display_name }}</span>
              </router-link> -->

              <v-btn class="" depressed small text block @click="logout">
                Log out
              </v-btn>
            </div>
          </v-container>
        </v-card>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  components: {},
  data: () => ({
    isChecking: true,
    keyword: "",
    showMenu: false,
    x: 0,
    y: 0,
  }),
  methods: {
    // async contentSearch() {
    //   if (this.keyword !== "") {
    //     const response = await GeneralService.search(
    //       this.keyword.toLowerCase()
    //     );
    //     if (response.data.stories.length > 0) {
    //       this.stories = response.data.stories;
    //     }
    //     if (response.data.users.length > 0) {
    //       this.profiles = response.data.users;
    //     }
    //   }
    // },
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$router.push({
        name: "login",
      });
    },
  },
};
</script>

<style scoped>
.brand-black {
  font-family: "Julius Sans One", sans-serif;
  color: #1b262c !important;
  opacity: 0.9;
  font-weight: 400 !important;
  font-size: 33px !important;
}
.mobile-logo {
  font-family: "Julius Sans One", sans-serif;
  color: #1b262c !important;
  opacity: 0.9;
  font-weight: 400 !important;
  font-size: 33px !important;
  padding: 3px;
  border: 2px solid;
}
.brand {
  font-family: "Julius Sans One", sans-serif;
  color: white !important;
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