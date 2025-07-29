import { ForgotService } from './../../../../core/services/forgot/forgot.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.css'
})
export class ForgotComponent {
  private readonly forgotService = inject(ForgotService);
  private readonly router = inject(Router);

  emailValue: string = "";
  step: number = 1;
  isLoading: boolean = false;
  errormsg: string = "";
  err: boolean = false;
  sccmsg: string = "";
  scc: boolean = false;

  forgotPassFrom: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  });

  verifyCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required])
  });

  resetPassForm: FormGroup = new FormGroup({
    email: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required])
  });

  forgetPassword() {
    if (this.forgotPassFrom.invalid) return;

    this.isLoading = true;
    this.clearMessages();

    this.forgotService.forgetPassword(this.forgotPassFrom.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        console.log(res)
        if (res.statusMsg === "success") {
          this.emailValue = this.forgotPassFrom.value.email;
          this.resetPassForm.patchValue({ email: this.emailValue });
          this.step = 2;
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.showError(err?.error?.message || "Something went wrong");
      }
    });
  }

  verifyResetCode() {
    if (this.verifyCodeForm.invalid) return;

    this.isLoading = true;
    this.clearMessages();

    this.forgotService.verifyResetCode(this.verifyCodeForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        console.log(res)
        if (res.status === "Success") {
          this.step = 3;
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.showError(err?.error?.message || "Something went wrong");
      }
    });
  }

  resetPassword() {
    if (this.resetPassForm.invalid) return;

    this.isLoading = true;
    this.clearMessages();

    const data = {
      email: this.emailValue,
      newPassword: this.resetPassForm.get('newPassword')?.value
    };

    this.forgotService.resetPassword(data).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.showSuccess("Password reset successfully");
        console.log(res)
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        this.isLoading = false;
        this.showError(err?.error?.message || "Something went wrong");
      }
    });
  }

  private showError(msg: string) {
    this.errormsg = msg;
    this.err = true;
    setTimeout(() => this.err = false, 3000);
  }

  private showSuccess(msg: string) {
    this.sccmsg = msg;
    this.scc = true;
    setTimeout(() => this.scc = false, 3000);
  }

  private clearMessages() {
    this.err = false;
    this.scc = false;
    this.errormsg = "";
    this.sccmsg = "";
  }
}
