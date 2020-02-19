
import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';
import { getResponse } from '../classes/getresponse';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  sic:number;
  token:any;
  userData:getResponse[];
  constructor(private _apiservice: ApiServiceService, private route:Router ) { }

  
  ngOnInit() {
    this._apiservice.get(localStorage.getItem('jwt'))
    .subscribe(
      data => this.saveData(data),
      error => error
    );
  }

  saveData(data) {
    this.userData = data;
    console.log(this.userData[0].result.sic);
  }

}
