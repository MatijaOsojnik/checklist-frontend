  
<template>

  <v-footer app dark padless color="white">
    <v-card flat tile width="100%" class="lighten-1 text-center" color="white">
      <v-card-text class="py-2">
        <v-btn
          v-for="(icon, index) in icons"
          :key="index"
          class="mx-4"
          icon
          color="black"
          :href="icon.link"
          target="_blank"
        >
          <v-icon size="24px">{{ icon.name }}</v-icon>
        </v-btn>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="py-2 black--text">
        {{ new Date().getFullYear() }} —
        <strong>Checky</strong>
      </v-card-text>
    </v-card>
  </v-footer>

</template>

<script>
export default {
  data: () => ({
    icons: [
      // { name: "mdi-github", link: "https://github.com/SnorkiV3" },
      // {
      //   name: "mdi-linkedin",
      //   link: "https://www.linkedin.com/in/matija-osojnik-6b0900193/"
      // },
      { name: "mdi-facebook", link: "https://www.facebook.com/checkyslovenija" }
    ]
  })
};
</script>