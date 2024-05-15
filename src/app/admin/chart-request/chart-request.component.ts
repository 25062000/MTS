import { Component } from '@angular/core';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { AdminService } from '../../service/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chart-request',
  standalone: true,
  imports: [AdminNavbarComponent, CommonModule, FormsModule],
  templateUrl: './chart-request.component.html',
  styleUrl: './chart-request.component.css'
})
export class ChartRequestComponent {
    constructor(private _adminService: AdminService, private toastr: ToastrService){}

    requestFileDetails: any;
    // showTable: boolean= false;
   
    ngOnInit(){
      this.getAllRequestedFiles()
    }

    getAllRequestedFiles(){
      this._adminService.getAllRequestedFiles().subscribe((res)=>{
        if(res.status){
          this.requestFileDetails = res.data;
          console.log(this.requestFileDetails);
          this.requestFileDetails =  this.requestFileDetails.filter((item: any)=> item.requestedFiles.length >0);
        }else{
          console.log("Can't get files");
        }
      })
    }

    onAccept(i: any){
      try{
      var requestedFile = this.requestFileDetails[i].requestedFiles;
      var clientID = this.requestFileDetails[i].clientID;
      requestedFile = requestedFile.filter((item: any)=>item.isSelected == true).map((item: any) => item.name);
      var requestedArray = {
        clientID : clientID,
        requestedFiles : requestedFile
      };
      this._adminService.acceptFiles(requestedArray).subscribe((res: any)=>{
        if(res.status){
          this.toastr.success("Files are accepeted");
          location.reload();
        }else{
          console.log(res.message);
        }
      })
      }catch(error){
        console.log("Error:",error);
      }
    }

    onReject(i: any){
      try{
      var requestedFile = this.requestFileDetails[i].requestedFiles;
      var clientID = this.requestFileDetails[i].clientID;
      requestedFile = requestedFile.filter((item: any)=>item.isSelected == true).map((item: any) => item.name);
      var requestedArray = {
        clientID : clientID,
        requestedFiles : requestedFile
      };
      this._adminService.rejectFiles(requestedArray).subscribe((res: any)=>{
        if(res.status){
          this.toastr.success("Files are rejected");
          location.reload();
        }else{
          console.log(res.message);
        }
      })
      }catch(error){
        console.log("Error:",error);
      }
    }
}
