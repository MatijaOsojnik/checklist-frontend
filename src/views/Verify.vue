<template>
  <div>
    <v-alert type="danger" v-if="errors">
      <p>
        Napaka pri potrjevanju računa. Poskusite ponovno kasneje.
      </p>
    </v-alert>
    <v-alert type="success" v-else>
      <p>
        {{ message }}
      </p>
    </v-alert>
    <v-btn :to="{ name: 'login' }" color="success">Prijava</v-btn>
  </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
export default {
  components: {},
  data: () => ({
    message: '',
    errors: null,
  }),
  mounted() {
    this.verify();
  },
  methods: {
    async verify() {
      try {
        const code = this.$route.params.verificationCode;
        const response = await AuthenticationService.verify(code);
        if (response) {
          this.message =
            "Uspešno ste potrdili vaš račun. Lahko se prijavite v aplikacijo.";
        }
      } catch (error) {
        console.log(error);
        this.errors = error.response.data.errors;
        setTimeout(() => (this.errors = null), 10000);
      }
    },
  },
};
</script>

<style scoped>
</style>