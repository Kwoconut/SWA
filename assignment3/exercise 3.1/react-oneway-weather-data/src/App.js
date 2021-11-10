import {Redirect, Route, Switch} from "react-router-dom"
import { Layout } from './LayoutHOC';
import WeatherData from './containers/WeatherData';
import ForecastData from './containers/ForecastData';


function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/weatherData" component={WeatherData}/>
        <Route path="/forecastData" exact component={ForecastData}/>
        <Redirect to="/weatherData"/>
      </Switch>
    </Layout>
  );
}

export default App;
