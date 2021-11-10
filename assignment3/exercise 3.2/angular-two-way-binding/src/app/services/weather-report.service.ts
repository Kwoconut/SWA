import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Prediction } from "../model/prediction";
import { Measurement } from "../model/measurement";


const URL = "http://localhost:8080"

@Injectable({
    providedIn: 'root'
})
export class WeatherReportService {

    constructor(private http: HttpClient) {}

    public getHistory(): Observable<Measurement[]> {
        return this.http.get<Measurement[]>(URL + "/data");
    }

    public getPredictions(): Observable<Prediction[]> {
        return this.http.get<Prediction[]>(URL + "/forecast");
    }

    public reportData(measurement: Measurement): void {
        this.http.post(URL + "/data", measurement).subscribe();
    }

}