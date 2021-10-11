````<template>
  <v-container>
    <h2>WeatherForecastXML</h2>
    <v-row>
      <v-timeline>
        <h1>Copenhagen</h1>
        <div v-for="(prediction, index) in copenhagenInfo" :key="`time-${index}`">
          <v-timeline-item>
            <b>At time {{ new Date(index).getHours() }}:00</b>
            <br />
            Temperature will go from: {{ prediction[0].from }} {{prediction[0].unit}} to
            {{ prediction[0].to }} {{prediction[0].unit}}
            <br />
            Precipitation will go from: {{ prediction[1].from }} {{prediction[1].unit}} to
            {{ prediction[1].to  }} {{prediction[1].unit}}
            <br />
            Wind will go from: {{ prediction[2].from }} {{prediction[2].unit}} to
            {{ prediction[2].to }} {{prediction[2].unit}}
            <br />
            Cloud coverage will go from: {{ prediction[3].from }} {{prediction[3].unit}} to
            {{ prediction[3].to }} {{prediction[3].unit}}
          </v-timeline-item>
        </div>
      </v-timeline>
      <v-timeline>
        <h1>Aarhus</h1>
        <div v-for="(prediction, index) in aarhusInfo" :key="`time-${index}`">
          <v-timeline-item>
            <b>At time {{ new Date(index).getHours() }}:00</b>
            <br />
            Temperature will go from: {{ prediction[0].from }} {{prediction[0].unit}} to
            {{ prediction[0].to }} {{prediction[0].unit}}
            <br />
            Precipitation will go from: {{ prediction[1].from }} {{prediction[1].unit}} to
            {{ prediction[1].to  }} {{prediction[1].unit}}
            <br />
            Wind will go from: {{ prediction[2].from }} {{prediction[2].unit}} to
            {{ prediction[2].to }} {{prediction[2].unit}}
            <br />
            Cloud coverage will go from: {{ prediction[3].from }} {{prediction[3].unit}} to
            {{ prediction[3].to }} {{prediction[3].unit}}
          </v-timeline-item>
        </div>
      </v-timeline>
      <v-timeline>
        <h1>Horsens</h1>
        <div v-for="(prediction, index) in horsensInfo" :key="`time-${index}`">
          <v-timeline-item>
            <b>At time {{ new Date(index).getHours() }}:00</b>
            <br />
            Temperature will go from: {{ prediction[0].from }} {{prediction[0].unit}} to
            {{ prediction[0].to }} {{prediction[0].unit}}
            <br />
            Precipitation will go from: {{ prediction[1].from }} {{prediction[1].unit}} to
            {{ prediction[1].to  }} {{prediction[1].unit}}
            <br />
            Wind will go from: {{ prediction[2].from }} {{prediction[2].unit}} to
            {{ prediction[2].to }} {{prediction[2].unit}}
            <br />
            Cloud coverage will go from: {{ prediction[3].from }} {{prediction[3].unit}} to
            {{ prediction[3].to }} {{prediction[3].unit}}
          </v-timeline-item>
        </div>
      </v-timeline>
    </v-row>
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
        { text: "From", value: "from" },
        { text: "To", value: "to" },
      ],
      copenhagenInfo: [],
      horsensInfo: [],
      aarhusInfo: [],
    };
  },
  mounted() {
    const request = new XMLHttpRequest();
    request.open("GET", "http://localhost:8080/forecast");
    request.send();
    request.onload = () => {
      const report = JSON.parse(request.responseText);
      this.copenhagenInfo = this.groupByTime(report.filter((data) => data.place === "Copenhagen"));
      this.horsensInfo = this.groupByTime(report.filter((data) => data.place === "Horsens"));
      this.aarhusInfo = this.groupByTime(report.filter((data) => data.place === "Aarhus"));
      
    };
  },
  methods: {
    groupByTime(data) {
      return data.reduce((acc, cv) => {
        if (acc[cv.time]) {
          acc[cv.time].push(cv);
        } else {
          acc[cv.time] = [];
          acc[cv.time].push(cv);
        }
        return acc;
      }, {});
    },
  },
};
</script>