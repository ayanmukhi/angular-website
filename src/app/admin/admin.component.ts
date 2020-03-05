
import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';
import { getallResponse } from '../classes/getallresponse';
import { error } from 'protractor';
import { DetailsService } from '../details.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  dataFetched = false;
  sic:number;
  token:any;
  Data:getallResponse;
  records:[{}];
  constructor(private _apiservice: ApiServiceService, private route:Router, private _details: DetailsService) { }

  
  ngOnInit() {
    console.log("in admin ogINIT");
    this._apiservice.getadmin(localStorage.getItem('jwt'))
    .subscribe(
      data => this.saveData(data),
      error => error
    );
  }

  details(userDetails) {
    this.route.navigate(['/details/' + userDetails.sic]);
  }


  saveData(data) {
    this.dataFetched = true;
    this.Data = data;
    this.records = this.Data.data;
  }

  delete(id) {
    console.log(id);
    this._apiservice.delete(id)
    .subscribe(
      data => this.deleteRecord(data),
      error => this.deleteError(error)
    );
  }
  deleteError(error) {
    console.log(error);
  }

  deleteRecord(data) {
    this._apiservice.getadmin(localStorage.getItem('jwt'))
    .subscribe(
      data => this.saveData(data),
      error => error
    );
  }

}
