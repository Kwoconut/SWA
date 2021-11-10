import { Component, OnInit } from "@angular/core";
import { Measurement } from "src/app/model/measurement";
import { WeatherReportService } from "src/app/services/weather-report.service";

@Component({
    selector: 'app-weather-history',
    templateUrl: './weather-history.component.html',
    styleUrls: ['./weather-history.component.scss']
})
export class WeatherHistoryComponent implements OnInit {

    measurements: Measurement[] = [];
    displayedColumnsHistory: string[] = ['type', 'time', 'place', 'value', 'unit'];
    startDate!: Date;
    endDate!: Date;
    city: string = "";

    constructor(private weatherReportService: WeatherReportService) {

    }

    public ngOnInit() {

    }

    public fetchMeasurements() {
        this.weatherReportService.getHistory().subscribe((measurements: Measurement[]) => {
            this.measurements = measurements.map((measurement: Measurement) => {
                measurement.time = new Date(measurement.time);
                return measurement;
            })
        })
    }

    public filteredMeasurements() {
        var filteredMeasurements: Measurement[] = this.measurements;

        if (this.city && this.city != '') {
            filteredMeasurements = filteredMeasurements.filter((measurement: Measurement) => measurement.place === this.city);
        }

        if (this.startDate && this.endDate) {
            filteredMeasurements = filteredMeasurements.filter((measurement: Measurement) =>
             measurement.time.getTime() >= this.startDate.getTime() && measurement.time.getTime() <= this.endDate.getTime());
        }

        return filteredMeasurements;
    }
}