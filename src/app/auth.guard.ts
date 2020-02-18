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
      // this.user = JSON.parse(jwt_decode(localStorage.getItem('jwt'))); 
      // console.log("status"+this.user.data.status);
      // if( this.user.data.status == "A") {
      //   this.route.navigate(['/admin']);
      // }
      // else {
      //   this.route.navigate(['/profile']);
      // }
      return true;
    }
    this.route.navigate(['']);
    return false;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) : boolean {
      if( localStorage.getItem('token')) {
        return true;
      }
      return false;
    }
  
}
