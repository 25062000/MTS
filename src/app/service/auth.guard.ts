import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn , Router, RouterStateSnapshot} from '@angular/router';
import { AuthService } from './auth.service';


export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

  const router = inject(Router);

  if(inject(AuthService).isLoggedIn()){
    return true;
  }else{
    router.navigateByUrl('/login');
    return false;
  }

};
