import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { UserService } from '../../core/services/user/user.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-log-in',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  private readonly userService = inject(UserService)
  private readonly router = inject(Router)
  isLoading:boolean = false;
  errormsg:string = "";
  err:boolean = false;
  sccmsg:string = "";
  scc:boolean = false;

  logInForm : FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  })

  submitForm(): void {
    this.err = false;
    this.errormsg = '';
    this.scc = false;
    this.sccmsg = '';
    this.isLoading = true;

    if (this.logInForm.invalid) {
      this.logInForm.markAllAsTouched();
      this.isLoading = false;
      return;
    }

    this.userService.signIn(this.logInForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.sccmsg = res.message;
        this.scc = true;
        localStorage.setItem("token",res.token)
        this.userService.getUserToken()
        setTimeout(() => {
          this.router.navigate(['/home'])
        }, 2000);
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
        this.errormsg = err.error.message;
        this.err = true;
      }
    });
  }
}
