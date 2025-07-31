import { Component, inject } from '@angular/core';
import { CheckOutService } from '../../core/services/check-out.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  private readonly checkoutService = inject(CheckOutService)
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
  }
}
