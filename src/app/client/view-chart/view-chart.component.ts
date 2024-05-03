import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs'; 
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import * as mapboxgl from 'mapbox-gl';
import { ClientService } from '../../service/client.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-view-chart',
  standalone: true,
  imports: [ MatTabsModule, CommonModule, MatCheckboxModule, FormsModule],
  templateUrl: './view-chart.component.html',
  styleUrl: './view-chart.component.css'
})
export class ViewChartComponent {

  constructor(private _clientService: ClientService, private _authService: AuthService){}

  map: mapboxgl.Map | undefined;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat: number = 30.2672;
  lng: number = -97.7431;
  accessToken = 'pk.eyJ1Ijoic2l2YWVjZXNpcyIsImEiOiJjbG9oMDBtdDgxMzUwMmtvMWk3cTJ2NXRzIn0.CgekuJWjQEjcgrVXgApkug';

  isChartBtnClicked: boolean = false;
  newFiles: any[] =[];
  showRequest: boolean = false;
  clientID: any; 

  ngOnInit() {
    
      this.loadNewFiles();
     this.map = new mapboxgl.Map({
        container: 'map',
        accessToken: this.accessToken,
        style: this.style,
        zoom: 13,
        center: [this.lng, this.lat]
      }); 

  }

  onChartClick(){
    this.isChartBtnClicked = !this.isChartBtnClicked;
  }

  loadNewFiles(){
    console.log("load new files executed");
    this._clientService.getEncFiles().subscribe((res: any)=>{
      if(res.status){
        this.newFiles = res.data;
        this.newFiles = this.newFiles.map((file, index)=>{
          return {
              id: index + 1,
              name: file,
              isSelected: false
          };
        })
        console.log(this.newFiles);
      }else{
        console.log(res.message);
      }
    })
  }

  onChange(whichFile:string){
    console.log("Event",this.newFiles)
    var anyChecked = this.newFiles.some((file: any) => file.isSelected);
    console.log(anyChecked);
    const fileDiv = document.querySelector('.'+ whichFile);
    if(anyChecked){
      this.showRequest = true;
      fileDiv?.classList.add('extendHeight'); 
    }else{
      this.showRequest = false;
      fileDiv?.classList.remove('extendHeight'); 
    }
  }

  getRequestedNewFiles(){
    var requestedFiles = this.newFiles.filter(item =>item.isSelected == true).map(item => item.name);
    requestedFiles = requestedFiles.map((file, index)=>{
      return {
          id: index + 1,
          name: file,
          isSelected: false
      };
    })
    this.clientID = this.getClientId();
    var requestedArray = {
      clientID : this.clientID,
      requestedFiles : requestedFiles
    };
    const requestedFileJson = JSON.stringify(requestedArray);
    console.log(requestedFileJson);

    this._clientService.requestNewFiles(requestedArray).subscribe((resultData: any) =>{
      if(resultData.status){
        alert("Files are requested");
      }else{
        alert(resultData.message);
      }
    });
  }

  getClientId(){
    var token = this._authService.getAccessToken();
    if(token){ 
      var payload = JSON.parse(window.atob(token.split('.')[1]));
      return payload.clientID;
    }
  }
  
}
