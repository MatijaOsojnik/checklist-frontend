
<template>
  <div>
    <v-card class="mt-4 mx-auto py-2" >
      <canvas :id="chartId" height="200"></canvas>
    </v-card>
  </div>
</template>

<script>
// MonthlyIncome.js
import chart from "chart.js/dist/chart";

export default {
  props: {
    chartData: Object,
    chartId: String
  },
  mounted() {
    const ctx = document.getElementById(this.chartId);
    new chart(ctx, this.chartData);
  },
};
</script>

<style>
</style>