import { WeatherData } from "./weather-data.mjs";

class Temperature extends WeatherData {
    constructor(time, place, type, unit, value) {
        super(time, place, type, unit, value);
        Object.freeze(this);
    }

    convertToC = () => this.unit != 'C' ? new Temperature(this.time, this.place, this.type, 'C', (this.value * -32) * 9 / 5) : this;

    convertToF = () => this.unit != 'F' ? new Temperature(this.time, this.place, this.type, 'F', (this.value * 9 / 5) + 32) : this;
}

export { Temperature }
