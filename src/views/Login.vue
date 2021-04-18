<template>
  <div>
    <!-- <v-overlay v-if="showPanel" absolute z-index="999" :opacity="0.1">
      <v-progress-circular
        indeterminate
        color="green"
        :size="50"
        :width="5"
        v-if="!loginSuccess"
      />
      <v-scroll-x-transition>
        <v-alert type="success" v-if="loginSuccess">Uspešna prijava!</v-alert>
      </v-scroll-x-transition>
    </v-overlay> -->
    <v-row justify="center" align-content="center" style="height: 80vh">
      <v-col class="col-8">
        <AuthenticationPanel
          authenticationTypeText="Prijava"
          route-name="register"
          link-name="Registracija"
        >
          <v-scroll-x-transition>
            <v-alert type="warning" elevation="2" v-if="error">
              <span>{{ error }}</span>
              <div v-if="error == 'Za prijavo v aplikacijo, vas prosimo, da potrdite svoj račun.'">
                <span >
                  Niste prejeli e-poštnega sporočila?
                </span>
                <v-btn color="primary" @click="sendVerification()">Pošlji ponovno</v-btn>
              </div>
            </v-alert>
          </v-scroll-x-transition>
          <form @submit.prevent="handleSubmit">
            <div>
              <v-text-field
                label="E-pošta"
                v-model="email"
                prepend-inner-icon="mdi-email-outline"
              />
            </div>
            <div>
              <v-text-field
                label="Geslo"
                v-model="password"
                prepend-inner-icon="mdi-lock-outline"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                :type="showPassword ? 'text' : 'password'"
              />
            </div>
          </form>
          <v-btn
            color="primary"
            class="submit-btn"
            max-width="60%"
            @click="login"
            >Prijavi se</v-btn
          >
        </AuthenticationPanel>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AuthenticationPanel from "@/components/Authentication-Panel/Authentication-Panel";
import AuthenticationService from "@/services/AuthenticationService";
import jwtDecode from "jwt-decode";

// import axios from "axios";
export default {
  components: {
    AuthenticationPanel,
  },
  data: () => ({
    email: "",
    password: "",
    verifyEmail: null,
    loginSuccess: false,
    showPanel: false,
    showPassword: false,
    error: null,
  }),
  mounted() {},
  methods: {
    async login() {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password,
        });

        this.verifyEmail = this.email

        if (response.data.token) {
          const decoded = jwtDecode(response.data.token);

          if (decoded != null && decoded != undefined) {
            if (decoded.active) {
              if (response.data.token) {
                this.$store.dispatch("setToken", response.data.token);
                this.$store.dispatch("setUser", decoded);
                this.$router.push({ name: "projects" });
              }
            } else {
              this.error =
                "Za prijavo v aplikacijo, vas prosimo, da potrdite svoj račun.";
            }
          }
        }
      } catch (error) {
        this.error = error.response.data.message
        setTimeout(() => (this.error = null), 5000);
      }
    },
    async sendVerification() {
      try {
        if(this.verifyEmail) {
          const response = await AuthenticationService.sendVerification(this.verifyEmail)
          if(response) {
            this.message = "Uspešno poslano novo sporočilo"
            this.error = null
          }
        }
      } catch (error) {
        this.error = "Napaka. Poskusite ponovno kasneje";
        setTimeout(() => (this.error = null), 5000);
      }
    }
  },
};
</script>

<style scoped>
div {
  font-family: "Roboto";
}
ul,
li {
  text-align: left;
}
.main {
  margin: 0;
  padding: 0;
}
/* .image-background {
  height: 100vh;
  background: url("../assets/social-ideas.svg");
  background-size: cover;
} */
.row-container {
  height: 100vh;
}
.background-image {
  max-width: 80%;
}
.image-container {
  background-color: #ededed;
}
.form-container {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}
.form-input-container {
  display: flex;
  justify-content: center;
  width: 60%;
}
.brand {
  color: black;
  font-weight: 900;
  font-size: 40px;
  font-family: "Patrick Hand SC", cursive;
}
.sign-in-brand {
  font-size: 23px;
  font-weight: 600;
  color: black;
}
.submit-btn {
  color: white;
  margin: 10px 0;
}
.sign-in-container {
  margin: 1.5rem 0;
}
.sign-in-text {
  display: inline-block;
}
.sign-in-link {
  display: inline-block;
  font-weight: bold;
  text-decoration: none;
}
.error {
  color: red;
}
</style>