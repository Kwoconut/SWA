function DateInterval(from, to) {
    this.from = from;
    this.to = to;
}

DateInterval.prototype.getFrom = function() {
    return this.from;
}

DateInterval.prototype.getTo = function() {
    return this.to;
}

DateInterval.prototype.contains = function(d) {
    return d > this.from && d < this.to
}

export { DateInterval }