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
 
  isLoggedIn(){
    var token = this.getAccessToken();
    return token!= null? true: false;
  }

  isAdmin(){
    var token = this.getAccessToken();
    if(token){ 
    var payload = JSON.parse(window.atob(token.split('.')[1]));
    payload = payload.role;
    if( payload === "admin"){
      return true;
    }else{
      return false;
    }
    }
    return false;
  }
}
