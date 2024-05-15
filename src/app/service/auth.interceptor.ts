import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);
  const authToken = inject(AuthService).getAccessToken();
  const authReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${authToken}`),
  });
  return next(authReq).pipe(
    catchError((error: any)=>{
      if(error instanceof HttpErrorResponse){
        if(error.status === 401 || error.status === 403){
          router.navigateByUrl('/login');
          console.error('Unauthorized error', error)
        } else{
          console.error('HTTP errors', error);
        }
      }else{
        console.log("An error occured:", error)
      }
      return throwError(() => error)
    })
  );
};
