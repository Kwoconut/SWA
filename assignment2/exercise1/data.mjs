class Data {
    constructor(type, unit) {
        this.type = type;
        this.unit = unit;
        if (new.target === Data) {
            Object.freeze(this);
        }
    }

    getType = () => this.type;

    getUnit = () => this.unit;
}

export { Data }