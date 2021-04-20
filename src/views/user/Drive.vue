<template>
  <div>
    <v-alert type="success" v-if="code">
      <span> Uspešno ste se povezali z vašim Google Drive računom. </span>
    </v-alert>
    <v-alert type="warning" v-else>
      <span> Pri povezavi je prišlo do napake. </span>
    </v-alert>
    <v-btn :to="{ name: 'login' }" color="success">Nadaljuj</v-btn>
  </div>
</template>

<script>
import SyncService from "@/services/SyncService";
export default {
  data: () => ({
    code: null,
  }),
  mounted() {
    this.sendCode();
  },
  methods: {
    async sendCode() {
      try {
        const code = this.$route.query.code;
        this.code = code;
        console.log(this.code);
        if (code) {
          const response = await SyncService.oauth2Code(
            this.$store.state.token,
            this.code
          );
          console.log(response);
        } else {
          console.log("This is great");
        }
      } catch (error) {
        console.log(error.response);
      }
    },
  },
};
</script>

<style>
</style>