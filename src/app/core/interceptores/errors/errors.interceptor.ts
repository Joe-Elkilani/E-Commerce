import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap, throwError } from 'rxjs';

interface ApiResponse {
  message?: string;
  [key: string]: any;
}

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const toastrService = inject(ToastrService);

  return next(req).pipe(
    tap((res) => {
      if (res instanceof HttpResponse) {
        const body = res.body as ApiResponse;
        const message = body?.message;
        if (message) {
          toastrService.success(message, 'Fresh Cart🛒', { progressBar: true });
        }
      }
    }),
    catchError((err) => {
      const errorMessage = err.error?.message;
      toastrService.error(errorMessage, 'Fresh Cart🛒', { progressBar: true });
      return throwError(() => err);
    })
  );
};
