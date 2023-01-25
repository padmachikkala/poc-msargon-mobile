import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.page.html',
  styleUrls: ['./location-search.page.scss'],
})
export class LocationSearchPage implements OnInit {
  public cities = [
    { name: 'Bangalore' },
    { name: 'Hyderabad' },
    { name: 'New York' },
    { name: 'Portugal' },
  ];

  constructor() {}

  ngOnInit() {}
}
