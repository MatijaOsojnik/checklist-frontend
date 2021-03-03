<template>
  <div>
    <v-layout>
      <v-flex xs12 justify="center" align="center">
        <v-card class="mx-auto">
          <v-toolbar flat color="#617BE3" dark>
            <v-toolbar-title>Ustvari projekt</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form lazy-validation>
              <label for="title">Ime projekta</label>
              <v-text-field
                id="title"
                label="Izberite ime projekta"
                maxlength="30"
                counter
                solo
                aria-autocomplete="false"
                v-model="project.title"
              />

              <label for="shortDescription">Kratek opis</label>
              <v-text-field
                id="shortDescription"
                :rules="[rules.short_description]"
                label="Kratek opis projekta"
                solo
                clearable
                counter
                maxlength="100"
                aria-autocomplete="false"
                v-model="project.description"
              />
              <label for="deadline">Zaključni rok (Opcijsko)</label>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="project.deadlineDate"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="project.deadlineDate"
                    prepend-icon="mdi-calendar"
                    readonly
                    label="Izberi datum"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="project.deadlineDate"
                  no-title
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">
                    Prekini
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(project.deadlineDate)">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-form>
            <v-scroll-x-transition>
              <v-alert
                type="success"
                mode="out-in"
                v-if="successfulProjectPost"
              >
                <span>Uspešno ste ustvarili nov projekt</span>
              </v-alert>
            </v-scroll-x-transition>
            <v-scroll-x-transition>
              <v-alert elevation="2" type="warning" v-if="errors.length">
                <ul>
                  <li v-for="error in errors" :key="error">
                    {{ error }}
                  </li>
                </ul>
              </v-alert>
            </v-scroll-x-transition>
          </v-card-text>
          <v-card-actions class="pa-4">
            <v-btn
              color="#f4f6ff"
              :disabled="waitBeforeClick"
              large
              @click="createProject"
              >Nadaljuj</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import ProjectService from "@/services/ProjectService";
export default {
  data: () => ({
    project: {
      title: ``,
      description: ``,
      deadlineDate: new Date().toISOString().substr(0, 10),
    },
    rules: {
      short_description: (text) => text.length <= 60 || "Max 60 characters",
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
    },
    waitBeforeClick: false,
    successfulProjectPost: false,
    errors: [],
    menu: false,
    modal: false,
  }),
  methods: {
    async createProject() {
      this.waitBeforeClick = true;
      try {
        const response = await ProjectService.post(this.project);

        if (response) {
          this.successfulStoryPost = true;
          setTimeout(() => {
            this.successfulStoryPost = false;
            this.waitBeforeClick = false;
            this.$router.push({
              path: "/",
            });
          }, 3000);
        }
      } catch (err) {
        console.log(err);
        setTimeout(() => (this.waitBeforeClick = false), 3000);
        setTimeout(() => (this.errors = []), 5000);
      }
    },
  },
};
</script>

<style>
</style>