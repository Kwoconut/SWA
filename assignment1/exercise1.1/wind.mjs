import { WeatherData } from "./weather-data.mjs"

function Wind(date, place, type, unit, value, direction) {
    WeatherData.call(this, date, place, type, unit, value);
    this.direction = direction;
}

Object.setPrototypeOf(Wind.prototype, WeatherData.prototype);

Wind.prototype.getDirection = function() {
    return this.direction;
}

Wind.prototype.convertToMPH = function () {
    if (this.getUnit() == 'MS') {
        this.setValue(this.getValue() * 2.23693629);
        this.setUnit('MPH');
    }
}

Wind.prototype.convertToMS = function () {
    if (this.getUnit() == 'MPH') {
        this.setValue(this.getValue() / 2.23693629);
        this.setUnit('MS');
    }
}

export { Wind }