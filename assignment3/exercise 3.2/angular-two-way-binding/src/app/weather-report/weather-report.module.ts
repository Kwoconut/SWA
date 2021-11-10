import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherReportComponent } from './weather-report.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { WeatherHistoryComponent } from './components/weather-history/weather-history.component';
import { WeatherForecastComponent } from './components/weather-forecast/weather-forecast.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ReportDataComponent } from './components/report-data/report-data.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 







@NgModule({
  declarations: [WeatherReportComponent, WeatherHistoryComponent, WeatherForecastComponent, ReportDataComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatButtonModule,
    FormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [WeatherReportComponent]
})
export class WeatherReportModule { }
