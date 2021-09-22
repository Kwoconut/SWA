class DateInterval{
    constructor(from, to){
        this.from = from
        this.to = to
    }

    getFrom() {
        return this.from
    }

    getTo() {
        return this.to
    }

    contains(date) {
        return date >= this.from && date <= this.to
    }
}

class Data{
    constructor(type, unit) {
        this.type = type
        this.unit = unit
    }

    getType() {
        return this.type
    }

    getUnit() {
        return this.unit
    }
}

class Event extends Data{
    constructor(type,unit,time, place) {
        super(type, unit)
        this.time = time
        this.place = place
    }

    getTime() {
        return this.time
    }

    getPlace() {
        return this.place
    }
}

class WeatherData extends Event{
    constructor(type,unit,time, place, value) {
        super(type,unit,time, place)
        this.value = value
    }

    getValue() {
        return this.value
    }
}

class WeatherPrediction extends Event{
    constructor(type,unit,time, place, min, max) {
        super(type,unit,time, place)
        this.min = min
        this.max = max
    }

    getMin() {
        return this.min
    }

    getMax() {
        return this.max
    }

    matches(data){
        return data.value >= this.min && data.value<= this.max
    }
}

class Temperature extends WeatherData{
    constructor(type,unit,time, place, value){
        super(type,unit,time, place, value)
    }

    convertToC() {
        this.value = (this.value - 32) / 1.8
    }

    convertToF() {
        this.value = (this.value * 1.8) + 32
    }
}

class TemperaturePrediction extends WeatherPrediction{
    constructor(type,unit,time, place, min, max){
        super(type,unit,time, place, min, max)
    }

    convertToC() {
        this.min = (this.min - 32) / 1.8
        this.max = (this.max - 32) / 1.8
    }

    convertToF() {
        this.min = (this.min * 1.8) + 32
        this.max = (this.max * 1.8) + 32
    } 
}

class Precipitation extends WeatherData{
    constructor(type,unit,time, place, value, precipitationType){
        super(type,unit,time, place, value)
        this.precipitationType = precipitationType
    }

    getPrecipitationType() {
        return this.precipitationType
    }

    convertToInches() {
        this.value = this.value / 25.4
    }

    convertToMM() {
        this.value = this.value * 25.4
    }
    
    matches(data){
        return data.value >= this.min && data.value<= this.max
    }
}

class PrecipitationPrediction extends WeatherPrediction{
    constructor(type,unit,time, place, min, max, expectedTypes){
        super(type,unit,time, place, min, max)
        this.expectedTypes = expectedTypes
    }

    getExpectedTypes() {
        return this.expectedTypes
    }

    convertToInches() {
        this.min = this.min / 25.4
        this.max = this.max / 25.4
    }

    convertToMM() {
        this.min = this.min * 25.4
        this.max = this.max * 25.4
    }
    matches(data){
        return this.matches(data) && this.expectedTypes.includes(data.precipitationType)
    } 
}

class Wind extends WeatherData{
    constructor(type,unit,time, place, value, direction){
        super(type,unit,time, place, value)
        this.direction = direction
    }

    getDirection() {
        return this.direction
    }

    convertToMPH() {
        this.value = this.value * 2.237
    }

    convertToMS() {
        this.value = this.value / 2.237
    }  
}

class WindPrediction extends WeatherPrediction{
    constructor(type,unit,time, place, min, max, expectedDirections){
        super(type,unit,time, place, min, max)
        this.expectedDirections = expectedDirections
    }

    getExpectedDirections() {
        return this.expectedDirections
    }

    convertToMPH() {
        this.min = this.min * 2.237
        this.max = this.max * 2.237
    }

    convertToMS() {
        this.min = this.min / 2.237
        this.max = this.max / 2.237
    }
    
    matches(data){
        return this.matches(data) && this.expectedDirections.includes(data.direction)
    }
}

class CloudCoverage extends WeatherData{
    constructor(type,unit,time, place, value, coverageType){
        super(type,unit,time, place, value)
        this.coverageType = coverageType
    }

    getCoverageType() {
        return this.coverageType
    }

    convertToPercentage() {
        this.value = this.value * 12.5
    }

    convertToOkta() {
        this.value = this.value / 12.5
    }
}

class CloudCoveragePrediction extends WeatherPrediction{
    constructor(type,unit,time, place, min, max, expectedCoverageType){
        super(type,unit,time, place, min, max)
        this.expectedCoverageType = expectedCoverageType
    }

    getExpectedCoverageType() {
        return this.expectedCoverageType
    }

    convertToPercentage() {
        this.min = this.min * 12.5
        this.max = this.max * 12.5
    }

    convertToOkta() {
        this.min = this.min / 12.5
        this.max = this.max / 12.5
    }
    
    matches(data){
        return this.matches(data) && this.expectedCoverageType.includes(data.expectedCoverageType)
    }
}

