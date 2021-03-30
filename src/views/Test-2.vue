<template>
  <!-- Pogled -->
  <div>{{ stetje }}</div>
</template>

<script>

export default {
  //Stanje
  data: () => ({
    stetje: 0,
  }),
  //Dejanja oz. akcije
  methods: {
    pristej() {
      this.stetje++;
    },
  },
};
</script>



