import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class RoleGuardService {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('token');
    // decode the token to get its payload
    const tokenPayload = decode(token);
     //console.log(tokenPayload);
      //alert(tokenPayload);
      // alert(tokenPayload.scopes);
    if (!this.auth.isAuthenticated() || tokenPayload.scopes !== expectedRole) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }


}
