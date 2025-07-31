import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);

  // فقط نفذ الكود في المتصفح
  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('token');
    console.log('TOKEN SENT FROM INTERCEPTOR:', token);

    if (token && (req.url.includes('cart') || req.url.includes('orders'))) {
      req = req.clone({
        setHeaders: {
          token
        }
      });
    }
  }

  return next(req);
};
