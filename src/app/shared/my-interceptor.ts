import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as jwt_decode from 'jwt-decode';
import {HttpRequest,HttpHeaders, HttpHandler, HttpEvent, HttpInterceptor} from "@angular/common/http";
  
  
  @Injectable(
   
  )
  export class MyInterceptor implements HttpInterceptor {
    
    constructor() {
     }

    
    rawtoken : string;
    //function which will be called for all http calls
    intercept(
      request: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
            this.rawtoken = localStorage.getItem('jwt');
            const headers = new HttpHeaders({
                'Authorization': 'Bearer '+ this.rawtoken,
                'Content-Type': 'application/json'
            });
            
            // if( this.rawtoken != null) {
            //   let token = JSON.parse(jwt_decode(this.rawtoken));
            //     console.log("interceptor : " + token.sic);
            // } 
            const cloneReq = request.clone({headers});
            //console.log("Before making api call : ", headers);
            return next.handle(cloneReq);
    }

    
}