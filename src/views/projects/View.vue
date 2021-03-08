<template>
  <div>
    <v-layout>
      <v-flex xs12 justify="center" align="center">
        <v-card class="mx-auto" v-if="project">
          <v-toolbar flat color="#617BE3" dark>
            <v-toolbar-title>{{project.title}}</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
              {{project.description}}
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import ProjectService from "@/services/ProjectService";
export default {
  data: () => ({
    project: null,
    errors: [],
    menu: false,
    modal: false,
  }),
  mounted() {
      this.loadProject();
  },
  methods: {
    async loadProject() { 
      this.waitBeforeClick = true;
      try {
      const id = this.$route.params.id
      const response = await ProjectService.single(id, this.$store.state.token);
        if (response) {
            this.project = response.data.item
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