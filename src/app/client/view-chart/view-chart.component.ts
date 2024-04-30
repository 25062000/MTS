import { Component } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-view-chart',
  standalone: true,
  imports: [],
  templateUrl: './view-chart.component.html',
  styleUrl: './view-chart.component.css'
})
export class ViewChartComponent {
  map: mapboxgl.Map | undefined;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat: number = 30.2672;
  lng: number = -97.7431;
  accessToken = 'pk.eyJ1Ijoic2l2YWVjZXNpcyIsImEiOiJjbG9oMDBtdDgxMzUwMmtvMWk3cTJ2NXRzIn0.CgekuJWjQEjcgrVXgApkug';

  ngOnInit() {
     this.map = new mapboxgl.Map({
        container: 'map',
        accessToken: this.accessToken,
        style: this.style,
        zoom: 13,
        center: [this.lng, this.lat]
      });
  }
}