class WeatherHistory{
    constructor(data){
        this.data = data
    }
    
    getPlaceFilter(){
        return this.placeFilter
    }

    setPlaceFilter(place){
        this.placeFilter = place
    }

    clearPlaceFilter(){
        this.placeFilter = undefined
    }

    getTypeFilter(){
        return this.typeFilter
    }

    setTypeFilter(type){
        this.typeFilter = type
    }

    clearTypeFilter(){
        this.typeFilter = undefined
    }

    getPeriodFilter(){
        return this.periodFilter
    }

    setPeriodFilter(period){
        this.periodFilter = period
    }

    clearPeriodFilter(){
        this.periodFilter = undefined
    }

    convertToUSUnits(){
        for (let i = 0; i< this.data.length; i++){
            if (this.data[i].type == "Temperature" && this.data[i].unit == "C"){
                this.data[i].unit = "F"
                this.data[i].convertToF()
            }

            if (this.data[i].type == "Precipitation" && this.data[i].unit == "MM"){
                this.data[i].unit = "Inches"
                this.data[i].convertToInches()
            }

            if (this.data[i].type == "Wind" && this.data[i].unit == "MS"){
                this.data[i].unit = "MPH"
                this.data[i].convertToMPH()
            }

            if (this.data[i].type == "CloudCoverage" && this.data[i].unit == "Percentage"){
                this.data[i].unit = "Okta"
                this.data[i].convertToOkta()
            }
        }
    }

    convertToInternationalUnits(){
        for (let i = 0; i< this.data.length; i++){
            if (this.data[i].type == "Temperature" && this.data[i].unit == "F"){
                this.data[i].unit = "C"
                this.data[i].convertToC()
            }

            if (this.data[i].type == "Precipitation" && this.data[i].unit == "Inches"){
                this.data[i].unit = "MM"
                this.data[i].convertToMM()
            }

            if (this.data[i].type == "Wind" && this.data[i].unit == "MPH"){
                this.data[i].unit = "MS"
                this.data[i].convertToMS()
            }

            if (this.data[i].type == "CloudCoverage" && this.data[i].unit == "Okta"){
                this.data[i].unit = "Percentage"
                this.data[i].convertToPercentage()
            }
        }
    }

    add(data){
        this.data.push(data)
    }

    getFilteredData(){
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
            filteredData = this.data.filter(data => this.periodFilter.contains(data.time));
        }
    
        return filteredData;
    }
}

class WeatherForecast{
    constructor(data){
        this.data = data
    }
    
    getPlaceFilter(){
        return this.placeFilter
    }

    setPlaceFilter(place){
        this.placeFilter = place
    }

    clearPlaceFilter(){
        this.placeFilter = undefined
    }

    getTypeFilter(){
        return this.typeFilter
    }

    setTypeFilter(type){
        this.typeFilter = type
    }

    clearTypeFilter(){
        this.typeFilter = undefined
    }

    getPeriodFilter(){
        return this.periodFilter
    }

    setPeriodFilter(period){
        this.periodFilter = period
    }

    clearPeriodFilter(){
        this.periodFilter = undefined
    }

    convertToUSUnits(){
        for (let i = 0; i< this.data.length; i++){
            if (this.data[i].type == "Temperature" && this.data[i].unit == "C"){
                this.data[i].unit = "F"
                this.data[i].convertToF()
            }

            if (this.data[i].type == "Precipitation" && this.data[i].unit == "MM"){
                this.data[i].unit = "Inches"
                this.data[i].convertToInches()
            }

            if (this.data[i].type == "Wind" && this.data[i].unit == "MS"){
                this.data[i].unit = "MPH"
                this.data[i].convertToMPH()
            }

            if (this.data[i].type == "CloudCoverage" && this.data[i].unit == "Percentage"){
                this.data[i].unit = "Okta"
                this.data[i].convertToOkta()
            }
        }
    }

    convertToInternationalUnits(){
        for (let i = 0; i< this.data.length; i++){
            if (this.data[i].type == "Temperature" && this.data[i].unit == "F"){
                this.data[i].unit = "C"
                this.data[i].convertToC()
            }

            if (this.data[i].type == "Precipitation" && this.data[i].unit == "Inches"){
                this.data[i].unit = "MM"
                this.data[i].convertToMM()
            }

            if (this.data[i].type == "Wind" && this.data[i].unit == "MPH"){
                this.data[i].unit = "MS"
                this.data[i].convertToMS()
            }

            if (this.data[i].type == "CloudCoverage" && this.data[i].unit == "Okta"){
                this.data[i].unit = "Percentage"
                this.data[i].convertToPercentage()
            }
        }
    }

    add(data){
        this.data.push(data)
    }

    getFilteredData(){
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
            filteredData = this.data.filter(data => this.periodFilter.contains(data.time));
        }
    
        return filteredData;
    }
}