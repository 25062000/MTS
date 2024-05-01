import { Component } from '@angular/core';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { NgxFileDropModule, NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { CommonModule } from '@angular/common';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AdminService } from '../../service/admin.service';
@Component({
  selector: 'app-chart-management',
  standalone: true,
  imports: [AdminNavbarComponent, NgxFileDropModule, CommonModule],
  templateUrl: './chart-management.component.html',
  styleUrl: './chart-management.component.css'
})
export class ChartManagementComponent {

  constructor( private _adminService: AdminService){}
  
  public files: NgxFileDropEntry[] = [];
  formData = new FormData();

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);
          this.formData.append('logo', file, droppedFile.relativePath);   
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public uploadFiles(){
    console.log(this.formData);
    this._adminService.uploadFiles(this.formData).subscribe((res:any) =>{
      if(res.status){
        console.log("Files uploaded successfully");
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
}
