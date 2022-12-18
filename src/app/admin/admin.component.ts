import { Component, OnInit } from '@angular/core';

import { Flight } from '../flight.model';
import { FlightsService } from '../flights.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private flightService: FlightsService) { }

  loading = true;

  origin: string = "";
  destination: string = "";
  flightNumber: number = 0;
  depart: Date = new Date();
  arrive: Date = new Date();
  nonstop: boolean = false;

  flightList: any[] = [];

  ngOnInit(): void {
    this.flightService.getFlights().subscribe((data) => {
      this.flightList = data;
      this.loading = false;
    })
  }

  toggleNonStop() {
    this.nonstop = !this.nonstop;
  }

  sendFlight() {
    const flight: Flight = {
      id: 0,
      origin: this.origin,
      destination: this.destination,
      flightNumber: this.flightNumber,
      depart: this.depart,
      arrive: this.arrive,
      nonstop: this.nonstop
    }
    this.flightService.postFlight(flight);

  }

  refresh() {
    this.loading = true;
    this.flightService.getFlights().subscribe(data => {
      this.flightList = data;
      this.loading = false;
    })
  }

  update(flight: Flight) {
    this.flightService.updateFlight(flight).subscribe(data => {
      this.refresh();
    });
  }

  delete(flight: Flight) {
    if (window.confirm('are you sure you want to delete this flight? ')) {
      this.flightService.deleteFlight(flight.id).subscribe((data) => {
        this.refresh();
      });
      /*
      this.flightService.deleteFlight(flight.id).subscribe(data => {
        this.refresh();
      });
      */
    }
  }

}
