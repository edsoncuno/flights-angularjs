import { Injectable } from '@angular/core';

// model
import { Flight } from './flight.model';

import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  constructor(private http: HttpClient) { }

  getFlights(): Observable<any> {
    return this.http.get('http://localhost:3000/flights/');
  }

  getFlightsQuery(orig: string, dest: string): Observable<any> {
    return this.http.get(`http://localhost:3000/flights/query/${orig}/${dest}`);
  }

  postFlight(flight: Flight) {
    return this.http.post('http://localhost:3000/flights', flight).subscribe(data => {
    })
  }

  getAllOrigins(): Observable<any> {
    return this.http.get('http://localhost:3000/flights/cities/origins');
  }

  getAllDestinations(): Observable<any> {
    return this.http.get('http://localhost:3000/flights/cities/destinations');
  }

  updateFlight(flight: Flight) {
    return this.http.patch(`http://localhost:3000/flights/${flight.id}`, flight);
  }

  deleteFlight(id: number) {
    return this.http.delete(`http://localhost:3000/flights/${id}`);
  }

}
