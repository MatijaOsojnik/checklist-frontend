<template>
  <div>
    <v-layout>
      <v-flex xs12 justify="center" align="center">
        <v-card class="mx-auto" v-if="project">
          <v-toolbar flat color="#617BE3" dark>
            <v-toolbar-title>{{ project.title }}</v-toolbar-title>
            <span class="d-block title mx-2" style="font-size: 20px;">|</span>

            <div v-for="user in users" :key="user._id">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-avatar size="32" class="mr-2" v-bind="attrs" v-on="on">
                    <!-- <v-icon> mdi-account-circle-outline </v-icon> -->
                    <v-img src="../../assets/eberhard-grossgasteiger-xC7Ho08RYF4-unsplash.jpg"></v-img>
                  </v-avatar>
                </template>
    
                    {{user.name}} {{user.surname}}
                    <span class="d-block heading">
                      {{ user.email }}
                    </span>

              </v-tooltip>
              <!-- <span class="d-block mx-2">{{user.name}} {{user.surname}}</span> -->
            </div>

            <v-spacer></v-spacer>
            <v-btn
              color="dark"
              class="mx-2"
              :to="{ path: `/projects/${project._id}/stats` }"
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

          <!-- <div>
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
          </div> -->

          <div class="list-container d-flex" v-if="lists">
            <v-card
              min-width="400px"
              class="my-4 mx-5"
              v-for="list in lists"
              :key="list._id"
            >
              <v-card-title>
                {{ list.title }}
                <!-- {{ list._id }} -->
                <v-spacer></v-spacer>

                <v-menu
                  bottom
                  offset-y
                  transition="scroll-y-transition"
                  :close-on-content-click="false"
                >
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
                        <v-dialog v-model="dialogUpdate" max-width="600px">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              class="py-2"
                              depressed
                              text
                              block
                              v-on="on"
                              v-bind="attrs"
                            >
                              Uredi
                            </v-btn>
                          </template>
                          <v-card>
                            <v-card-title>
                              {{ list.title }}
                            </v-card-title>
                          </v-card>
                        </v-dialog>

                        <v-btn
                          depressed
                          text
                          block
                          @click="deleteList(list._id)"
                        >
                          Izbriši
                        </v-btn>
                      </div>
                    </v-container>
                  </v-card>
                </v-menu>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-list flat>
                  <v-list-item v-if="list.children.length > 0">
                    <v-progress-linear :value="0" color="success" height="25">
                      <template v-slot:default="{ value }">
                        <strong>{{ Math.round(value) }}%</strong>
                      </template></v-progress-linear
                    >
                  </v-list-item>

                  <!-- ITEM CARD -->
                  <draggable
                    :list="list.children"
                    group="tasks"
                    :move="(evt) => onMove(evt, list)"
                    @change="end($event, list)"
                    :animation="200"
                  >
                    <v-list-item v-for="item in list.children" :key="item._id">
                      <v-checkbox
                        color="success"
                        :label="item.title"
                        :value="item._id"
                      ></v-checkbox>
                    </v-list-item>
                  </draggable>
                  <v-list-item>
                    <v-btn
                      block
                      color="primary"
                      v-if="newElement[0] != list._id"
                      @click="openNewElementField(list._id)"
                    >
                      <v-icon>mdi-plus</v-icon> Ustvari element
                    </v-btn>
                    <div style="width: 100%" v-if="newElement[0] == list._id">
                      <v-textarea
                        solo
                        rows="1"
                        auto-grow
                        placeholder="Vnesi ime novega elementa"
                        v-model="item_name"
                      >
                      </v-textarea>

                      <v-btn
                        class="mr-2"
                        color="success"
                        @click="createItem(list._id)"
                      >
                        Ustvari
                      </v-btn>
                      <v-btn icon color="danger" @click="newElement = false">
                        <v-icon>mdi-close-circle</v-icon>
                      </v-btn>
                    </div>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>

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
// import ListCard from "@/components/Projects/List-Card-Component";
//Services
import ProjectService from "@/services/ProjectService";
import ItemService from "@/services/ItemService";
import draggable from "vuedraggable";
//Libraries

export default {
  components: {
    // ListCard,
    draggable,
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
    users: [],
    list_name: "",
    item_name: "",
    oldListId: "",
    dialog: false,
    dialogUpdate: false,
    updateListDialog: false,
    drag: false,
    emailSelect: [],
    currentList: null,
  }),
  mounted() {
    this.loadProject();
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "tasks",
        disabled: false,
        ghostClass: "ghost",
      };
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
          this.lists = response.data.item.children;
          if(!this.users.length) {
            this.users.push(response.data.item.owner);
            response.data.item.users.forEach((user) => {
              this.users.push(user);
            });
          }
          this.inviteUrl = response.data.inviteLink;
        }
      } catch (err) {
        this.$router.push({ name: "projects" });
        setTimeout(() => (this.errors = []), 5000);
      }
    },
    async updateList() {
      this.updateListDialog = true;
      const response = await ItemService.put(
        this.currentList,
        this.$store.state.token
      );
      if (response) {
        console.log(response.data);
      }
    },
    updateListDialogMethod(list) {
      this.updateListDialog = true;
      this.currentList = list;
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
          this.newList = false;
        }
      } catch (err) {
        console.log(err);
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
          this.loadProject();
          this.newElement = false;
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
          this.loadProject();
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
          this.$router.push({ name: "projects" });
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
    async moveItems(list, itemId) {
      const newList = list;

      if (newList._id !== this.oldListId) {
        const list = newList;
        const item = itemId;
        // const listId = evt.draggedContext.element.parentItem
        try {
          const response = await ItemService.updateListItems(
            item,
            list,
            this.$store.state.token
          );
          if (response) {
            this.loadProject();
          }
        } catch (error) {
          console.log(error.response);
        }
      }
    },
    onMove(evt, list) {
      this.oldListId = list._id;
    },
    end(evt, list) {
      //  console.log(itemId)
      //  console.log("ListId: " + listId);
      if (evt.added) {
        this.moveItems(list, evt.added.element._id);
      }
    },
    onAdd(e) {
      e.item.classList.add("display-none");
    },
    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+$/;
      return re.test(email);
    },
  },
};
</script>

<style lang="scss" scoped>
.list-container {
  overflow-x: scroll;
  min-height: 1000px;
}
</style>>

