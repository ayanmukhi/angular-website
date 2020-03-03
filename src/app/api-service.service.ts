import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from './../environments/environment';
import { loginResponse } from './classes/loginResponse'
import { getResponse } from "./classes/getresponse";
import * as jwt_decode from 'jwt-decode';
import { RegisterResponse } from './classes/registerResponse';
import { deleteResponse } from "./classes/deleteResponse";
import { activity } from './classes/getActivity';


@Injectable({
  providedIn: 'root'
})



export class ApiServiceService {
  token: any;
  sic:number;
  private res: number;
  headers = new HttpHeaders();
  
  constructor(private readonly httpclient: HttpClient) { }

  get(rawtoken): Observable <getResponse> {
    // const opts = {
    //   headers: new HttpHeaders({
    //     'Authorization': 'Bearer ' + rawtoken
    //   })
    // };
    this.token = JSON.parse(jwt_decode(rawtoken));
    this.sic = this.token.sic;
    return this.httpclient.get<getResponse>(environment.getapi + "/" + this.sic);
  }

  //function for admin to fetch a user detail
  getDetails(sic): Observable <getResponse> {
    return this.httpclient.get<getResponse>(environment.getapi + "/" + sic);
  }

  getadmin(rawtoken): Observable <getResponse> {
    // const opts = {
    //   headers: new HttpHeaders({
    //     'Authorization': 'Bearer ' + rawtoken
    //   })
    // };
    this.token = JSON.parse(jwt_decode(rawtoken));
    this.sic = this.token.sic;
    return this.httpclient.get<getResponse>(environment.getapi);
  }

  login(data): Observable <loginResponse>  {
    return this.httpclient.post<loginResponse>(environment.loginapi, data);
  }

  register(data): Observable <RegisterResponse> {
    return this.httpclient.post<RegisterResponse>(environment.registerapi, data);
  }

  delete(data): Observable <deleteResponse> {
    return this.httpclient.delete<deleteResponse>(environment.delapi + "/" + data);
  }
  
  postActivity(data) {
    return this.httpclient.post<any>(environment.postActapi, data);
  }

  getActivity(sic): Observable <activity> {
    return this.httpclient.get<activity>(environment.getActapi + "/" + sic);
  }

}
