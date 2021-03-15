<template>
  <div>
    <v-layout>
      <v-flex xs12 justify="center" align="center">
        <v-card class="mx-auto" v-if="project">
          <v-toolbar flat color="#617BE3" dark>
            <v-toolbar-title>{{ project.title }}</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            {{ project.description }}
          </v-card-text>
          <!-- <v-row class="mx-2">
            <v-col>
              <v-card class="mt-4 mx-auto py-2">
                <v-sheet
                  class="v-sheet--offset mx-auto my-2"
                  color="cyan"
                  elevation="12"
                  max-width="calc(100% - 32px)"
                >
                  <v-sparkline
                    :value="value"
                    :labels="labels"
                    color="rgba(255, 255, 255, .7)"
                    height="100"
                    padding="24"
                    stroke-linecap="round"
                    smooth
                    auto-draw
                  ></v-sparkline>
                </v-sheet>

                <v-card-text class="pt-0">
                  <div class="title font-weight-light mb-2">
                    User Registrations
                  </div>
                  <div class="subheading font-weight-light grey--text">
                    Last Campaign Performance
                  </div>
                  <v-divider class="my-2"></v-divider>
                  <v-icon class="mr-2" small> mdi-clock </v-icon>
                  <span class="caption grey--text font-weight-light"
                    >last registration 26 minutes ago</span
                  >
                </v-card-text>
              </v-card>
            </v-col>
            <v-col>
              <v-card class="mt-4 mx-auto py-2">
                <v-sheet
                  class="v-sheet--offset mx-auto my-2"
                  color="cyan"
                  elevation="12"
                  max-width="calc(100% - 32px)"
                >
                  <v-sparkline
                    :value="value"
                    :labels="labels"
                    color="rgba(255, 255, 255, .7)"
                    height="100"
                    padding="24"
                    stroke-linecap="round"
                    smooth
                    auto-draw
                  ></v-sparkline>
                </v-sheet>

                <v-card-text class="pt-0">
                  <div class="title font-weight-light mb-2">
                    User Registrations
                  </div>
                  <div class="subheading font-weight-light grey--text">
                    Last Campaign Performance
                  </div>
                  <v-divider class="my-2"></v-divider>
                  <v-icon class="mr-2" small> mdi-clock </v-icon>
                  <span class="caption grey--text font-weight-light"
                    >last registration 26 minutes ago</span
                  >
                </v-card-text>
              </v-card>
            </v-col>
          </v-row> --> 
          <v-row v-if="lists">
            <v-col
              class="col-3 my-4 mx-4"
              v-for="list in lists"
              :key="list._id"
            >
              <v-card>
                <v-card-title>
                  {{ list.title }}
                </v-card-title>
              </v-card>
            </v-col>
            <v-col class="col-3 my-4 mx-4">
              <v-card>
                <v-card-text>
                  <v-btn block v-if="!newList" @click="newList = true"
                    ><v-icon>mdi-plus</v-icon>Ustvari stolpec</v-btn
                  >

                  <div v-if="newList">
                    <v-form>
                      <v-text-field
                        class="mx-2"
                        dense
                        solo
                        name="list_name"
                        v-model="list_name"
                      >
                      </v-text-field>
                    </v-form>

                    <v-btn class="mx-2" color="success" @click="createList()">
                      Ustvari
                    </v-btn>
                    <v-btn icon color="danger" @click="newList = false">
                      <v-icon>mdi-close-circle</v-icon>
                    </v-btn>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col class="col-3 my-4 mx-4">
              <v-card>
                <v-card-text>
                  <v-btn block v-if="!newList" @click="newList = true"
                    ><v-icon>mdi-plus</v-icon>Ustvari stolpec</v-btn
                  >

                  <div v-if="newList">
                    <v-form>
                      <v-text-field
                        class="mx-2"
                        dense
                        solo
                        name="list_name"
                        v-model="list_name"
                      >
                      </v-text-field>
                    </v-form>

                    <v-btn class="mx-2" color="success" @click="createList()">
                      Ustvari
                    </v-btn>
                    <v-btn icon color="danger" @click="newList = false">
                      <v-icon>mdi-close-circle</v-icon>
                    </v-btn>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import ProjectService from "@/services/ProjectService";
import ItemService from "@/services/ItemService";

export default {
  data: () => ({
    project: null,
    errors: [],
    menu: false,
    modal: false,
    newList: false,
    lists: null,
    list_name: "",
    type: "trend",
    value: [200, 675, 410, 390, 310, 460, 250, 240],
    labels: [
      "24:00",
      "3:00",
      "06:00",
      "09:00",
      "12:00",
      "15:00",
      "18:00",
      "21:00",
    ],
  }),
  mounted() {
    this.loadProject();
    this.loadLists();
  },
  // computed() {
  //   this.loadLists();
  // },
  methods: {
    async loadProject() {
      try {
        const id = this.$route.params.id;
        const response = await ProjectService.single(
          id,
          this.$store.state.token
        );
        if (response) {
          this.project = response.data.item;
        }
      } catch (err) {
        setTimeout(() => (this.errors = []), 5000);
      }
    },
    async loadLists() {
      try {
        const id = this.$route.params.id;
        const response = await ItemService.allLists(
          id,  
          this.$store.state.token
        );
        
        if (response) {
          this.lists = response.data.items;
        }
      } catch (err) {
        setTimeout(() => (this.errors = []), 5000);
      }
    },
    async createList() {
      try {
        const id = this.$route.params.id;
        console.log(this.list_name);
        const response = await ItemService.postList(
          this.list_name,
          id,
          this.$store.state.token
        );
        if (response) {
          this.lists = response.data.items;
          this.loadLists();
          this.list_name = "";
          console.log(response.data);
        }
      } catch (err) {
        setTimeout(() => (this.waitBeforeClick = false), 3000);
        setTimeout(() => (this.errors = []), 5000);
      }
    },
  },
};
</script>

<style>
</style>