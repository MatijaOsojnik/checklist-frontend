<template>
  <div>
    <v-alert type="success">
      <p>
        Uspešno ste potrdili vaš račun. Lahko se prijavite v aplikacijo.
      </p>
    </v-alert>
    <v-btn :to="{name: 'login'}" color="success">Prijava</v-btn>
  </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
export default {
  components: {
  },
  data: () => ({
    errors: null,
  }),
  mounted() {
      this.verify()
  },
  methods: {
    async verify() {
      try {
          console.log("HEY")
        const code = this.$route.params.verificationCode
        const response = await AuthenticationService.verify(code);
        console.log(response)
      } catch (error) {
        console.log(error.response.data.errors);
        this.errors = error.response.data.errors;
        setTimeout(() => (this.errors = null), 10000);
      }
    },
  },
};
</script>

<style scoped>
</style>