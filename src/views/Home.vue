<template>
  <v-container fluid class="home">
    <v-card elevation="2">
      <v-card-title>
        <span class="card-title d-block">{{ moment().format("dddd") }}</span>
      </v-card-title>
      <v-card-text v-if="message || error || quote">
        <blockquote v-if="quote">{{quote.content}} - <span class="quote">{{quote.author}}</span></blockquote>
        <v-alert type="success" v-if="message">
          {{ message }}
        </v-alert>
        <v-alert type="warning" v-if="error">
          {{ error }}
        </v-alert>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" class="mx-2" v-if="!isConnected" @click="loginGoogleDrive">
          <v-icon>mdi-google</v-icon> Poveži Google Drive
        </v-btn>
        <div v-if="isConnected">
        <v-btn color="primary" class="mx-2"  @click="downloadGoogleDrive">
          <v-icon>mdi-progress-download</v-icon> Prenesi podatke
        </v-btn>
        <v-btn color="primary"  @click="uploadGoogleDrive">
          <v-icon>mdi-progress-upload</v-icon> Naloži podatke
        </v-btn>
        </div>
      </v-card-actions>
    </v-card>
    <div v-if="$store.state.isUserLoggedIn">
      <!-- <div v-if="projects" class="my-2">
        <v-title>Vsi projekti</v-title>
      </div> -->
      <div class="my-2">
        <p class="title">Vsi projekti</p>
        <v-row v-if="projects">
          <v-col
            v-for="project in projects"
            :key="project._id"
            class="col-12 col-xl-4 col-lg-4 col-md-4"
          >
            <v-hover v-slot:default="{ hover }">
              <v-card
                :to="{ path: `/projects/${project._id}` }"
                class="mx-auto"
                raised
                :elevation="hover ? 8 : 2"
              >
                <v-img
                  src="@/assets/joanna-kosinska-7ACuHoezUYk-unsplash (1).jpg"
                  class="white--text align-center"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="200px"
                >
                  <span class="text-center card-title d-block">
                    {{ project.title }}
                  </span>
                </v-img>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col class="col-12 col-xl-4 col-lg-4 col-md-4">
            <v-hover v-slot:default="{ hover }">
              <v-card
                :to="{ path: `/projects/create` }"
                class="mx-auto"
                raised
                :elevation="hover ? 8 : 2"
              >
                <v-img
                  src="@/assets/eberhard-grossgasteiger-xC7Ho08RYF4-unsplash.jpg"
                  class="white--text align-center"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="200px"
                >
                  <div class="flex justify-content-center">
                    <span class="text-center card-title d-block"
                      >Nov Projekt
                      <v-icon color="white" size="23px" class="px-1"
                        >mdi-plus-circle</v-icon
                      >
                    </span>
                  </div>
                </v-img>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </div>

      <div class="my-2">
        <p class="title">Pridruženi projekti</p>
        <v-row v-if="invited">
          <v-col
            v-for="project in invited"
            :key="project._id"
            class="col-12 col-xl-4 col-lg-4 col-md-4"
          >
            <v-hover v-slot:default="{ hover }">
              <v-card
                :to="{ path: `/projects/${project._id}` }"
                class="mx-auto"
                raised
                :elevation="hover ? 8 : 2"
              >
                <v-img
                  src="@/assets/luke-chesser-pJadQetzTkI-unsplash.jpg"
                  class="white--text align-center"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="200px"
                >
                  <span class="text-center card-title d-block">
                    {{ project.title }}
                  </span>
                </v-img>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </div>
    </div>
  </v-container>
</template>

<script>
// @ is an alias to /src
import jwtDecode from "jwt-decode";
import ProjectService from "@/services/ProjectService";
import SyncService from "@/services/SyncService";
import axios from "axios"

export default {
  name: "Home",
  components: {},
  data: () => ({
    user: null,
    projects: null,
    invited: null,
    quote: null,
    isConnected: false,
    message: null,
    error: null,
  }),
  mounted() {
    this.loadUser();
    this.loadProjects();
    this.isConnectedToGoogleDrive();
    this.getRandomQuote()
  },
  methods: {
    async loadProjects() {
      try {
        const response = await ProjectService.index(this.$store.state.token);
        if (response.data.items.length) {
          this.projects = response.data.items;
        }
        if (response.data.invited.length) {
          this.invited = response.data.invited;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async loadUser() {
      if (this.$store.state.token) {
        const token = this.$store.state.token;
        this.user = jwtDecode(token);
        this.$store.dispatch("setUser", this.user);
      }
    },
    async loginGoogleDrive() {
      try {
        const response = await SyncService.oauth2(this.$store.state.token);
        if (response.data.url) {
          window.location.href = response.data.url;
        } else {
          this.message = response.data.message;
          setTimeout(() => {
            this.message = null;
          }, 6000);
        }
      } catch (error) {
        console.log(error.response);
      }
    },
    async uploadGoogleDrive() {
      const response = await SyncService.syncWithDrive(this.$store.state.token);
      if (response) {
        this.message = response.data.message;
        setTimeout(() => {
          this.message = null;
        }, 6000);
        this.loadProjects();
      }
    },
    async downloadGoogleDrive() {
      const response = await SyncService.syncWithApp(this.$store.state.token);
      if (response) {
        this.message = response.data.message;
        setTimeout(() => {
          this.message = null;
        }, 6000);
        this.loadProjects();
      }
    },
    async isConnectedToGoogleDrive() {
      const response = await SyncService.isConnected(this.$store.state.token);
      if (response.data) {
        this.$store.dispatch("setGoogleDrive", response.data.connected);
        this.isConnected = response.data.connected
      }
    },
    async getRandomQuote() {
      const response = await axios
      .get('https://api.quotable.io/random')
      this.quote = response.data
    }
  },
};
</script>

<style scoped>
.card-title {
  font-size: 23px;
  font-weight: 600;
  text-transform: capitalize;
}
</style>
