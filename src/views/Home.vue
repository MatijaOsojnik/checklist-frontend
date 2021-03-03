<template>
  <v-container fluid class="home">
    <v-card elevation="2">
      <v-card-title>
        <p v-if="user">HI {{ user.name }} {{ user.surname }}!</p>
        <p v-else>You should first log in!</p>
      </v-card-title>
    </v-card>
    <div>
      <!-- <div v-if="projects" class="my-2">
        <v-title>Vsi projekti</v-title>
      </div> -->
      <div class="my-2">
        <p class="title">Vsi projekti</p>
        <v-row>
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
          <div v-if="projects">
            <v-col
              v-for="project in projects"
              :key="project"
              class="col-12 col-xl-4 col-lg-4 col-md-4"
            >
              <v-card>
                <v-img
                  src="@/assets/eberhard-grossgasteiger-xC7Ho08RYF4-unsplash.jpg"
                  class="white--text align-center"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="200px"
                >
                  <span class="text-center"
                    >Nov Projekt
                    <v-icon color="white" class="px-2">mdi-plus-circle</v-icon>
                  </span>
                </v-img>
              </v-card>
            </v-col>
          </div>
        </v-row>
      </div>
    </div>
  </v-container>
</template>

<script>
// @ is an alias to /src
import jwtDecode from "jwt-decode";
import ProjectService from "@/services/ProjectService";

export default {
  name: "Home",
  components: {},
  data: () => ({
    user: null,
    projects: null,
  }),
  mounted() {
    this.loadUser();
  },
  methods: {
    loadUser() {
      if (this.$store.state.token) {
        const token = this.$store.state.token;
        this.user = jwtDecode(token);
        this.$store.dispatch("setUser", this.user);
      }
    },
    async loadProjects() {
      try {
        const response = await ProjectService.index();
        if (response) {
          this.projects = response.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.home {
  height: 50vh;
}
.card-title {
  font-size: 23px;
  font-weight: 600;
}
</style>
