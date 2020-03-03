import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';
import { getResponse } from '../classes/getresponse';
import { activity } from '../classes/getActivity';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  acts : String[];
  actDataFetched = false;
  newActivity:string;
  dataFetched = false;
  sic:number;
  token:any;
  userData:getResponse;
  constructor(private _apiservice: ApiServiceService, private route:Router ) { }


  ngOnInit() {
    this._apiservice.get(localStorage.getItem('jwt'))
    .subscribe(
      data => this.saveData(data),
      error => error
    );

    this.getAcitivities();
    
  }

  getAcitivities() {
    let token = JSON.parse(jwt_decode(localStorage.getItem('jwt')));
    let sic = token.sic;
    this._apiservice.getActivity(sic)
    .subscribe(
      data => this.saveActData(data),
      error => error
    );
  }

  saveData(data) {
    this.dataFetched = true;
    this.userData = data;
    console.log(this.userData.data.sic);
  }

  addActivity(sic, act) {
    let data = 
      {
        'sic': sic,
        'activity': act
      };
    console.log("act : " + data.sic);
    this._apiservice.postActivity(data)
    .subscribe(
      data => console.log(data),
      error => console.log(error)
    );
  }

  saveActData(response) {
    this.actDataFetched = true;
    this.acts = response.data;
    console.log(this.acts);
    this.getAcitivities();
    
  }

}
