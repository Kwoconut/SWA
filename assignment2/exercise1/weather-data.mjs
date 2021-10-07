import { Data } from "./data.mjs";

class WeatherData extends Data {
    constructor (type, unit, value) {
        super(type, unit);
        this.value = value;
        if (new.target === WeatherData){
            Object.freeze(this);
        }
    }

    getValue = () => this.value;
}

export { WeatherData }