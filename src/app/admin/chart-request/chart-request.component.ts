import { Component } from '@angular/core';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { AdminService } from '../../service/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chart-request',
  standalone: true,
  imports: [AdminNavbarComponent, CommonModule, FormsModule],
  templateUrl: './chart-request.component.html',
  styleUrl: './chart-request.component.css'
})
export class ChartRequestComponent {
    constructor(private _adminService: AdminService){}

    requestFileDetails: any;
   
    ngOnInit(){
      this.getAllRequestedFiles()
    }

    getAllRequestedFiles(){
      this._adminService.getAllRequestedFiles().subscribe((res)=>{
        if(res.status){
          this.requestFileDetails = res.data;
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
      console.log("Request on accpt",requestedFile);
      var requestedArray = {
        clientID : clientID,
        requestedFiles : requestedFile
      };
      console.log("RequestedArray",requestedArray);
      this._adminService.acceptFiles(requestedArray).subscribe((res: any)=>{
        if(res.status){
          alert("Files are accepeted");
        }else{
          alert(res.message);
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
      console.log(requestedFile);
      var requestedArray = {
        clientID : clientID,
        requestedFiles : requestedFile
      };
      console.log(requestedArray);
      // this._adminService.rejectFiles(requestedArray).subscribe((res: any)=>{
      //   if(res.status){
      //     alert("Files are rejected");
      //   }else{
      //     alert(res.message);
      //   }
      // })
      }catch(error){
        console.log("Error:",error);
      }
    }
}
