import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { WarningsService } from '../services/warnings.service';
import { Warning } from '../model/warning';
import { tap } from 'rxjs/operators';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { warningsArraysEqualById } from 'src/app/util/util';

@Component({
  selector: 'app-warnings',
  templateUrl: './warnings.component.html',
  styleUrls: ['./warnings.component.scss']
})
export class WarningsComponent implements OnInit, OnDestroy {

  @ViewChild('severityInput', { static: true }) severityInput!: ElementRef;

  public filteredLastUpdateWarnings: Warning[];
  public filteredCurrentWarnings: Warning[];
  public lastUpdateWarnings: Warning[];
  public currentWarnings: Warning[];
  public minimalSeverity: number;

  public warnings$: Observable<Warning[]>;
  public isStopped: boolean;

  public warningsSubscription!: Subscription;
  public severitySubscription!: Subscription;

  constructor(private service: WarningsService) {
    this.lastUpdateWarnings = [];
    this.currentWarnings = [];
    this.filteredCurrentWarnings = [];
    this.filteredLastUpdateWarnings = [];
    this.warnings$ = this.constructWarningsObservable();
    this.isStopped = true;
    this.minimalSeverity = 0;
  }

  public ngOnInit(): void {
    this.warningsSubscription = this.warnings$.subscribe();
    this.isStopped = false;
  }

  public ngAfterViewInit(): void {
    this.severitySubscription = this.getSeverityInputObservable().subscribe();
  }

  public doUpdate(values: Warning[]) {
    this.lastUpdateWarnings = this.currentWarnings;
    this.currentWarnings = values;
  }

  public constructWarningsObservable(): Observable<Warning[]> {
    return this.service.getPollWarningsObservable().pipe(
      tap((values) => {
        if (!warningsArraysEqualById(values, this.currentWarnings)) {
          this.doUpdate(values);
          this.setMinimalSeverity(this.minimalSeverity);
        }
      }))
  }

  public getSeverityInputObservable(): Observable<any> {
    return fromEvent(this.severityInput.nativeElement, 'keyup')
      .pipe(
        tap(() => this.setMinimalSeverity(this.minimalSeverity))
      )
  }

  public stopWarnings() {
    this.warningsSubscription.unsubscribe();
    this.isStopped = true;
  }

  public pollWarnings() {
    this.warningsSubscription.unsubscribe();
    this.warningsSubscription = this.warnings$.subscribe();
    this.isStopped = false;
  }

  public setMinimalSeverity(value: number) {
    this.filteredCurrentWarnings = this.currentWarnings.filter((warning) => warning.severity >= value);
    this.filteredLastUpdateWarnings = this.lastUpdateWarnings.filter((warning => warning.severity >= value));
  }

  public ngOnDestroy() {
    this.warningsSubscription.unsubscribe();
    this.severitySubscription.unsubscribe();
  }


}
