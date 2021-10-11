import { WeatherPrediction } from "./weather-data.mjs";

class WindPrediction extends WeatherPrediction {
    constructor(time, place, type, unit, min, max, expectedDirections) {
        super(time, place, type, unit, min, max);
        this.expectedDirections = expectedDirections;
        Object.freeze(this);
    }

    getExpectedDirections = () => this.expectedDirections;

    matches = data => this.expectedDirections.contains(data.getDirection()) && super.matches(data);

    convertToMPH = () => this.unit != 'MPH' ? new WindPrediction(this.time, this.place, this.type, 'MPH', this.min * 2.23, this.max * 2.23, this.expectedDirections) : this

    convertToMS = () => this.unit != 'MS' ? new WindPrediction(this.time, this.place, this.type, 'MS', this.min / 2.23, this.max / 2.23, this.expectedDirections) : this
}

export { WindPrediction }


