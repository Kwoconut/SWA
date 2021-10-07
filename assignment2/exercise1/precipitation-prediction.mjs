import { WeatherPrediction } from "./weather-data.mjs";

class PrecipitationPrediction extends WeatherPrediction {
    constructor(time, place, type, unit, min, max, precipitationTypes) {
        super(time, place, type, unit, min, max, precipitationTypes);
        Object.freeze(this);
    }

    getExpectedTypes = () => this.precipitationType;

    matches = data => this.precipitationTypes.contains(data.getPrecipitationType()) && super.matches(data);

    convertToInches = () => {
        if (this.unit != 'Inches')
            return new PrecipitationPrediction(this.time, this.place, this.type, 'Inches', this.min / 25.4, this.max / 25.4, this.precipitationType);
    };

    convertToMM = () => {
        if (this.unit != 'MM')
            return new PrecipitationPrediction(this.time, this.place, this.type, 'MM', this.min * 25.4, this.max * 25.4, this.precipitationType);
    };
}

export { PrecipitationPrediction }


