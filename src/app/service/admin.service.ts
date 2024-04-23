import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _http: HttpClient) { }

  baseUrl ="http://localhost:3000/admin/";


  adminLogin(adminDetails: any){
    return this._http.post(this.baseUrl+'login', adminDetails);
  }

  getAllUserDetails():Observable<any>{
    return this._http.get(this.baseUrl+ 'allUser');
  }

}