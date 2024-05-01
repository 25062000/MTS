import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs'; 
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import * as mapboxgl from 'mapbox-gl';
import { ClientService } from '../../service/client.service';

@Component({
  selector: 'app-view-chart',
  standalone: true,
  imports: [ MatTabsModule, CommonModule, MatCheckboxModule],
  templateUrl: './view-chart.component.html',
  styleUrl: './view-chart.component.css'
})
export class ViewChartComponent {

  constructor(private _clientService: ClientService){}

  map: mapboxgl.Map | undefined;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat: number = 30.2672;
  lng: number = -97.7431;
  accessToken = 'pk.eyJ1Ijoic2l2YWVjZXNpcyIsImEiOiJjbG9oMDBtdDgxMzUwMmtvMWk3cTJ2NXRzIn0.CgekuJWjQEjcgrVXgApkug';

  isChartBtnClicked: boolean = false;
  newFiles: any;
  checked = false;
  indeterminate = false;

  ngOnInit() {
    
      this.loadNewFiles();
     this.map = new mapboxgl.Map({
        container: 'map',
        accessToken: this.accessToken,
        style: this.style,
        zoom: 13,
        center: [this.lng, this.lat]
      }); 

      // console.log("load new files executed");
      // this._clientService.getEncFiles().subscribe((res: any)=>{
      //   if(res.status){
      //     this.newFiles = res.data;
      //     console.log(this.newFiles);
      //   }else{
      //     console.log(res.message);
      //   }
      // })
  }

  onChartClick(){
    this.isChartBtnClicked = !this.isChartBtnClicked;
  }

  loadNewFiles(){
    console.log("load new files executed");
    this._clientService.getEncFiles().subscribe((res: any)=>{
      if(res.status){
        this.newFiles = res.data;
        console.log(this.newFiles);
      }else{
        console.log(res.message);
      }
    })
  }
  
}
