import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { passwordValidator, nameFirstValidator, rolValidator, percValidator, emailValidator, phoneValidator } from '../shared/form-validators';
import { ApiServiceService } from "../api-service.service";
import { Router } from '@angular/router';
import { RegisterResponse } from "../classes/registerResponse";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  selectedhobby = [];
  hobbyArr = [
    {
      "key":"football",
      "value":"football"
    },
    {
      "key":"cricket",
      "value":"cricket"
    },
    {
      "key":"other",
      "value":"other"
    }
  ];
  public district = [
    {name: "---", value: "NONE"}
  ];
  public credentialsMatch = "";
  userData : RegisterResponse;

  constructor( private fb: FormBuilder, private _apiservice: ApiServiceService, private route: Router) { }


  changeHobby(event) {
    let index = this.selectedhobby.indexOf(event.target.value); 
    if( index== -1) {
      this.selectedhobby.push(event.target.value);
    }
    else {
      this.selectedhobby.splice(index, 1);
    }
    console.log(this.selectedhobby);
  }

  registerForm = this.fb.group({
    nameFirst: ['', [Validators.required, nameFirstValidator]],
    nameSecond: ['', [nameFirstValidator]],
    nameThird: ['', [Validators.required, nameFirstValidator]],
    fatherName: ['', [nameFirstValidator]],
    motherName: ['', [nameFirstValidator]],
    dob: [''],
    gender: [''],
    streetaddress: [''],
    state: ['NONE'],
    district: ['NONE'],
    board: ['', [Validators.required]],
    roll: ['', [Validators.required, rolValidator]],
    perc: ['', [Validators.required, percValidator]],
    username: ['', [Validators.required, emailValidator]],
    phone: ['', [Validators.required, phoneValidator]],
    password: ['', [Validators.required, Validators.minLength(4), passwordValidator]],
    hobby: [this.selectedhobby]
  });



  get gethobby() {
    return this.registerForm.get('hobby');
  }
  get getdistrict() {
    return this.registerForm.get('district');
  }
  get getstate() {
    return this.registerForm.get('state');
  }
  get getaddress() {
    return this.registerForm.get('streetaddress');
  }
  get getgender() {
    return this.registerForm.get('gender');
  }
  get getdob() {
    return this.registerForm.get('dob');
  }
  get getnameFirst() {
    return this.registerForm.get('nameFirst');
  }
  get getnameSecond() {
    return this.registerForm.get('nameSecond');
  }
  get getnameThird() {
    return this.registerForm.get('nameThird');
  }
  get getfatherName() {
    return this.registerForm.get('fatherName');
  }
  get getmotherName() {
    return this.registerForm.get('motherName');
  }
  get getboard() {
    return this.registerForm.get('board');
  }
  get getroll() {
    return this.registerForm.get('roll');
  }
  get getperc() {
    return this.registerForm.get('perc');
  }
  get getpassword() {
    return this.registerForm.get('password');
  }
  get getUsername() {
    return this.registerForm.get('username');
  }
  get getPhone() {
    return this.registerForm.get('phone');
  }

  ngOnInit() {
  }


  onSubmit(){
    console.log(this.registerForm.value);
    this._apiservice.register(this.registerForm.value)
    .subscribe(
      data => this.saveData(data),
      error => this.errorData(error)
    );
  }

  errorData(error){
    console.log("in error");
  }


  saveData(data) {
    console.log('before route');
    this.route.navigate(['']);
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
