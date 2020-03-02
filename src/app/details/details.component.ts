import { Component, OnInit } from '@angular/core';
import { getResponse } from "../classes/getresponse";
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  dataFetched = false;
  sic:number;
  token:any;
  url : string;
  userData:getResponse;
  constructor(private _apiservice: ApiServiceService, private route:Router ) { }


  ngOnInit() {
    this.url = this.route.url;
    console.log(Number(this.url.slice(9)));
    this._apiservice.getDetails(Number(this.url.slice(9)))
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
