<template>
  <div>
    <!-- <v-overlay v-if="showPanel" absolute z-index="999" :opacity="0.1">
      <v-progress-circular
        indeterminate
        color="green"
        :size="50"
        :width="5"
        v-if="!registerSuccess"
      />
      <v-scroll-x-transition>
        <v-alert type="success" v-if="registerSuccess"
          >Registration successful!</v-alert
        >
      </v-scroll-x-transition>
    </v-overlay> -->
    <v-row justify="center" align-content="center" style="height: 80vh">
      <v-col cols="8">
        <AuthenticationPanel
          authenticationTypeText="Sign up"
          route-name="login"
          link-name="Sign in"
        >
          <v-scroll-x-transition>
            <v-alert elevation="2" type="warning" v-if="errors">
              <ul>
                <li v-for="error in errors" :key="error">{{ error.msg }}</li>
              </ul>
            </v-alert>
            <v-alert elevation="2" type="warning" v-if="registerSuccess">
              <p>Na vaš e-poštni naslov ste prejeli potrdilno povezavo. Za dostop do aplikacije kliknite na povezavo.</p>
            </v-alert>
          </v-scroll-x-transition>
          <form @submit.prevent="handleSubmit" autocomplete="off">
            <div>
              <v-text-field
                label="Name"
                v-model="name"
                prepend-inner-icon="mdi-account-outline"
              />
            </div>
            <div>
              <v-text-field
                label="Surname"
                v-model="surname"
                prepend-inner-icon="mdi-account-outline"
              />
            </div>
            <div>
              <v-text-field
                label="E-mail"
                v-model="email"
                prepend-inner-icon="mdi-email-outline"
              />
            </div>
            <div>
              <v-text-field
                type="password"
                autocomplete="new-password"
                label="Password"
                v-model="password"
                prepend-inner-icon="mdi-lock-outline"
              />
            </div>
          </form>
          <v-btn
            color="primary"
            class="submit-btn"
            max-width="60%"
            @click="register"
            >Register</v-btn
          >
        </AuthenticationPanel>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AuthenticationPanel from "@/components/Authentication-Panel/Authentication-Panel";
import AuthenticationService from "@/services/AuthenticationService";
export default {
  components: {
    AuthenticationPanel,
  },
  data: () => ({
    name: "",
    surname: "",
    email: "",
    password: "",
    registerSuccess: false,
    showPanel: false,
    // showPassword: false,
    // showRepeatPassword: false,
    errors: null,
  }),
  methods: {
    async register() {
      try {
        const response = await AuthenticationService.register({
          name: this.name,
          surname: this.surname,
          username: (this.name + this.surname).toLowerCase(),
          // company_id: parseInt(this.company_id),
          // user_role_id: parseInt(this.user_role_id),
          email: this.email,
          password: this.password,
        });
        if (response.data.token) {
          this.showPanel = true;

          // setTimeout(() => {
          //   this.registerSuccess = true;
          // }, 1500);

          // setTimeout(() => {
          //   // this.$store.dispatch("setToken", response.data.token);
          //   // this.$store.dispatch("setUser", response.data.user);
          //   // this.$store.dispatch("setAuthorities", response.data.authorities);
             this.registerSuccess = true;
          //   this.showPanel = false;
          //   this.$router.push({ name: "login"});
          // }, 2500);
        }
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
div {
  font-family: "Roboto";
}
ul,
li {
  text-align: left;
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
  background-color: #f9f9f9;
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
</style>