import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor( private _http: HttpClient) { }

  baseUrl ="http://localhost:3000/client/";

  clientRegister(clientDetails: any){
    return this._http.post(this.baseUrl+'register',  clientDetails);
  }

  clientLogin(clientDetails: any){
    return this._http.post(this.baseUrl+'login', clientDetails);
  }
}
