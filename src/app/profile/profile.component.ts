import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';
import { getResponse } from '../classes/getresponse';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

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
  }

  saveData(data) {
    this.dataFetched = true;
    this.userData = data;
    console.log(this.userData.data.sic);
  }

}
