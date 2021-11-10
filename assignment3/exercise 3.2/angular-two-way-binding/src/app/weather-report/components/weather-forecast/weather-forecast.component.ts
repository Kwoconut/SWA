import { Component, OnInit } from "@angular/core";
import { Prediction } from "src/app/model/prediction";
import { WeatherReportService } from "src/app/services/weather-report.service";

@Component({
    selector: 'app-weather-forecast',
    templateUrl: './weather-forecast.component.html',
    styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements OnInit {

    predictions: Prediction[] = [];
    displayedColumnsPredictions: string[] = ['type', 'time', 'place', 'from', 'to', 'unit'];
    startDate!: Date;
    endDate!: Date;
    city: string = "";

    constructor(private weatherReportService: WeatherReportService) {

    }

    public ngOnInit() {

    }

    public fetchPredictions() {
        this.weatherReportService.getPredictions().subscribe((predictions: Prediction[]) => {
            this.predictions = predictions.map((prediction: Prediction) => {
                prediction.time = new Date(prediction.time);
                return prediction;
            })
        })
    }

    public filteredPredictions() {
        var filteredPredictions: Prediction[] = this.predictions;

        if (this.city && this.city != '') {
            filteredPredictions = filteredPredictions.filter((prediction: Prediction) => prediction.place === this.city);
        }

        if (this.startDate && this.endDate) {
            filteredPredictions = filteredPredictions.filter((prediction: Prediction) =>
             prediction.time.getTime() >= this.startDate.getTime() && prediction.time.getTime() <= this.endDate.getTime());
        }

        return filteredPredictions;
    }
}