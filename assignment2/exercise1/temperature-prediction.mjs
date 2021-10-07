import { WeatherPrediction } from "./weather-prediction.mjs";

class TemperaturePrediction extends WeatherPrediction {
    constructor(time, place, type, unit, min, max) {
        super(time, place, type, unit, min, max);
        Object.freeze(this);
    }

    convertToC = () => this.unit != 'C' ? new TemperaturePrediction(this.time, this.place, this.type, 'C', (this.min * -32) * 9 / 5, (this.max * -32) * 9 / 5) : this

    convertToF = () => this.unit != 'F' ?  new TemperaturePrediction(this.time, this.place, this.type, 'F', (this.min * 9 / 5) + 32, (this.max * 9 / 5) + 32) : this
}

export { TemperaturePrediction }