import { WeatherPrediction } from "./weather-prediction.mjs";

function PrecipitationPrediction(date, place, type, unit, value, expectedTypes) {
    WeatherPrediction.call(this, date, place, type, unit, value);
    this.expectedTypes = expectedTypes;
}

Object.setPrototypeOf(PrecipitationPrediction.prototype, WeatherPrediction.prototype);

PrecipitationPrediction.prototype.getExpectedTypes = function () {
    return this.expectedTypes;
}

PrecipitationPrediction.prototype.convertToInches = function () {
    if (this.getUnit() == 'MM') {
        this.setValue(this.getValue() / 25.4);
        this.setUnit('Inches');
    }
}

PrecipitationPrediction.prototype.convertToMM = function () {
    if (this.getUnit() == 'Inches') {
        this.setValue(this.getValue() * 25.4);
        this.setUnit('MM');
    }
}

export { PrecipitationPrediction }