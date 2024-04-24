import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(){}

  getAccessToken(){
    var token = localStorage.getItem("accessToken");
    return token;
  }

}
