import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("AuthInterceptor");
  const authToken = localStorage.getItem("accessToken");
  const authReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${authToken}`),
  });
  console.log(authReq.headers.get('Authorization')); 
  return next(authReq).pipe(
    catchError((error: any)=>{
      if(error instanceof HttpErrorResponse){
        if(error.status === 401){
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
