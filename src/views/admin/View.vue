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
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Išči"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-data-table
                :loading="loading"
                :headers="headers"
                :items="users"
                :search="search"
              >
                <template v-slot:top>
                  <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                      <v-card-title class="headline"
                        >Res želiš izbrisati tega uporabnika?</v-card-title
                      >
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="dialogDelete = false"
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
          <!-- <v-col>
              <v-card class="mt-4 mx-auto py-2">
                <v-card-text>
                  <v-sheet color="rgba(0, 0, 0, .12)">
                    <v-sparkline
                      :value="value"
                      color="rgba(255, 255, 255, .7)"
                      height="100"
                      padding="24"
                      stroke-linecap="round"
                      smooth
                    >
                      <template v-slot:label="item">
                        ${{ item.value }}
                      </template>
                    </v-sparkline>
                  </v-sheet>
                </v-card-text>
                <v-card-text class="pt-0">
                  <div class="title font-weight-light mb-2">
                    Novi uporabniki
                  </div>
                  <div class="subheading font-weight-light grey--text">
                    Današnji dan
                  </div>
                  <v-divider class="my-2"></v-divider>
                  <v-icon class="mr-2" small> mdi-clock </v-icon>
                  <span class="caption grey--text font-weight-light"
                    >Zadnji registriran
                    <timeago
                      :datetime="lastRegistered"
                      :auto-update="60"
                    ></timeago>
                  </span>
                </v-card-text>
              </v-card>
            </v-col> -->
        </v-row>
      </v-flex></v-layout
    >
  </div>
</template>

<script>
import UserService from "@/services/UserService";
import ProjectService from "@/services/ProjectService";
import ItemService from "@/services/ItemService";
export default {
  data: () => ({
    loading: true,
    search: "",
    headers: [
      {
        text: "ID",
        value: "_id",
      },
      { text: "Uporabniško ime", value: "username" },
      { text: "E-pošta", value: "email" },
      { text: "Potrjen račun", value: "active" },
      { text: "Dejanja", value: "actions", sortable: false },
    ],
    users: null,
    selectedUser: null,
    project: null,
    lists: null,
    dialog: false,
    dialogDelete: false,
    value: [423, 446, 675, 510, 590, 610, 760],
  }),

  mounted() {
    this.loadProject();
    this.loadLists();
    this.loadUsers();
  },
  computed: {
    lastRegistered() {
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
          this.dialogDelete = false;
        }
      } catch (error) {
        console.log(error);
        setTimeout(() => (this.errors = []), 5000);
      }
    },
    deleteUser(user) {
      this.user = user;
      this.dialogDelete = true;
    },
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

<style scoped>
</style>