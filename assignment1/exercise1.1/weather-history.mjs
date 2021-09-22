function WeatherHistory(place, type, period, data) {
    this.placeFilter = place;
    this.typeFilter = type;
    this.periodFilter = period;
    this.data = data;
}

WeatherHistory.prototype.getPlaceFilter = function () {
    return this.placeFilter;
}

WeatherHistory.prototype.getTypeFilter = function () {
    return this.typeFilter;
}

WeatherHistory.prototype.getPeriodFilter = function () {
    return this.periodFilter;
}

WeatherHistory.prototype.setPlaceFilter = function (place) {
    this.placeFilter = place;
}

WeatherHistory.prototype.setTypeFilter = function (type) {
    this.typeFilter = type;
}

WeatherHistory.prototype.setPeriodFilter = function (period) {
    this.periodFilter = period;
}

WeatherHistory.prototype.clearPlaceFilter = function () {
    this.placeFilter = undefined;
}

WeatherHistory.prototype.clearTypeFilter = function () {
    this.typeFilter = undefined;
}

WeatherHistory.prototype.clearPeriodFilter = function () {
    this.periodFilter = undefined;
}

WeatherHistory.prototype.convertToUSUnits = function () {
    for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].getType() == 'temperature') {
            this.data[i].convertToF();
        } else if (this.data[i].getType() == 'precipitation') {
            this.data[i].convertToInches();
        } else if (this.data[i].getType() == 'wind') {
            this.data[i].convertToMPH();
        }
    }
}

WeatherHistory.prototype.convertToEUUnits = function () {
    for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].getType() == 'temperature') {
            this.data[i].convertToC();
        } else if (this.data[i].getType() == 'precipitation') {
            this.data[i].convertToMM();
        } else if (this.data[i].getType() == 'wind') {
            this.data[i].convertToMS();
        }
    }
}

WeatherHistory.prototype.add = function (data) {
    this.data.push(data);
}

WeatherHistory.prototype.getFilteredData = function () {

    if (this.placeFilter == undefined && this.typeFilter == undefined && this.periodFilter == undefined) {
        return this.data;
    }

    let filteredData = this.data;

    if (this.placeFilter != undefined) {
        filteredData = this.data.filter(data => this.placeFilter == data.getPlace());
    } 

    if (this.typeFilter != undefined) {
        filteredData = this.data.filter(data => this.typeFilter == data.getType());
    }

    if (this.periodFilter != undefined) {
        filteredData = this.data.filter(data => this.periodFilter.contains(data.getDate()));
    }

    return filteredData;
}

export { WeatherHistory }




