import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';
import { getResponse } from '../classes/getresponse';
import * as jwt_decode from 'jwt-decode';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { DetailsService } from '../details.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  faCoffee = faUserEdit;
  acts : String[];
  actDataFetched = false;
  newActivity:string;
  dataFetched = false;
  sic:number;
  token:any;
  userData:getResponse;
  constructor(private _apiservice: ApiServiceService, private route:Router, private _details: DetailsService ) { }


  ngOnInit() {
    let token:any = localStorage.getItem('jwt');
    if( token != null) {
      let rawtoken = JSON.parse(jwt_decode(token));
        console.log("profile : " + rawtoken.sic);
    }
    
    this._apiservice.get(localStorage.getItem('jwt'))
    .subscribe(
      data => this.saveData(data),
      error => error
    );
    this.getAcitivities();
  }

  //get all the activities of a student
  getAcitivities() {
    let token = JSON.parse(jwt_decode(localStorage.getItem('jwt')));
    let sic = token.sic;
    this._apiservice.getActivity(sic)
    .subscribe(
      data => this.saveActData(data),
      error => error
    );
  }


  //save all data
  saveData(data) {
    this.dataFetched = true;
    this.userData = data;
    console.log(this.userData.data.sic);
  }

  //function to add the new activity to DB
  addActivity(sic, act) {
    let data = 
      {
        'sic': sic,
        'activity': act
      };
    console.log("act : " + data.sic);
    this._apiservice.postActivity(data)
    .subscribe(
      data => {
        this.getAcitivities();
      },
      error => console.log(error)
    );
    
  }


  //save the successful response of add activity operation
  saveActData(response) {
    this.actDataFetched = true;
    this.acts = response.data;   
  }


  deleteAct(id) {
    console.log("hey : " + id);
    this._apiservice.deleteActivity(id)
    .subscribe(
      data => {
        this.getAcitivities();
      },
      error => console.log(error)
    );
  }
}
