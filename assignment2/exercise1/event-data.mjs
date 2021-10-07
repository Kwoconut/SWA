class EventData {
    constructor(time, place, type, unit) {
        this.time = time;
        this.place = place;
        this.type = type;
        this.unit = unit;
        if (new.target === EventData){
            Object.freeze(this);
        }
    }

    getTime = () => this.time;
    
    getPlace = () => this.place;

    getType = () => this.type;

    getUnit = () => this.unit;
}

export { EventData }