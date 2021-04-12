<template>
  <div>
    <v-alert type="error"  v-if="error">
      <span>{{error}}</span>
      <!-- <p>Napaka pri priduževanju skupini. Poskusite znova kasneje.</p> -->
    </v-alert>
    <v-alert type="success" v-else>
      <p>
        {{ message }}
      </p>
    </v-alert>
    <v-btn :to="{ name: 'home' }" color="success">Nadaljuj</v-btn>
  </div>
</template>

<script>
import ProjectService from "@/services/ProjectService";
export default {
  components: {},
  data: () => ({
    message: "",
    error: null,
  }),
  created() {
    this.invite();
  },
  methods: {
    async invite() {
      try {
        const code = this.$route.params.inviteCode;
        const response = await ProjectService.invite(
          code,
          this.$store.state.token
        );
        console.log(response.data);
        if (response.data) {
          this.message =
            "Uspešno ste se pridružili projektu. Do njega lahko sedaj dostopate iz glavne strani";
        }
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
  },
};
</script>

<style scoped>
</style>