<template>
  <div>
    <v-layout>
      <v-flex xs12 justify="center" align="center">
        <v-card class="mx-auto" v-if="project">
          <v-toolbar flat color="#617BE3" dark>
            <v-btn @click="$router.go(-1)" icon><v-icon>mdi-arrow-left</v-icon></v-btn> 
            <v-toolbar-title> {{ project.title }}</v-toolbar-title>
          </v-toolbar>
          <v-row class="mx-2" v-if="lists">
            <v-col>
              <v-card class="mt-4 mx-auto py-2">
                <v-card-text class="pt-0">
                  <div class="title font-weight-light mb-2">
                    Število stolpcev
                  </div>
                  <div class="subheading font-weight-light grey--text">
                    Današnji dan
                  </div>
                  <v-divider class="my-2"></v-divider>
                  <v-icon class="mr-2" small> mdi-clock </v-icon>
                  <span class="caption grey--text font-weight-light"
                    >Zadnji ustvarjen
                    <timeago
                      :datetime="lastListCreated"
                      :auto-update="60"
                    ></timeago>
                  </span>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card></v-flex></v-layout></div>
</template>

<script>
import ProjectService from "@/services/ProjectService";
import ItemService from "@/services/ItemService";
export default {
  data: () => ({
    project: null,
    lists: null,
  }),
  mounted() {
    this.loadProject();
    this.loadLists();
  },
  computed: {
    lastListCreated() {
      if (this.lists) {
        const length = this.lists.length;
        const last = this.lists[length - 1].list.dateAdd;
        return last;
      } else {
        return null;
      }
    },
  },
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
  },
};
</script>

<style>
</style>