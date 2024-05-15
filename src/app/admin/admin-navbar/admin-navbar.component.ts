import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { accessToken } from 'mapbox-gl';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent {

  constructor(private router:Router){}

  onLogOut(){
   if(confirm('Are you sure to logout>')){
    localStorage.setItem("accessToken","");
    this.router.navigateByUrl('/admin/login');
   }
  }
}
