import { WeatherData } from "./weather-data.mjs";

class Temperature extends WeatherData {
    constructor(type, unit, value) {
        super(type, unit, value);
        Object.freeze(this);
    }

    convertToC = () => new Temperature(this.type, 'C', (this.value * -32) * 9/5);

    convertToF = () => new Temperature(this.type, 'F', (this.value * 9/5) + 32);
}

const temp = new Temperature('temperature','C',0);
console.log(temp.convertToF());


