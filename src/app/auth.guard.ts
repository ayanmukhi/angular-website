import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { jwtDeocde } from "./shared/jwt-decode";

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
    var currRoute = route.url.toString();
    console.log("auth " + currRoute);

    if( localStorage.getItem("jwt") ) {
      var token = JSON.parse(jwtDeocde(localStorage.getItem('jwt')));
        console.log(token.status);
        if( token.status == "A"  && (currRoute != 'admin' || ( /^details\/([0-9])*$/.test(currRoute)))) {
          this.route.navigate(['/admin']);
          return true;
        }
        if(token.status == ""  && currRoute != 'profile') {
          this.route.navigate(['/profile']);
          return false;
        }  
      return false;
    }
    this.route.navigate(['']);
    return true;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      if( localStorage.getItem('jwt')) {
        var token = JSON.parse(jwtDeocde(localStorage.getItem('jwt')));
        console.log(token.status);
        if( token.status == "A") {
          this.route.navigate(['/admin']);
          return true;
        }
        else {
          this.route.navigate(['/profile']);
          return false;
        }  
      }
      return true;
    }
  
}
