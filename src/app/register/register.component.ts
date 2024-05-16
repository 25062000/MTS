import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators,AbstractControl, ValidationErrors, ValidatorFn, } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClientService } from '../service/client.service';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ ReactiveFormsModule,
     CommonModule,
     NavbarComponent
    ],
    providers: [
      HttpClientModule
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor( private formBuilder: FormBuilder, private _clientService: ClientService, 
    private router: Router, private toastr: ToastrService){}


  registerForm!: FormGroup;
  submitted = false;
  name: string="";
  email: string="";
  password: string="";

  ngOnInit(){
  
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1),
        Validators.maxLength(60), Validators.pattern(/^[a-zA-Z ]*$/)
        ]],   
      email: ['', [Validators.required, Validators.pattern(/^\s*\S+@\S+\.\S+\s*$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      // confirmPassword: ['',[Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),]],
      terms: ['',[Validators.required]],
    
    }

  );
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit(){
    
    this.submitted = true;

    if (this.registerForm.invalid){
      return 
    }

    let clientDetails ={
      "name" : this.name,
      "email" : this.email,
      "password" : this.password
    }

    this._clientService.clientRegister(clientDetails).subscribe((resultData: any)=>{
      if(resultData.status){
        this.router.navigateByUrl('/client/dashboard');
      }else{
        this.toastr.error('Error Occured while registration');
      }
    })
  }
}
