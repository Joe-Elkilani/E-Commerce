import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loasdingInterceptor: HttpInterceptorFn = (req, next) => {
  const ngxSpinnerService = inject(NgxSpinnerService)
  ngxSpinnerService.show()
  return next(req).pipe(finalize(()=>{
    ngxSpinnerService.hide()
  }));
};
