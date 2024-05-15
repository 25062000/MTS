import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators,AbstractControl, ValidationErrors, ValidatorFn, } from '@angular/forms';
import { ClientService } from '../service/client.service';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { AdminService } from '../service/admin.service';
import { ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor( private formBuilder: FormBuilder, 
    private _clientService: ClientService, 
    private router: Router,
    private _adminService: AdminService,
    private toastr: ToastrService
  ){}

  submitted = false;
  email: string= "";
  password: string= "";
  route: string= "user";
  loginForm!: FormGroup;

  ngOnInit(){

    this.loginForm = this.formBuilder.group({
      
      email: ['', [Validators.required, Validators.pattern(/^\s*\S+@\S+\.\S+\s*$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],   
    }

  );
  }

  get f() {
    return this.loginForm.controls;
  }


  onSubmit(){

    this.submitted = true;
    
    if (this.loginForm.invalid){
      return
    }

    if (this.router.url.includes('/admin/login')) 
    {  
           this.route = "admin"; 
    }

    let clientDetails ={
      "email": this.email,
      "password": this.password
    }

    if (this.route == "user"){
      this._clientService.clientLogin(clientDetails).subscribe((resultData: any)=>{
        if(resultData.status){
          localStorage.setItem("accessToken", resultData.data.token);
          this.toastr.success('Logged In succesfully');
          this.router.navigateByUrl('/client/dashboard');
        }else{
          this.toastr.error('Invalid Credentials');
        }      
      })
    }else{
      this._adminService.adminLogin(clientDetails).subscribe((resultData: any)=>{
        if(resultData.status){
          localStorage.setItem("accessToken", resultData.data.accesToken);
          this.toastr.success('Logged In succesfully');
          this.router.navigateByUrl('/admin/dashboard');
        }else{
          this.toastr.error(resultData.message);
        }
        
      })
    }

  
  }
}
