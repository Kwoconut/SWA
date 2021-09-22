import { WeatherPrediction } from "./weather-prediction.mjs";

function TemperaturePrediction(date, place, type, unit, value) {
    WeatherPrediction.call(this, date, place, type, unit, value);
}

Object.setPrototypeOf(TemperaturePrediction.prototype ,WeatherPrediction.prototype);

TemperaturePrediction.prototype.convertToF = function() {
    if (this.getUnit() == 'C')
    {
        this.setValue((this.getValue() * 9/5) + 32);
        this.setUnit('F');
    }
}

TemperaturePrediction.prototype.convertToC = function() {
    if (this.getUnit() == 'F')
    {
        this.setValue((this.getValue() - 32) * 9/5);
        this.setUnit('C');
    }
}

export { TemperaturePrediction }