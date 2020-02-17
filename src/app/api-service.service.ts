import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private httpclient: HttpClient) { }

  login(data): Observable<any> {
    return this.httpclient.post<any>("http://schoolserver/php/slim/profile/index.php/api/v1/login", data);
  }
}
