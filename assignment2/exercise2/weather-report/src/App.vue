<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
    <h1>Weather Report</h1>
    </v-app-bar>

    <v-main>
      <WeatherHistoryFetch/>
      <WeatherForecastXML/>
    </v-main>
  </v-app>
</template>

<script>
//import WeatherHistoryXML from './components/WeatherHistoryXML.vue'
import WeatherForecastXML from './components/WeatherForecastXML.vue'
import WeatherHistoryFetch from './components/WeatherHistoryFetch.vue'
//import WeatherForecastFetch from './components/WeatherForecastFetch.vue'

export default {
  name: 'App',

  components: {
   // WeatherHistoryXML,
    WeatherForecastXML,
    WeatherHistoryFetch,
   // WeatherForecastFetch
  },

  data: () => ({
    //
  }),
};
</script>
