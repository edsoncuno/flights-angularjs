import { Component, OnInit } from '@angular/core';

//model
import { Flight } from '../flight.model';
//service
import { FlightsService } from '../flights.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loading = true;

  flights: Flight[] = [];
  selectedOrigin: string = "";
  selectedDestination: string = "";
  filteredOriginList: any[] = [];
  filteredDestinationList: any[] = [];
  noFlightsFound: boolean = false;

  constructor(private flightsService: FlightsService) {
  }

  ngOnInit(): void {
    this.flightsService.getFlights().subscribe((flights) => { this.flights = flights; });

    this.flightsService.getAllOrigins().subscribe(data => {
      this.filteredOriginList = data;
      this.loading = false;
    });

    this.flightsService.getAllDestinations().subscribe(data => {
      this.filteredDestinationList = data;
      this.loading = false;
    });
  }

  query(): void {
    this.noFlightsFound = false;
    const origin = this.selectedOrigin;
    const destination = this.selectedDestination;
    this.flightsService.getFlightsQuery(origin, destination).subscribe((flights) => {
      this.flights = flights;
      if (flights.length === 0) {
        this.noFlightsFound = true;
      }
    });
  }
}
