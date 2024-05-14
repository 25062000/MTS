import { Component } from '@angular/core';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { NgxFileDropModule, NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { CommonModule } from '@angular/common';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AdminService } from '../../service/admin.service';
import { ClientService } from '../../service/client.service';
@Component({
  selector: 'app-chart-management',
  standalone: true,
  imports: [AdminNavbarComponent, NgxFileDropModule, CommonModule],
  templateUrl: './chart-management.component.html',
  styleUrl: './chart-management.component.css'
})
export class ChartManagementComponent {

  constructor( private _adminService: AdminService){}

  ngOnInit(){
    this.getENCFiles();
  }
  
  public files: NgxFileDropEntry[] = [];
  formData = new FormData();
  hasItem: boolean = false;
  uploadedFiles: any;

  public dropped(files: NgxFileDropEntry[]) {
    this.hasItem= true;
    this.files = files;
    for (const droppedFile of files) {

      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          console.log(droppedFile.relativePath, file);
          this.formData.append('logo', file, droppedFile.relativePath);   
        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public uploadFiles(){
    console.log(this.formData);
    this._adminService.uploadFiles(this.formData).subscribe((res:any) =>{
      if(res.status){
        alert("Files uploaded successfully");
        window.location.reload();
      }else{
        console.log("Can't upload files");
      }
    });
  }

  public fileOver(event: CdkDragDrop<Event>){
    console.log(event);
  }

  public fileLeave(event: CdkDragDrop<Event>){
    console.log(event);
  }

  getENCFiles(){
    this._adminService.getUploadedFiles().subscribe((results)=>{
      if(results.status){
        this.uploadedFiles = results.data;
        console.log(results.data)
      }else{
        console.log(results.message)
      }
    })
  }
}
