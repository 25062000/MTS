import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { ClientService } from '../../service/client.service';

@Component({
  selector: 'app-client-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './client-navbar.component.html',
  styleUrl: './client-navbar.component.css'
})
export class ClientNavbarComponent {
  constructor(private _authService: AuthService, private _clientService:ClientService, private router: Router){}

  clientDetail:any;

  ngOnInit(){
    var clientID = this._authService.getClientId();
    clientID ={
      clientID : clientID
    }
    this._clientService.getClientDetails(clientID).subscribe((result)=>{
      this.clientDetail = result.data.name;
    })
  }

  onSignOut(){
    if(confirm("Are you want to logout?")){
      localStorage.setItem("accessToken", "");
      this.router.navigateByUrl("/");
    }
  }

}
