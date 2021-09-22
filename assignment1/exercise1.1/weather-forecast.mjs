function WeatherForecast(place, type, period, data) {
    this.placeFilter = place;
    this.typeFilter = type;
    this.periodFilter = period;
    this.data = data;
}

WeatherForecast.prototype.getPlaceFilter = function () {
    return this.placeFilter;
}

WeatherForecast.prototype.getTypeFilter = function () {
    return this.typeFilter;
}

WeatherForecast.prototype.getPeriodFilter = function () {
    return this.periodFilter;
}

WeatherForecast.prototype.setPlaceFilter = function (place) {
    this.placeFilter = place;
}

WeatherForecast.prototype.setTypeFilter = function (type) {
    this.typeFilter = type;
}

WeatherForecast.prototype.setPeriodFilter = function (period) {
    this.periodFilter = period;
}

WeatherForecast.prototype.clearPlaceFilter = function () {
    this.placeFilter = undefined;
}

WeatherForecast.prototype.clearTypeFilter = function () {
    this.typeFilter = undefined;
}

WeatherForecast.prototype.clearPeriodFilter = function () {
    this.periodFilter = undefined;
}

WeatherForecast.prototype.convertToUSUnits = function () {
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

WeatherForecast.prototype.convertToEUUnits = function () {
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

WeatherForecast.prototype.add = function (data) {
    this.data.push(data);
}

WeatherForecast.prototype.getFilteredData = function () {

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

export { WeatherForecast }




