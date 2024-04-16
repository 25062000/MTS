import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators,AbstractControl, ValidationErrors, ValidatorFn, } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ ReactiveFormsModule,
     CommonModule,
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor( private formBuilder: FormBuilder){}


  registerForm!: FormGroup;
  submitted = false;

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

  // confirmPasswordValidator(): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     const password = this.registerForm.get('password')?.value;
  //     const confirmPassword = control.value;
      
  //     // Check if passwords match
  //     const passwordsMatch = password === confirmPassword;

  //     // If passwords don't match, return the error message
  //     return passwordsMatch ? null : { PasswordNoMatch: "error" };
  //   };
  // }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit(){
    
    this.submitted = true;

    if (this.registerForm.invalid){
      return 
    }


    console.log("On submit function is executed");
  }

  // ConfirmedValidator(){

  // }

 

}
