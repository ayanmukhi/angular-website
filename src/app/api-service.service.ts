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
import { activityDelete } from './classes/activityDeleteResponse';
import { putResponse } from './classes/putResponse';


@Injectable({
  providedIn: 'root'
})



export class ApiServiceService {
  token: any;
  sic:number;
  private res: number;
  headers = new HttpHeaders();
  
  constructor(private readonly httpclient: HttpClient) { }


  //get the details of a student
  get(rawtoken): Observable <getResponse> {
    this.token = JSON.parse(jwt_decode(rawtoken));
    this.sic = this.token.sic;
    return this.httpclient.get<getResponse>(environment.baseUrl + "/" + this.sic);
  }

  
  //function for admin to fetch a user detail
  getDetails(sic): Observable <getResponse> {
    return this.httpclient.get<getResponse>(environment.baseUrl + "/" + sic);
  }


  //function to make a get request for admin
  getadmin(rawtoken): Observable <getResponse> {
    this.token = JSON.parse(jwt_decode(rawtoken));
    this.sic = this.token.sic;
    return this.httpclient.get<getResponse>(environment.baseUrl);
  }


  //function to make request for logging in a user
  login(data): Observable <loginResponse>  {
    return this.httpclient.post<loginResponse>(environment.loginapi, data);
  }


  //function to make request for sign up a new user
  register(data): Observable <RegisterResponse> {
    return this.httpclient.post<RegisterResponse>(environment.baseUrl, data);
  }


  //function to make request for deleting a student
  delete(data): Observable <deleteResponse> {
    return this.httpclient.delete<deleteResponse>(environment.baseUrl + "/" + data);
  }
  

  //function to make request inserting new activity
  postActivity(data) {
    return this.httpclient.post<any>(environment.actBaseUrl, data);
  }


  //function to make request to get all activities of a user
  getActivity(sic): Observable <activity> {
    return this.httpclient.get<activity>(environment.actBaseUrl + "/" + sic);
  }


  //function to make request for deleting a activity
  deleteActivity(id) {
    return this.httpclient.delete<activityDelete>(environment.actBaseUrl + "/" + id);
  }


  //function to make request for updating a student details
  update(data) {
    return this.httpclient.put<putResponse>(environment.baseUrl, data);
  }

}
