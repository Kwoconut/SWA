class WeatherForecast {
    constructor (data) {
        this.data = data;
    }

    forPlace = place => new WeatherHistory(this.data.filter(weatherData => weatherData.getPlace() === place));

    forType = type => new WeatherHistory(this.data.filter(weatherData => weatherData.getType() === type));

    forPeriod = period => new WeatherHistory(this.data.filter(weatherData => period.contains(weatherData.getTime())));

    including = data => new WeatherHistory([...this.data, ...data]);

    convertToUsUnits = () => new WeatherHistory(this.data.map(data => {
        if (data.getType() === 'Temperature') {
            return data.convertToF();
        }
        if (data.getType() === 'Precipitation') {
            return data.convertToInches();
        }
        if (data.getType() === 'Wind') {
            return data.convertToMPH();
        }
    }));

    convertToInternationalUnits = () => new WeatherHistory(this.data.map(data => {
        if (data.getType() === 'Temperature') {
            return data.convertToC();
        }
        if (data.getType() === 'Precipitation') {
            return data.convertToMM();
        }
        if (data.getType() === 'Wind') {
            return data.convertToMS();
        }
    }));

    getAverageMinValue = () => {
        const result = this.data.reduce((acc, entry) => {
            acc.count = acc.count + 1;
            acc.accumulatedValue = acc.accumulatedValue + entry.getMin();
            acc.avg = acc.accumulatedValue / acc.count;

            return acc;
        },{count: 0,accumulatedValue: 0, avg: 0});

        return result.avg;
    }

    getAverageMaxValue = () => {
        const result = this.data.reduce((acc, entry) => {
            acc.count = acc.count + 1;
            acc.accumulatedValue = acc.accumulatedValue + entry.getMax();
            acc.avg = acc.accumulatedValue / acc.count;

            return acc;
        },{count: 0,accumulatedValue: 0, avg: 0});

        return result.avg;
    }

    getPredictions = () => {
        return new WeatherForecast(this.data);
    }
}