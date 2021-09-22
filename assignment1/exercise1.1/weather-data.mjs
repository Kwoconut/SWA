import { Event } from "./event.mjs";
import { DataType } from "./data-type.mjs";

function WeatherData(date, place, type, unit, value) {
    this.value = value;
    this.event = Event(date, place);
    this.dataType = DataType(type, unit);
}

WeatherData.prototype.getValue = function() {
    return this.value;
}

WeatherData.prototype.getDate = function() {
    return this.event.getDate();
}

WeatherData.prototype.getPlace = function() {
    return this.event.getPlace();
}

WeatherData.prototype.getType = function() {
    return this.dataType.getType();
}

WeatherData.prototype.getUnit = function() {
    return this.dataType.getUnit();
}

WeatherData.prototype.setValue = function(value) {
    this.value = value;
}

WeatherData.prototype.setDate = function(date) {
    this.event.setDate(date);
}

WeatherData.prototype.setPlace = function(place) {
    this.event.setPlace(place);
}

WeatherData.prototype.setUnit = function(unit) {
    this.dataType.setUnit(unit);
}

WeatherData.prototype.setType = function(type) {
    this.dataType.setType(type);
}

export { WeatherData }
