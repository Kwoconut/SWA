import { Component, OnInit } from "@angular/core";
import { Measurement } from "src/app/model/measurement";
import { WeatherReportService } from "src/app/services/weather-report.service";

@Component ({
    selector: 'app-report-data',
    templateUrl: './report-data.component.html',
    styleUrls: ['./report-data.component.scss']
})
export class ReportDataComponent implements OnInit {

    measurement: Measurement

    constructor(private weatherReportService: WeatherReportService) {
        this.measurement = {
            type: '',
            time: new Date(),
            place: '',
            value: 0,
            unit: ''
        }
    }

    public ngOnInit() {

    }

    public reportData() {
        this.weatherReportService.reportData(this.measurement);
    }
}