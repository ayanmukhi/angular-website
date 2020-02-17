import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public district = [
    {name: "---", value: "NONE"}
  ];
  constructor() { }

  ngOnInit() {
  }

  changeDistrict(state) {
    switch(state) {
        case "NONE" : {
          this.district = [
            {name:"---", value:"NONE"}
          ];
          break;
        }
        case "WEST BENGAL":{
          this.district = [
            {name: "Please select the district", value: "NONE"},
            {name: "Alipurduar", value: "Alipurduar"},
            {name: "Bankura", value: "Bankura"},
            {name: "Birbhum", value: "Birbhum"}
          ];
          break;
        }
        case "GUJRAT":{
          this.district = [
            {name: "Please select the district", value: "NONE"},
            {name: "Alipurduar", value: "Alipurduar"},
            {name: "Amreli", value: "Amreli"}
          ];
          break;
        }
        case "ODISHA":{
          this.district = [
            {name: "Please select the district", value: "NONE"},
            {name: "Angul", value: "Angul"},
            {name: "Balangir", value: "Balangir"},
            {name: "Ganjam", value: "Ganjam"},
            {name: "Khordha", value: "Khordha"}
          ];
          break;
        }
        case "GOA":{
          this.district = [
            {name: "Please select the district", value: "NONE"},
            {name: "North Goa", value: "North Goa"},
            {name: "South Goa", value: "South Goa"}
          ];
          break;
        }
        
    }
  }
}
