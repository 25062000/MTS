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
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-chart',
  standalone: true,
  imports: [ MatTabsModule, CommonModule, MatCheckboxModule, 
    FormsModule, ClientNavbarComponent, IGX_COMBO_DIRECTIVES],
  templateUrl: './view-chart.component.html',
  styleUrl: './view-chart.component.css'
})
export class ViewChartComponent{

  @ViewChild('combo', { read: IgxComboComponent, static: false })
  public comboValue!: IgxComboComponent | undefined;


  constructor(private _clientService: ClientService, private _authService: AuthService, private toastr: ToastrService){}

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
  sourceKey: any;
  layerKey: any;

  // Combo box
  public mapSources: { name: string, id: string }[] = [];
  public selectedStyles: string[] = ['SeaChart_DAY_BLACKBACK'];

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
        center: [this.lng, this.lat],
        // transformRequest:(url, resourceType) =>{
        //   return {
        //     url: url,
        //     headers: {
        //         'Access-Control-Allow-Origin': '*'
        //    }
        //   };
        // }
      }); 

      this.defaultStyle();

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
      fileDiv?.classList.add('extendHeight2'); 
    }else{
      this.showRequest2 = false;
      fileDiv?.classList.remove('extendHeight2'); 
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
        this.toastr.success(resultData.message);
      }else{
        this.toastr.error(resultData.message);
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


  onSelectSource() {
    if (this.comboValue) {
      // var sources = this.comboValue.selection;
      // console.log(sources); 
      this._clientService.getMapSource(this.comboValue.selection[0]).subscribe((res: any)=>{
        const sources = res.sources;
        const layers = res.layers;
        if(this.map) {
          layers.forEach((layer: any) => {
            if (this.map?.getLayer(layer.id)) {
              this.map.removeLayer(layer.id);
            }
          })
          Object.keys(sources).forEach((sourceKey) => {
            if (this.map?.getSource(sourceKey)){
              this.map?.removeSource(sourceKey);
            }
           
            this.map?.addSource(sourceKey, sources[sourceKey]);
          });
          layers.forEach((layer: any) => {this.map?.addLayer(layer)})
        }else{
          console.log(res.message);
        }
      })
    } else {
      console.error("Combo component not initialized.");
    }
  }

  removeENC(){
    var requestedFiles = this.permittedFiles.filter(item =>item.isSelected == true).map(item => item.name);
    var requestedArray = {
      requestedFiles : requestedFiles
    };
    console.log("remove file", requestedArray);
    this._clientService.removeENCFiles(requestedArray).subscribe((resultData: any) =>{
      if(resultData.status){
        this.toastr.success('Files are removed');
      }else{
        this.toastr.error('Try again');
        console.log(resultData.message);
      }
    });
  }

  defaultStyle() {
      var sources={ name: 'BLACKBACK', id: 'SeaChart_DAY_BLACKBACK' }
      this._clientService.getMapSource(sources).subscribe((res: any)=>{

        const sources = res.sources;
        const layers = res.layers;

        if(this.map) {
          this.map.on('load', () => {
            if(this.map) {
              layers.forEach((layer: any) => {
                if (this.map?.getLayer(layer.id)) {
                  this.map.removeLayer(layer.id);
                }
              })
              Object.keys(sources).forEach((sourceKey: string) => {
                if (this.map?.getSource(sourceKey)){
                  this.map?.removeSource(sourceKey);
                }
                this.map?.addSource(sourceKey, sources[sourceKey]);
              });
              layers.forEach((layer: any) => {
                this.map?.addLayer(layer);
              });
            }
          });
        } else {
          console.log(res.message);
        }
      });
  }
  
}
