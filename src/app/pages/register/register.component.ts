import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { UserService } from '../../core/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private readonly userService = inject(UserService)
  private readonly router = inject(Router)
  isLoading:boolean = false;
  errormsg:string = "";
  err:boolean = false;
  sccmsg:string = "";
  scc:boolean = false;

  registerForm : FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required,Validators.email]),
    password: new FormControl(null, [Validators.required,Validators.pattern(/^[A-Z][a-zA-Z0-9]{5,}$/)]),
    rePassword: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
  },{validators:this.confirmPassword})

  confirmPassword(group:AbstractControl) {
    const pass = group.get("password")?.value;
    const repass = group.get("rePassword")?.value;
    if(pass === repass) {
      return null;
    }else {
      return {misMatch:true};
    }
  }

  submitForm(): void {
    this.err = false;
    this.errormsg = '';
    this.scc = false;
    this.sccmsg = '';
    this.isLoading = true;

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.isLoading = false;
      return;
    }

    this.userService.signUp(this.registerForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.sccmsg = res.message;
        this.scc = true;
        setTimeout(() => {
          this.router.navigate(['/login'])
        }, 2000);
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
        this.errormsg = err.error.message || 'An error occurred';
        this.err = true;
      }
    });
  }
}
