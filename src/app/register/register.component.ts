import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { passwordValidator,
         nameFirstValidator,
         rolValidator,
         percValidator, 
         emailValidator, 
         phoneValidator 
        } from '../shared/form-validators';
import { ApiServiceService } from "../api-service.service";
import { Router } from '@angular/router';
import { RegisterResponse } from "../classes/registerResponse";
import { CustomErrorHandlerService } from '../custom-error-handler.service';
import { DetailsService } from '../details.service';
import { getResponse } from '../classes/getresponse';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  curr:boolean = false;
  currUser:getResponse;
  age = false;
  duplicatePhone = false;
  duplicateEmail = false;
  sic:number;


  selectedhobby = [];
  hobbyArr =  [
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

  public district = [];
    

  public credentialsMatch = "";
  userData : RegisterResponse;

  constructor(  private fb: FormBuilder, 
                private _apiservice: ApiServiceService, 
                private route: Router,
                private _datepipe: DatePipe
              ) {
    
    this.district = [
      {name: "---", value: "NONE"}

    ];
 }

  //fetch the details of the user if some one is logged in
  ngOnInit() {
    
    if( localStorage.getItem('jwt') != null) {
      this._apiservice.get(localStorage.getItem('jwt'))
      .subscribe( 
        response => {
          this.curr = true;
          this.currUser = response;
          console.log(this.currUser.data);
          this.populateFields();
        },
        error => {
          console.log(error);
        }
      )
    }
  }


  //function to populate the fields 
  populateFields() {

    //parsing the name of the user
    let firstName = "";
    let secondName = "";
    let thirdName = "";
    let namestr = this.currUser.data.stu_name.split(' ');
    console.log(namestr);
    if( namestr.length == 3) {
      firstName = namestr[0];
      secondName = namestr[1];
      thirdName = namestr[2];
    }
    else {
      firstName = namestr[0];
      thirdName = namestr[1];
    }
    let date = this.currUser.data.dob;
    date = date.slice(0,2) + date.slice(4)
    date = this._datepipe.transform(date, 'yyyy-MM-dd');
    console.log("date : " + this.currUser.data.dob);
    this.registerForm = this.fb.group({
      nameFirst: firstName,
      nameSecond: secondName,
      nameThird: thirdName,
      fatherName: this.currUser.data.father_name,
      motherName: this.currUser.data.mother_name,
      dob: date,
      gender: this.currUser.data.gender,
      streetaddress: this.currUser.data.street_address,
      state: this.currUser.data.state,
      district: this.currUser.data.district,
      board: this.currUser.data.matric_board,
      roll: this.currUser.data.matric_roll,
      perc: this.currUser.data.matric_perc,
      username: this.currUser.data.email,
      phone: this.currUser.data.phone,
      password: this.currUser.data.password,
      hobby: this.currUser.data.hobby,
      sic: this.currUser.data.sic
     })
  }

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

  


  onSubmit(){
    console.log(this.registerForm.value);
    if( this.curr == false) {
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
    else {
      this._apiservice.update(this.registerForm.value)
        .subscribe(
          data => {
              console.log(data.success);
              this.route.navigate(['/profile']);
          },
          error => {
            this.errorData(error);
          } 
        );
    }
    
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
