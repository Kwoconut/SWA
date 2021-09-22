import { DataType } from "./data-type.mjs";
import { Event } from "./event.mjs";

function WeatherPrediction(date, place, type, unit, value) {
    this.value = value;
    this.event = Event(date, place);
    this.dataType = DataType(type, unit);
}

WeatherPrediction.prototype.matches = function() {
    return data.getValue() == this.value &&
    this.getDate() == this.event.getDate() &&
    this.getPlace() == this.event.getPlace() &&
    this.getUnit() == this.dataType.getUnit() &&
    this.getType() == this.dataType.getType();
}

WeatherPrediction.prototype.getValue = function() {
    return this.getValue();
}

WeatherPrediction.prototype.getDate = function() {
    return this.event.getDate();
}

WeatherPrediction.prototype.getPlace = function() {
    return this.event.getPlace();
}

WeatherPrediction.prototype.getType = function() {
    return this.dataType.getType();
}

WeatherPrediction.prototype.getUnit = function() {
    return this.dataType.getUnit();
}

WeatherPrediction.prototype.setValue = function(value) {
    this.value = value;
}

WeatherPrediction.prototype.setDate = function(date) {
    this.event.setDate(date);
}

WeatherPrediction.prototype.setPlace = function(place) {
    this.event.setPlace(place);
}

WeatherPrediction.prototype.setUnit = function(unit) {
    this.dataType.setUnit(unit);
}

WeatherPrediction.prototype.setType = function(type) {
    this.dataType.setType(type);
}

export { WeatherPrediction }