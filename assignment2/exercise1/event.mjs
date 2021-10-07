class Event {
    constructor(time, place, data) {
        this.time = time;
        this.place = place;
        this.data = data;
        Object.freeze(this);
    }

    getTime = () => this.time;

    getPlace = () => this.place;
}

export { Event }
