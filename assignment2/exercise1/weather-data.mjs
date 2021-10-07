import { EventData } from "./event-data.mjs";

class WeatherData extends EventData {
    constructor (time, place, type, unit, value) {
        super(time, place, type, unit);
        this.value = value;
        if (new.target === WeatherData){
            Object.freeze(this);
        }
    }

    getValue = () => this.value;
}

export { WeatherData }