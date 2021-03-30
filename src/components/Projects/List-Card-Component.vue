<template>
  <v-card min-width="400px" height="auto" class="my-4 mx-5" :key="list._id">
    <v-card-title>
      {{ list.list.title }}
      <v-spacer></v-spacer>

      <v-menu
        bottom
        offset-y
        transition="scroll-y-transition"
        :close-on-content-click="false"
        open-on-hover
      >
        <template v-slot:activator="{ on }">
          <v-btn color="black" v-on="on" icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-card max-width="200px">
          <v-container fluid>
            <div class="d-flex justify-center align-center flex-column ma-3">
              <v-btn class="py-2" depressed text block> Uredi </v-btn>
              <v-btn depressed text block @click="deleteList(list.list._id)">
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
        <v-list-item v-if="list.items.length > 0">
          <v-progress-linear
            :value="0"
            color="success"
            height="25"
          >
            <template v-slot:default="{ value }">
              <strong>{{ Math.round(value) }}%</strong>
            </template></v-progress-linear
          >
        </v-list-item>

        <!-- ITEM CARD -->

        <draggable
          :list="list.items"
          group="tasks"
          @change="end($event, list.list)"
        >
          <v-list-item v-for="item in list.items" :key="item._id">
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
            v-if="newElement[0] != list.list._id"
            @click="openNewElementField(list.list._id)"
          >
            <v-icon>mdi-plus</v-icon> Ustvari element
          </v-btn>
          <div style="width: 100%" v-if="newElement[0] == list.list._id">
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
              @click="createItem(list.list._id)"
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
</template>

<script>
import ItemService from "@/services/ItemService";
import draggable from "vuedraggable";
export default {
  components: {
    draggable,
  },
  data: () => ({
    newElement: [],
    item_name: "",
  }),
  props: {
    list: Object,
  },
  methods: {
    async createItem(listId) {
      try {
        const id = listId;
        const response = await ItemService.postItem(
          this.item_name,
          id,
          this.$store.state.token
        );
        console.log(response)
        if (response) {
          this.list.items.push({
              title: this.item_name
              })
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
          this.loadLists();
        }
      } catch (err) {
        console.log(err);
      }
    },
    // async checkItem() {
    //   id = this.list.list._id
    //   const response = await ItemService.checkItem(
    //     id,
    //     this.$store.state.token
    //   );
 
    // },
    openNewElementField(listId) {
      this.newElement = [];
      this.newElement.push(listId);
    },
  },
};
</script>