<template>
  <div>
      <span v-if="code">WOOOOOOOOO!!!</span>
      <span v-else>MEH</span>
  </div>

</template>

<script>
import SyncService from "@/services/SyncService";
export default {
  data: () => ({
      code: null
  }),
  mounted() {
    this.sendCode();
  },
  methods: {
    async sendCode() {
      try {
        const code = this.$route.query.code;
        this.code = this.$route.query.code;
        const response = await SyncService.oauth2Code(this.$store.state.token, code);
        console.log(response);
      } catch (error) {
          console.log(error.response)
      }
    },
  },
};
</script>

<style>
</style>