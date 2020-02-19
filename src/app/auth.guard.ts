import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  token: JSON;
  rawtoken:string;
  user:{
    'success':string,
    'data': {
      'status':string,
      'sic':number
    },
    'token':string
    
  };
  constructor(private route: Router){}

  resolve(route: ActivatedRouteSnapshot){
    if( localStorage.getItem("jwt") ) {
      return true;
    }
    this.route.navigate(['']);
    return false;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      if( localStorage.getItem('jwt')) {
        this.route.navigate(['/profile']);
        return false;
      }
      
      return true;
    }
  
}
