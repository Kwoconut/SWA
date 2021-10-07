import { WeatherData } from "./weather-data.mjs";

class Precipitation extends WeatherData {
    constructor(time, place, type, unit, value, precipitationType) {
        super(time, place, type, unit, value, precipitationType);
        Object.freeze(this);
    }

    getPrecipitationType = () => this.precipitationType;

    convertToInches = () => this.unit != 'Inches' ? new Precipitation(this.time, this.place, this.type, 'Inches', this.value / 25.4, this.precipitationType) : this

    convertToMM = () => this.unit != 'MM' ? new Precipitation(this.time, this.place, this.type, 'MM', this.value * 25.4, this.precipitationType) : this
}

export { Precipitation }


