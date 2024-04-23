import { Component } from '@angular/core';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { AdminService } from '../../service/admin.service';
import { response } from 'express';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [ AdminNavbarComponent, CommonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent{

  constructor( private _adminService: AdminService){}
  userDetails: any;

  ngOnIt(){

    this._adminService.getAllUserDetails().subscribe(res=>{
        console.log(res);
        this.userDetails = res;
        console.log(this.userDetails);
        console.log("Users details fetched successfully");
  })
  }

}
