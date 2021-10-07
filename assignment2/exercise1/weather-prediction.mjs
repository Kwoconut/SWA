import { EventData } from "./event-data.mjs";

class WeatherPrediction extends EventData {
    constructor(time, place, type, unit, min, max) {
        super(time, place, type, unit)
        this.min = min;
        this.max = max;
        if (new.target === WeatherPrediction){
            Object.freeze(this);
        }
    }

    matches = data => data.getValue() >= this.min && data.getValue() <= this.max
        
    getMin = () => this.min;

    getMax = () => this.max;
}

export { WeatherPrediction }