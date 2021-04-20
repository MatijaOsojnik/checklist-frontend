<template>
  <div>
    <v-layout>
      <v-flex xs12 justify="center" align="center">
        <v-row class="mx-2">
          <v-col v-if="users">
            <v-card class="pa-2">
              <span class="pa-4 d-block title">
                <v-icon large> mdi-account-circle </v-icon>
                Uporabniki
              </span>
              <v-card-title>
                <v-text-field
                  v-model="searchUsers"
                  append-icon="mdi-magnify"
                  label="Išči"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-data-table
                :loading="loading"
                :headers="headers[0]"
                :items="users"
                :search="searchUsers"
              >
                <template v-slot:top>
                  <v-dialog v-model="dialogUser" max-width="500px">
                    <v-card>
                      <v-card-title class="headline"
                        >Res želiš izbrisati tega uporabnika?</v-card-title
                      >
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="dialogUser = false"
                          >Zapri</v-btn
                        >
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="deleteUserConfirm"
                          >OK</v-btn
                        >
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </template>
                <template v-slot:item.active="{ item }">
                  <v-simple-checkbox
                    v-model="item.active"
                    disabled
                  ></v-simple-checkbox>
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-icon small @click="deleteUser(item)"> mdi-delete </v-icon>
                </template>
              </v-data-table>
            </v-card>
          </v-col>

          <v-col v-if="projects">
            <v-card class="pa-2">
              <span class="pa-4 d-block title">
                <v-icon large> mdi-folder-multiple </v-icon>
                Projekti
              </span>
              <v-card-title>
                <v-text-field
                  v-model="searchProjects"
                  append-icon="mdi-magnify"
                  label="Išči"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-data-table
                :loading="loading"
                :headers="headers[1]"
                :items="projects"
                :search="searchProjects"
              >
                <template v-slot:top>
                  <v-dialog v-model="dialogProject" max-width="500px">
                    <v-card>
                      <v-card-title class="headline"
                        >Res želiš izbrisati ta projekt?</v-card-title
                      >
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="dialogProject = false"
                          >Zapri</v-btn
                        >
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="deleteProjectConfirm"
                          >OK</v-btn
                        >
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </template>
                <template v-slot:item.active="{ item }">
                  <v-simple-checkbox
                    v-model="item.active"
                    disabled
                  ></v-simple-checkbox>
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-icon small @click="deleteProject(item)"> mdi-delete </v-icon>
                </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </v-flex></v-layout
    >
  </div>
</template>

<script>
import UserService from "@/services/UserService";
import ProjectService from "@/services/ProjectService";
export default {
  data: () => ({
    loading: true,
    searchUsers: "",
    searchProjects: "",
    headers: [
      [
        {
          text: "ID",
          value: "_id",
        },
        { text: "Uporabniško ime", value: "username" },
        { text: "E-pošta", value: "email" },
        { text: "Potrjen račun", value: "active" },
        { text: "Dejanja", value: "actions", sortable: false },
      ],
      [
        {
          text: "ID",
          value: "_id",
        },
        { text: "Ime projekta", value: "title" },
        { text: "Lastnik projekta", value: "owner.email" },
        { text: "Dejanja", value: "actions", sortable: false },
      ],
    ],
    projects: null,
    selectedProject: null,
    dialogProject: false,
    users: null,
    selectedUser: null,
    dialogUser: false,

  }),

  mounted() {
    this.loadUsers();
    this.loadProjects();
  },
  methods: {
    async loadUsers() {
      try {
        const response = await UserService.allUserInfo(this.$store.state.token);
        if (response) {
          this.loading = false;
          this.users = response.data.users;
        }
      } catch (err) {
        console.log(err);
        setTimeout(() => (this.errors = []), 5000);
      }
    },
    async deleteUserConfirm() {
      try {
        const response = await UserService.delete(
          this.user._id,
          this.$store.state.token
        );
        if (response) {
          this.loadUsers();
          this.dialogUser = false;
        }
      } catch (error) {
        console.log(error);
        setTimeout(() => (this.errors = []), 5000);
      }
    },
    deleteUser(user) {
      this.user = user;
      this.dialogUser = true;
    },
    async loadProjects() {
      try {
        const response = await ProjectService.allProjectInfo(
          this.$store.state.token
        );
        if (response) {
          this.projects = response.data.projects;
        }
      } catch (err) {
        setTimeout(() => (this.errors = []), 5000);
      }
    },
    async deleteProjectConfirm() {
      try {
        const response = await ProjectService.delete(
          this.project._id,
          this.$store.state.token
        );
        if (response) {
          this.loadProjects();
          this.dialogProject = false;
        }
      } catch (error) {
        console.log(error);
        setTimeout(() => (this.errors = []), 5000);
      }
    },
    deleteProject(project) {
      this.project = project;
      this.dialogProject = true;
    },
  },
};
</script>

<style scoped>
</style>