import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Warning } from '../model/warning';

@Injectable({
  providedIn: 'root'
})
export class WarningsService {

  constructor(private http: HttpClient) {

  }

  getPollWarningsObservable(): Observable<Warning[]> {
    return timer(0, 3000).pipe(
      map(() => this.http.get<any>('http://localhost:8080/warnings')),
      map((request) => request.pipe(
        map(response => response.warnings)
      )),
      switchMap((values) => values)
    )
  }

}
