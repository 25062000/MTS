import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs'; 
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import * as mapboxgl from 'mapbox-gl';
import { ClientService } from '../../service/client.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { ClientNavbarComponent } from '../client-navbar/client-navbar.component';
import { IGX_COMBO_DIRECTIVES, IgxComboComponent } from 'igniteui-angular';

@Component({
  selector: 'app-view-chart',
  standalone: true,
  imports: [ MatTabsModule, CommonModule, MatCheckboxModule, 
    FormsModule, ClientNavbarComponent, IGX_COMBO_DIRECTIVES],
  templateUrl: './view-chart.component.html',
  styleUrl: './view-chart.component.css'
})
export class ViewChartComponent {

  @ViewChild('withValueKey', {read: IgxComboComponent, static: true})
  public comboValue!: IgxComboComponent;

  constructor(private _clientService: ClientService, private _authService: AuthService){}

  map: mapboxgl.Map | undefined;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat: number = 30.2672;
  lng: number = -97.7431;
  accessToken = 'pk.eyJ1Ijoic2l2YWVjZXNpcyIsImEiOiJjbG9oMDBtdDgxMzUwMmtvMWk3cTJ2NXRzIn0.CgekuJWjQEjcgrVXgApkug';

  isChartBtnClicked: boolean = false;
  newFiles: any[] =[];
  showRequest: boolean = false;
  showRequest2: boolean = false;
  clientID: any; 
  permittedFiles: any[] = [];

  // Combo box
  public mapSources: { name: string, id: string }[] = [];

  ngOnInit() { 
      this.loadNewFiles();
      this.loadPermittedFiles();
      this.mapSources = [{ name: 'BLACKBACK', id: 'SeaChart_DAY_BLACKBACK' },
       { name: 'BRIGHT', id: 'SeaChart_DAY_BRIGHT'},
       { name: 'WHITEBACK', id: 'SeaChart_DAY_WHITEBACK'},
       { name: 'DUSK', id:'SeaChart_DUSK'},
       { name: 'NIGHT', id:'SeaChart_NIGHT'}];
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

  // Loading new files
  loadNewFiles(){
    var clientID =this.getClientId();
    clientID ={
      clientID : clientID
    }
    this._clientService.getEncFiles(clientID).subscribe((res: any)=>{
      if(res.status){
        this.newFiles = res.data;
        this.newFiles = this.newFiles.map((file, index)=>{
          return {
              id: index + 1,
              name: file,
              isSelected: false
          };
        })
      }else{
        console.log(res.message);
      }
    })
  }

  // Loading permitted files
  loadPermittedFiles(){
    var clientID =this.getClientId();
    clientID ={
      clientID : clientID
    }
    this._clientService.getPermittedFiles(clientID).subscribe((res: any)=>{
      if(res.status){
        this.permittedFiles = res.data;
        this.permittedFiles = this.permittedFiles.map((file, index)=>{
          return {
              id: index + 1,
              name: file,
              isSelected: false
          };
        })
      }else{
        console.log(res.message);
      }
    })
  }

  // On Change in new files section
  onChange(whichFile:string){
    var anyChecked = this.newFiles.some((file: any) => file.isSelected);
    const fileDiv = document.querySelector('.'+ whichFile);
    if(anyChecked){
      this.showRequest = true;
      fileDiv?.classList.add('extendHeight'); 
    }else{
      this.showRequest = false;
      fileDiv?.classList.remove('extendHeight'); 
    }
  }

  // On change in permitted files
  onPermitChange(whichFile: string){
    var anyChecked = this.permittedFiles.some((file: any) => file.isSelected);
    const fileDiv = document.querySelector('.'+ whichFile);
    if(anyChecked){
      this.showRequest2 = true;
      fileDiv?.classList.add('extendHeight'); 
    }else{
      this.showRequest2 = false;
      fileDiv?.classList.remove('extendHeight'); 
    }
  }

  // Request button in new files
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

    this._clientService.requestNewFiles(requestedArray).subscribe((resultData: any) =>{
      if(resultData.status){
        alert("Files are requested");
      }else{
        alert(resultData.message);
      }
    });
  }

  // Get client ID
  getClientId(){
    var token = this._authService.getAccessToken();
    if(token){ 
      var payload = JSON.parse(window.atob(token.split('.')[1]));
      return payload.clientID;
    }
  }


  onSelectSource(){
    console.log("clicked");
    alert("Select source function called");
    // if(this.comboValue){
      console.log(this.comboValue.value);
    // }
  }
  
}
