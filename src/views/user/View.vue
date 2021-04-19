<template>
  <div>
    <v-layout>
      <v-flex xs12 justify="center" align="center">
        <v-toolbar flat color="#617BE3" dark>
          <v-toolbar-title>Moji projekti</v-toolbar-title>
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
                  <line-chart-component v-if="loaded" :chartData="chartData" />
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
                  class="caption grey--text font-weight-light"
                  v-if="lastMyProjectCreated"
                  >Zadnji ustvarjen
                  <timeago
                    :datetime="lastMyProjectCreated"
                    :auto-update="60"
                  ></timeago>
                </span>
                <span v-else>
                  Niste še ustvarili projekta
                </span>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col class="col-xl-6 col-lg-6 col-12"> </v-col>
        </v-row>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import ProjectService from "@/services/ProjectService";
import LineChartComponent from "@/components/Charts/Line-Chart-Component.vue";
export default {
  components: {
    LineChartComponent,
  },
  data: () => ({
    loaded: false,
    chartData: {
      type: "line",
      data: {
        labels: [
          "Januar",
          "Februar",
          "Marec",
          "April",
          "Maj",
          "Junij",
          "Julij",
          "Avgust",
          "September",
          "Oktober",
          "November",
          "December",
        ],
        datasets: [
          {
            label: "Novi projekti",
            backgroundColor: "#f87979",
            data: [11, 12, 0],
          },
        ],
      },

      options: {
        responsive: true,
        lineTension: 0,
        borderWidth: 4,
        borderCapStyle: "round",
        borderJoinStyle: "bevel",
        spanGaps: true,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                padding: 25,
              },
            },
          ],
        },
      },
    },
    myProjects: null,
    invitedProjects: null,
    value: [423, 446, 675, 510, 590, 610, 760],
  }),
  mounted() {
    this.loadProjects();
  },
  computed: {
    lastMyProjectCreated() {
      if (this.myProjects) {
        const length = this.myProjects.length;
        const last = this.myProjects[length - 1].dateAdd;
        return last;
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
    // async loadLists() {
    //   try {
    //     const id = this.$route.params.id;
    //     const response = await ItemService.allLists(
    //       id,
    //       this.$store.state.token
    //     );
    //     if (response) {
    //       this.lists = response.data.items;
    //     }
    //   } catch (err) {
    //     setTimeout(() => (this.errors = []), 5000);
    //   }
    // },
  },
};
</script>

<style>
</style>