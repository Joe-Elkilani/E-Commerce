import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../core/services/payment/payment.service';

@Component({
  selector: 'app-cheackout',
  imports: [ReactiveFormsModule],
  templateUrl: './cheackout.component.html',
  styleUrl: './cheackout.component.css'
})
export class CheackoutComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly paymentService = inject(PaymentService)
  private readonly formBuilder = inject(FormBuilder)
  isLoading:boolean = false;
  errormsg:string = "";
  err:boolean = false;
  sccmsg:string = "";
  scc:boolean = false;
  checkOut !:FormGroup;
  cartId:any;
  cartDatails:any;
  ngOnInit(): void {
    this.checkOut = this.formBuilder.group({
      details: [null, [Validators.required]],
      phone: [null, [Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
      city: [null, [Validators.required]],
    })
    this.activatedRoute.paramMap.subscribe({
      next:(res) => {
        this.cartId = res.get('id')
      },error:(err) => {
        console.log(err)
      }
    })
  }
  submitForm(): void {
    this.err = false;
    this.errormsg = '';
    this.scc = false;
    this.sccmsg = '';
    this.isLoading = true;
    if (this.checkOut.invalid) return;

    this.paymentService.checkOut(this.cartId, this.checkOut.value).subscribe({
      next: (res) => {
        console.log(res)
        this.isLoading = false;
        this.sccmsg = res.message;
        this.scc = true;
        if (res.status === "success") {
          window.open(res.session.url, "_self");
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.log(err)
        this.isLoading = false;
        console.log(err);
        this.errormsg = err.error.message;
        this.err = true;
      }
    });
  }
}
