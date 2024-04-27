import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn , Router, RouterStateSnapshot} from '@angular/router';
import { AuthService } from './auth.service';


export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

  const router = inject(Router);

  if(inject(AuthService).isLoggedIn()){
    if(!inject(AuthService).isAdmin()){
      return true;
    }else{
      router.navigateByUrl('/login');
      return false;
    }
  }else{
    router.navigateByUrl('/login');
    return false;
  }

};

export const adminGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  console.log("adminguard works");
  const router = inject(Router);

  if(inject(AuthService).isLoggedIn()){
    if(inject(AuthService).isAdmin()){
      return true;
    }else{
      router.navigateByUrl('admin/login');
      return false;
    }
  }else{
    router.navigateByUrl('admin/login');
    return false;
  }

};
