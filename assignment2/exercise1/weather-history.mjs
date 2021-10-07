import { Precipitation } from "./precipitation.mjs";
import { Temperature } from "./temperature.mjs";
import { WeatherData } from "./weather-data.mjs";

class WeatherHistory {
    constructor(data) {
        this.data = data;
    }

    forPlace = place => new WeatherHistory(this.data.filter(weatherData => weatherData.getPlace() === place));

    forType = type => new WeatherHistory(this.data.filter(weatherData => weatherData.getType() === type));

    forPeriod = period => new WeatherHistory(this.data.filter(weatherData => period.contains(weatherData.getTime())));

    including = data => new WeatherHistory([...this.data, ...data]);

    convertToUsUnits = () => new WeatherHistory(this.data.map(data => {
        if (data.getType() === 'Temperature') {
            return data.convertToF();
        }
        if (data.getType() === 'Precipitation') {
            return data.convertToInches();
        }
        if (data.getType() === 'Wind') {
            return data.convertToMPH();
        }
    }));

    convertToInternationalUnits = () => new WeatherHistory(this.data.map(data => {
        if (data.getType() === 'Temperature') {
            return data.convertToC();
        }
        if (data.getType() === 'Precipitation') {
            return data.convertToMM();
        }
        if (data.getType() === 'Wind') {
            return data.convertToMS();
        }
    }));

    lowestValue = () => this.data.reduce((accumulator, current) => {
        accumulator.types.add(current.getType())
        if (accumulator.types.size !== 1)
          accumulator.value = undefined
        else if (current.getValue() < accumulator.value)
          accumulator.value = current.getValue()
        return accumulator
      }, {types: new Set(), value: 9999}).value

      countReduce = () => this.data.length === 0 ? undefined : this.data.map(data => data.getValue())
                            .reduce((pv, cv) => pv > cv ? cv : pv);

}

const data1 = new Temperature('time', 'Aarhus', 'Temperature', 'C', 6);
const data2 = new Temperature('time', 'Copenhagen', 'Temperature', 'C', 4);
const data = [data1, data2];
const h = new WeatherHistory([]);
const converted = h.lowestValue()
console.log(converted);