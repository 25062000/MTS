import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { ClientNavbarComponent } from '../client-navbar/client-navbar.component';

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [ NavbarComponent, ClientNavbarComponent],
  templateUrl: './client-dashboard.component.html',
  styleUrl: './client-dashboard.component.css'
})
export class ClientDashboardComponent {

}
