<template>
  <div>
    <v-layout>
      <v-flex xs12 justify="center" align="center">
        <v-card class="mx-auto" v-if="project">
          <v-toolbar flat color="#617BE3" dark>
            <v-toolbar-title>{{ project.title }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="dark" :to="{ path: `/projects/${project._id}/stats` }"
              >Statistika</v-btn
            >
            <v-menu bottom offset-y transition="scroll-y-transition">
              <template v-slot:activator="{ on }">
                <v-btn color="black" v-on="on" icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-card max-width="200px">
                <v-container fluid>
                  <div
                    class="d-flex justify-center align-center flex-column ma-3"
                  >
                    <v-btn class="py-2" depressed text block> Uredi </v-btn>
                    <v-btn
                      depressed
                      text
                      block
                      @click="deleteProject(project._id)"
                      v-if="$store.state.user.id == project.owner"
                    >
                      Izbriši
                    </v-btn>
                    <v-dialog v-model="dialog" width="500">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          class="py-2"
                          depressed
                          text
                          block
                          v-bind="attrs"
                          v-on="on"
                        >
                          Povabi člana
                        </v-btn>
                      </template>

                      <v-card>
                        <v-card-title class="headline grey lighten-2">
                          Povabi člana
                        </v-card-title>

                        <v-card-text>
                          <v-alert type="error" v-if="error">
                            <span>{{ error }}</span>
                          </v-alert>
                          <v-alert type="message" v-if="message">
                            <span>{{ message }}</span>
                          </v-alert>
                          <v-combobox
                            label="E-pošta"
                            v-model="emailSelect"
                            prepend-inner-icon="mdi-email-outline"
                            hint="Povabilo lahko pošljete več ljudem naenkrat."
                            multiple
                            chips
                          >
                          </v-combobox>
                          <v-btn
                            block
                            color="primary"
                            @click="inviteMembers(project._id)"
                          >
                            Pošlji
                          </v-btn>
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="primary" text @click="dialog = false">
                            Zapri
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </div>
                </v-container>
              </v-card>
            </v-menu>
          </v-toolbar>

          <div>
            <v-checkbox
              v-model="inviteLink"
              class="mx-4"
              label="Povezava za povabilo"
            ></v-checkbox>
            <v-banner
              v-model="inviteLink"
              single-line
              transition="slide-y-transition"
            >
              <span class="font-weight-bold">
                https://checky-app.herokuapp.com/projects/invite/{{ inviteUrl }}
              </span>

              <template v-slot:actions="{ dismiss }">
                <v-btn text color="primary" @click="dismiss"> Skrij </v-btn>
              </template>
            </v-banner>
          </div>
          <!-- <v-row class="mx-2" v-if="lists">
            <v-col>
              <v-card class="mt-4 mx-auto py-2">
                <v-sheet
                  class="v-sheet--offset mx-auto my-2"
                  color="cyan"
                  elevation="12"
                  max-width="calc(100% - 32px)"
                >
                  <v-sparkline
                    :value="lists.length"
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

          <div class="list-container d-flex" v-if="lists">
            <div v-for="list in lists" :key="list._id">
              <ListCard :list="list" />
            </div>
            <v-card min-width="400px" height="100%" class="my-4 mx-5">
              <v-card-text>
                <v-btn block v-if="!newList" @click="newList = true"
                  ><v-icon>mdi-plus</v-icon>Ustvari seznam</v-btn
                >
                <div v-if="newList">
                  <v-form>
                    <v-text-field
                      class="mx-2"
                      placeholder="Vnesi ime novega seznama"
                      max="60"
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
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
//Components
import ListCard from "@/components/Projects/List-Card-Component";
//Services
import ProjectService from "@/services/ProjectService";
import ItemService from "@/services/ItemService";
//Libraries

export default {
  components: {
    ListCard,
  },
  data: () => ({
    project: null,
    error: null,
    message: null,
    menu: false,
    modal: false,
    newList: false,
    newElement: [],
    inviteLink: false,
    inviteUrl: null,
    lists: null,
    list_name: "",
    item_name: "",
    dialog: false,
    emailSelect: [],
  }),
  mounted() {
    this.loadProject();
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
    //     checkMove: function(evt){
    //       console.log(evt.draggedContect.element._id)
    //     return (evt.draggedContext.element.name!=='apple');

    // }
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
          const projectItems = response.data.item.children.map(list => {
            const allItems = {
              list: list,
              items: list.children
            }
            return allItems
          })
          this.lists = projectItems
          this.inviteUrl = response.data.inviteLink;
        }
      } catch (err) {
        setTimeout(() => (this.errors = []), 5000);
      }
    },
    async createList() {
      try {
        const id = this.$route.params.id;
        const response = await ItemService.postList(
          this.list_name,
          id,
          this.$store.state.token
        );
        if (response) {
          this.loadProject();
          this.list_name = "";
        }
      } catch (err) {
        console.log(err)
      }
    },
    async createItem(listId) {
      try {
        const id = listId;
        const response = await ItemService.postItem(
          this.item_name,
          id,
          this.$store.state.token
        );
        if (response) {
          this.lists = response.data.items;
          this.newElement = false;
          this.loadLists();
          this.item_name = "";
        }
      } catch (err) {
        setTimeout(() => (this.waitBeforeClick = false), 3000);
        setTimeout(() => (this.errors = []), 5000);
      }
    },
    async deleteList(listId) {
      try {
        const id = listId;
        const response = await ItemService.deleteList(
          id,
          this.$store.state.token
        );
        if (response) {
          this.loadLists();
        }
      } catch (err) {
        console.log(err);
      }
    },
    openNewElementField(listId) {
      this.newElement = [];
      this.newElement.push(listId);
    },
    async deleteProject(projectId) {
      try {
        const id = projectId;
        const response = await ProjectService.delete(
          id,
          this.$store.state.token
        );
        if (response) {
          this.$router.push({ name: "home" });
        }
      } catch (err) {
        console.log(err);
      }
    },
    async inviteMembers(projectId) {
      try {
        const id = projectId;
        const validEmails = [];
        if (this.emailSelect.length > 0) {
          this.emailSelect.forEach((email) => {
            if (this.validateEmail(email)) {
              validEmails.push(email);
            }
          });
          if (validEmails.length > 0) {
            const response = await ProjectService.multipleInvite(
              id,
              validEmails,
              this.$store.state.token
            );
            if (response) {
              this.message = "Povabilo je bilo uspešno poslano.";
            }
          } else {
            this.error = "Napaka. Podan e-poštni naslov je napačen";
          }
        } else {
          this.error = "Napaka. Povabiti moraš vsaj enega člana.";
        }
      } catch (error) {
        console.log(error.response.data);
      }
    },
    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+$/;
      return re.test(email);
    },
  },
};
</script>

<style>
.list-container {
  overflow-x: scroll;
  min-height: 1000px;
}
.kanban-column {
  min-height: 300px;
}
</style>