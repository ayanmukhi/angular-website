import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import {HttpRequest,HttpHeaders, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from "@angular/common/http";
  
  
  @Injectable()
  export class MyInterceptor implements HttpInterceptor {

    constructor() { }

    rawtoken = localStorage.getItem('jwt');

    //function which will be called for all http calls
    intercept(
      request: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
            const headers = new HttpHeaders({
                'Authorization': 'Bearer '+ this.rawtoken,
                'Content-Type': 'application/json'
            });
            const cloneReq = request.clone({headers});
            console.log("Before making api call : ", headers);
            return next.handle(cloneReq);
    }
}
  