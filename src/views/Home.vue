<template>
  <div class="home">
    <v-card elevation="2">
    <v-card-header>
    <p v-if="user">
      HI {{user.name}} {{user.surname}}!
    </p>
    <p v-else>
      You should first log in!
    </p>
    </v-card-header>
    </v-card>
  </div>
</template>

<script>
// @ is an alias to /src
import jwtDecode from 'jwt-decode'
export default {
  name: 'Home',
  components: {},
  data: () => ({
    user: null,
  }),
  mounted() {
    const token  = this.$store.state.token
    this.user = jwtDecode(token);
    console.log(this.user)
  }

}
</script>
