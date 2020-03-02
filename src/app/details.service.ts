import { Injectable } from '@angular/core';
import { getResponse } from './classes/getresponse';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor() { }

  sic:number;
  stu_name: string;
  gender: string;
  father_name: string;
  mother_name: string;
  dob: string;
  matric_board: string;
  matric_roll: string;
  matric_perc: string;
  state: string;
  district: string;
  street_address: string;
  phone: number;
  email: number;
  password: string;
  status: string;
  hobby: []
  
  user:string;
  detailsUser() {
    this.user = JSON.stringify([
        {"sic":this.sic},
        {"stu_name":this.stu_name},
        {"gender":this.gender},
        {"father_name":this.father_name},
        {"mother_name":this.mother_name},
        {"dob":this.dob},
        {"matric_board":this.matric_board},
        {"matric_roll":this.matric_roll},
        {"matric_perc":this.matric_perc},
        {"state":this.state},
        {"district":this.district},
        {"street_address":this.street_address},
        {"phone":this.phone},
        {"email":this.email},
        {"password":this.password},
        {"status":this.status},
        {"hobby":this.hobby}
      ]);
    console.log(JSON.parse(this.user));
    return this.user;
  }
}
