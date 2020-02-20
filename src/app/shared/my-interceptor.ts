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
        // const updatedRequest = request.clone({
        //     headers: request.headers.set("Authorization", 'Bearer ' + this.rawtoken)
        
        // });
        //logging the updated Parameters to browser's console
        
        // return next.handle(request).pipe(
        //     tap(
        //     event => {
        //         //logging the http response to browser's console in case of a success
        //         if (event instanceof HttpResponse) {
        //         console.log("api call success :", event);
        //         }
        //     },
        //     error => {
        //         //logging the http response to browser's console in case of a failuer
        //         if (event instanceof HttpResponse) {
        //         console.log("api call error :", event);
        //         }
        //     }
        // )
        //);
    }
}
  