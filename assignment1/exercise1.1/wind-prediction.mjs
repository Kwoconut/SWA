import { WeatherPrediction } from "./weather-prediction.mjs";

function WindPrediction(date, place, type, unit, value, expectedTypes) {
    WeatherPrediction.call(this, date, place, type, unit, value);
    this.expectedTypes = expectedTypes;
}

Object.setPrototypeOf(WindPrediction.prototype, WeatherPrediction);

WindPrediction.prototype.getExpectedTypes = function() {
    return this.expectedTypes;
}

WindPrediction.prototype.convertToMPH = function () {
    if (this.getUnit() == 'MS') {
        this.setValue(this.getValue() * 2.23693629);
        this.setUnit('MPH');
    }
}

WindPrediction.prototype.convertToMS = function () {
    if (this.getUnit() == 'MPH') {
        this.setValue(this.getValue() / 2.23693629);
        this.setUnit('MS');
    }
}

export { WindPrediction }