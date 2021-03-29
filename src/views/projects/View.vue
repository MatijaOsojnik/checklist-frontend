<template>
  <div>
    <v-layout>
      <v-flex xs12 justify="center" align="center">
        <v-card class="mx-auto" v-if="project">
          <v-toolbar flat color="#617BE3" dark>
            <v-toolbar-title>{{ project.title }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="dark" :to="{path: `/projects/${project._id}/stats`}">Statistika</v-btn>
          </v-toolbar>
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
                  ><v-icon>mdi-plus</v-icon>Ustvari stolpec</v-btn
                >
                <div v-if="newList">
                  <v-form>
                    <v-text-field
                      class="mx-2"
                      placeholder="Vnesi ime nove vrstice"
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
    errors: [],
    menu: false,
    modal: false,
    newList: false,
    newElement: [],

    lists: null,
    list_name: "",
    item_name: "",
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
        const response = await ItemService.postList(
          this.list_name,
          id,
          this.$store.state.token
        );
        if (response) {
          this.lists = response.data.items;
          this.loadLists();
          this.list_name = "";
        }
      } catch (err) {
        setTimeout(() => (this.waitBeforeClick = false), 3000);
        setTimeout(() => (this.errors = []), 5000);
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
    // async moveItems(listId, items) {
    //   console.log("New list id: " + listId);
    //   console.log("Updated list items: " + items);
    //   // const newListId = listId;
    //   // const itemId = evt.draggedContext.element._id;

    //   // // const listId = evt.draggedContext.element.parentItem
    //   // const response = await ItemService.updateListItems(
    //   //   itemId,
    //   //   newListId,
    //   //   this.$store.state.token
    //   // );
    //   // if (response) {
    //   //   this.loadLists();
    //   // }
    // },
    end(evt, list) {
      console.log(list);
      console.log(evt);

      //  console.log(itemId)
      //  console.log("ListId: " + listId);
      // this.moveItems(list.list._id);
    },
    log(evt) {
      console.log(evt);
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