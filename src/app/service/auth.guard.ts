import { Inject } from '@angular/core';
import { CanActivateFn , Router} from '@angular/router';
import { AuthService } from './auth.service';


export const authGuard: CanActivateFn = (route, state) => {

  const router = Inject(Router);
  const _authService = Inject(AuthService);

  var accessToken= _authService.getAccessToken();
  if(accessToken != null){
    return true;
  }else{
    router.navigateByUrl('/admin/login');
    return false;
  }

};
