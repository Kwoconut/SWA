import { WeatherData } from "./weather-data.mjs";

function Temperature (date, place, type, unit, value) {
    WeatherData.call(this, date, place, type, unit, value);
}

Object.setPrototypeOf(Temperature.prototype, WeatherData.prototype);

Temperature.prototype.convertToF = function() {
    if (this.getUnit() == 'C')
    {
        this.setValue((this.getValue() * 9/5) + 32);
        this.setUnit('F');
    }
}

Temperature.prototype.convertToC = function() {
    if (this.getUnit() == 'F')
    {
        this.setValue((this.getValue() - 32) * 9/5);
        this.setUnit('C');
    }
}

export { Temperature }
