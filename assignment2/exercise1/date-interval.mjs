class DateInterval {
    constructor(from, to) {
        this.from = from;
        this.to = to;
        Object.freeze(this);
    }

    getFrom = () => this.from;
    
    getTo = () => this.to;

    contains = date => date >= this.from && date <= this.to
}

export { DateInterval }