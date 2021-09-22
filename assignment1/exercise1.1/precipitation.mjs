import { WeatherData } from "./weather-data.mjs";

function Precipitation (date, place, type, unit, value, precipitationType) {
    WeatherData.call(this, date, place, type, unit, value);
    this.precipitationType = precipitationType;
}

Object.setPrototypeOf(Precipitation.prototype, WeatherData.prototype);

Precipitation.prototype.getPrecipitationType = function () {
    return this.precipitationType;
}

Precipitation.prototype.convertToInches = function () {
    if (this.getUnit() == 'MM') {
        this.setValue(this.getValue() / 25.4);
        this.setUnit('Inches');
    }
}

Precipitation.prototype.convertToMM = function () {
    if (this.getUnit() == 'Inches') {
        this.setValue(this.getValue() * 25.4);
        this.setUnit('MM');
    }
}

export { Precipitation }

