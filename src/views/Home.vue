<template>
  <div class="home">
    <p>
      HI {{user}}!
    </p>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {},
  data: () => ({
    user: 'HEY',
  }),

}
</script>
