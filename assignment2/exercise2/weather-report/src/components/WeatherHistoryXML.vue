<template>
  <v-container>
    <h2>WeatherHistoryXML</h2>
    <v-btn v-on:click="filterData('temperature')" elevation="2"
      >Temperature</v-btn
    >
    <v-btn v-on:click="filterData('precipitation')" elevation="2"
      >Precipitation</v-btn
    >
    <v-btn v-on:click="filterData('wind speed')" elevation="2">Wind</v-btn>
    <v-btn v-on:click="filterData('cloud coverage')" elevation="2"
      >Cloud Coverage</v-btn
    >
    <v-data-table
      :headers="headers"
      :items="info"
      :items-per-page="10"
      class="elevation-1"
    ></v-data-table>
    <p>Minimum temperature for last 5 days: {{ minTemperature() }} C</p>
    <p>Maximum temperature for last 5 days: {{ maxTemperature() }} C</p>
    <p>Total precipitation for last 5 days: {{ totalPrecipitation() }} mm</p>
    <p>Average wind speed for last 5 days: {{ averageWindSpeed() }} %</p>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "Type",
          align: "start",
          sortable: false,
          value: "type",
        },
        { text: "Value", value: "value" },
        { text: "Unit", value: "unit" },
        { text: "Time", value: "time" },
        { text: "Place", value: "place" },
      ],
      info: [],
      reads: [],
    };
  },
  mounted() {
    const request = new XMLHttpRequest();
    request.open("GET", "http://localhost:8080/data");
    request.send();
    request.onload = () => {
      const report = JSON.parse(request.responseText);
      this.reads = report;
      this.info = report.filter((data) => data.type === "temperature");
    };
  },
  methods: {
    filterData(type) {
      this.info = this.reads.filter((data) => data.type == type);
    },
    minTemperature() {
      return this.reads
        .filter((data) => data.type == "temperature")
        .map((data) => {
          return { date: new Date(data.time), value: data.value };
        })
        .filter((data) => data.date > this.calculatePast5DaysDate())
        .reduce((pv, cv) => (pv.value > cv.value ? cv : pv)).value;
    },
    maxTemperature() {
      return this.reads
        .filter((data) => data.type == "temperature")
        .map((data) => {
          return { date: new Date(data.time), value: data.value };
        })
        .filter((data) => data.date > this.calculatePast5DaysDate())
        .reduce((pv, cv) => (pv.value < cv.value ? cv : pv)).value;
    },
    totalPrecipitation() {
      return this.reads
        .filter((data) => data.type == "precipitation")
        .map((data) => {
          return { date: new Date(data.time), value: data.value };
        })
        .filter((data) => data.date > this.calculatePast5DaysDate())
        .reduce(
          (acc, cv) => {
            acc.sum += cv.value;
            return acc;
          },
          { sum: 0 }
        ).sum;
    },
    averageWindSpeed() {
      return this.reads
        .filter((data) => data.type == "wind speed")
        .map((data) => {
          return { date: new Date(data.time), value: data.value };
        })
        .filter((data) => data.date > this.calculatePast5DaysDate())
        .reduce(
          (acc, cv) => {
            acc.accumulatedValue += cv.value;
            acc.count += 1;
            acc.avg = acc.accumulatedValue / acc.count;
            return acc;
          },
          { accumulatedValue: 0, count: 0, avg: 0 }
        ).avg;
    },
    calculatePast5DaysDate() {
      var today = new Date();
      var pastDate = new Date();
      return pastDate.setDate(today.getDate() - 5);
    },
  },
};
</script>