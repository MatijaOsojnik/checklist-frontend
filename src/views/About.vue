<template>
  <div class="about">
    <h1>{{user}}</h1>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'About',
  components: {},
  data: () => ({
    user: 'HEY',
  }),
    mounted() {
    // this.user = this.$store.state.user
    console.log(this.$store.state.user)
  }
}
</script>
