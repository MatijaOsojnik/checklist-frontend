<template>
  <div>
    <v-layout>
      <v-flex xs12 justify="center" align="center">
        <v-toolbar flat color="#617BE3" dark>
          <v-toolbar-title>Statistika</v-toolbar-title>
        </v-toolbar>
        <v-row class="mx-2">
          <v-col class="col-xl-6 col-lg-6 col-12">
            <v-card class="mt-4 mx-auto py-2">
              <v-card-text>
                <v-sheet
                  class="v-sheet--offset mx-auto"
                  color="cyan"
                  elevation="12"
                  rounded
                >
                  <line-chart-component
                    :chartData="projectsData"
                    chartId="projects"
                    v-if="projectsData"
                  />
                </v-sheet>
              </v-card-text>
              <v-card-text class="pt-0">
                <div class="title font-weight-light mb-2">
                  Število projektov
                </div>
                <!-- <div class="subheading font-weight-light grey--text">
                  Današnji dan
                </div> -->
                <v-divider class="my-2"></v-divider>
                <v-icon class="mr-2" small> mdi-clock </v-icon>
                <span
                  class="caption "
                  v-if="lastMyProjectCreated"
                  >Zadnji ustvarjen
                  <timeago
                    :datetime="lastMyProjectCreated"
                    :auto-update="60"
                  ></timeago>
                </span>
                <span v-else> Niste še ustvarili projekta </span>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col class="col-xl-6 col-lg-6 col-12">
            <v-card class="mt-4 mx-auto py-2">
              <v-card-text>
                <v-sheet
                  class="v-sheet--offset mx-auto"
                  color="cyan"
                  elevation="12"
                  rounded
                >
                  <line-chart-component
                    :chartData="projectsInvitedData"
                    chartId="projectsInvited"
                    v-if="projectsInvitedData"
                  />
                </v-sheet>
              </v-card-text>
              <v-card-text class="pt-0">
                <div class="title font-weight-light mb-2">
                  Število pridruženih projektov
                </div>
                <!-- <div class="subheading font-weight-light grey--text">
                  Današnji dan
                </div> -->
                <v-divider class="my-2"></v-divider>
                <v-icon class="mr-2" small> mdi-account-plus </v-icon>
                <span
                  class="caption"
                  v-if="lastJoinedProject"
                  >Zadnji pridružen projekt:
                  {{lastJoinedProject.title}}
                </span>
                <span v-else> Niste se še pridružili nobenemu projektu </span>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import ProjectService from "@/services/ProjectService";
import StatsService from "@/services/StatsService";
import LineChartComponent from "@/components/Charts/Line-Chart-Component.vue";
export default {
  components: {
    LineChartComponent,
  },
  data: () => ({
    loaded: false,
    projectsData: null,
    projectsInvitedData: null,
    lastJoinedProject: null,
    myProjects: null,
  }),
  mounted() {
    this.projectStats();
    this.invitedProjectStats();
    this.loadProjects();
  },
  computed: {
    lastMyProjectCreated() {
      if (this.myProjects) {
        if (this.myProjects.length) {
          const length = this.myProjects.length;
          const last = this.myProjects[length - 1].dateAdd;
          return last;
        } else {
          return null;
        }
      } else {
        return null;
      }
    },
    lastInvitedProjectListCreated() {
      if (this.lists.length) {
        const length = this.lists.length;
        const last = this.lists[length - 1].list.dateAdd;
        return last;
      } else {
        return null;
      }
    },
  },
  methods: {
    async loadProjects() {
      try {
        const response = await ProjectService.index(this.$store.state.token);
        console.log(response.data);
        if (response.data.items) {
          this.myProjects = response.data.items;
          this.loaded = true;
        } else {
          this.myProjects = [];
        }
        if (response.data.invited) {
          this.invitedProjects = response.data.invited;
          this.loaded = true;
        } else {
          this.invitedProjects = [];
        }
      } catch (err) {
        console.log(err);
        setTimeout(() => (this.errors = []), 5000);
      }
    },
    async projectStats() {
      try {
        const response = await StatsService.projects(this.$store.state.token);
        if (response.data) {
          this.projectsData = response.data.chartData;
          this.loaded = true;
        } else {
          console.log("Napaka.");
        }
      } catch (err) {
        console.log(err);
        setTimeout(() => (this.errors = []), 5000);
      }
    },
    async invitedProjectStats() {
      try {
        const response = await StatsService.projectsInvited(
          this.$store.state.token
        );
        if (response.data) {
          this.projectsInvitedData = response.data.chartData;
          this.lastJoinedProject = response.data.lastProject;
          this.loaded = true;
        } else {
          console.log("Napaka.");
        }
      } catch (err) {
        console.log(err);
        setTimeout(() => (this.errors = []), 5000);
      }
    },
  },
};
</script>

<style>
</style>