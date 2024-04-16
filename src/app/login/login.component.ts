import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators,AbstractControl, ValidationErrors, ValidatorFn, } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor( private formBuilder: FormBuilder){}

  submitted = false;
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
    console.log("hii")
  }
}
