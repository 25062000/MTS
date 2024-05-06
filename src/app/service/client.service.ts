import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  getEncFiles(clientID: any):Observable<any>{
    return this._http.post(this.baseUrl+'getEncFiles', clientID);
  }

  requestNewFiles(requestedFiles: any){
    return this._http.post(this.baseUrl+'requestFiles', requestedFiles);
  }

  getPermittedFiles(clientID: any){
    return this._http.post(this.baseUrl+'getPermittedFiles', clientID);
  }
}
