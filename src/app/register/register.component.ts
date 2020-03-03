import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { passwordValidator, nameFirstValidator, rolValidator, percValidator, emailValidator, phoneValidator } from '../shared/form-validators';
import { ApiServiceService } from "../api-service.service";
import { Router } from '@angular/router';
import { RegisterResponse } from "../classes/registerResponse";
import { AbstractControl } from "@angular/forms";
import { CustomErrorHandlerService } from '../custom-error-handler.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  age = false;
  duplicatePhone = false;
  duplicateEmail = false;


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

  constructor( private fb: FormBuilder, private _apiservice: ApiServiceService, private route: Router, private _err: CustomErrorHandlerService) { }


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

  resetForm() {
    console.log("in reset");
    this.registerForm.reset();
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

  phoneChanged() {
    this.duplicatePhone = false;
  }

  emailChanged() {
    this.duplicateEmail = false;
  }



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
      data => {
          this.saveData(data.success);
      },
      error => {
        this.errorData(error);
      } 
    );
  }
  

  saveData(data) {
    console.log("first " + data);
    this.route.navigate(['']);
  }


  errorData(errorResponse) {
    console.log(errorResponse.error.message);
    let msg = errorResponse.error.message;
    if( msg == "age must be between 15 - 30 years" ) {
      this.age = true;
      console.log("age");
    }
    else if( msg == "user with this email is already registered, use a different email" ) {
      this.duplicateEmail = true;
      console.log("email");
    }
    else if( msg = "user with this phone is already registered, use a different mobile number") {
      this.duplicatePhone = true;
      console.log("phone");
    }
    else {
      console.log(errorResponse);
      console.log("other");
    }
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
            {name: "Bhavnagar", value: "Bhavnagar"},
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
