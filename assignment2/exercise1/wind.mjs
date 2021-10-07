import { WeatherData } from "./weather-data.mjs";

class Wind extends WeatherData {
    constructor(time, place, type, unit, value, direction) {
        super(time, place, type, unit, value, direction);
        Object.freeze(this);
    }

    getDirection = () => this.direction;

    convertToMPH = () => this.unit != 'MPH' ? new Wind(this.time, this.place, this.type, 'MPH', this.value * 2.23, this.direction) : this

    convertToMS = () => this.unit != 'MS' ? new Wind(this.time, this.place, this.type, 'MS', this.value / 2.23, this.direction) : this
}

export { Wind }


