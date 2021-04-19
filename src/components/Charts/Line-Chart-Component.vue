
<template>
  <div>
    <v-card class="mt-4 mx-auto py-2" >
      <canvas id="line-chart" height="200"></canvas>
    </v-card>
  </div>
</template>

<script>
// MonthlyIncome.js
import chart from "chart.js/dist/chart";

export default {
  props: {
    chartData: Object,
  },
  mounted() {
    const ctx = document.getElementById("line-chart");
    new chart(ctx, this.chartData);
  },
};
</script>

<style>
</style>