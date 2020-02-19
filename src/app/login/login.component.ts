import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { emailValidator, passwordValidator } from '../shared/form-validators';
import { ApiServiceService } from "../api-service.service";
import { loginResponse } from '../classes/loginResponse';
import { Router } from '@angular/router';

import * as jwt_decode from 'jwt-decode';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public credentialsMatch = "";
  userData : loginResponse;
  token : string;

  constructor( private fb: FormBuilder, private _apiservice: ApiServiceService, private route: Router) { }
  


  get getUsername() {
    return this.loginForm.get('username');
  }
  get getPassword() {
    return this.loginForm.get('password');
  }
  
  loginForm = this.fb.group({
    username: ['', [Validators.required, emailValidator]],
    password: ['', [Validators.required, Validators.minLength(4), passwordValidator]]
  });


  onSubmit(){
    this._apiservice.login(this.loginForm.value)
    .subscribe(
      data => this.saveData(data),
      error => this.errorData(error)
    );
  }


  errorData(error){
    this.credentialsMatch = "credentials dosen't match each other";
  }



  saveData(data) {
    this.userData = data;
    
    localStorage.setItem('jwt', this.userData.token);
    

    // this.route.navigate(['/profile']);
    console.log("now " + this.userData.data.status);
    if( this.userData.data.status == "A") {
      this.route.navigate(['/admin']);
    }
    else {
      this.route.navigate(['/profile']);
    }
  }


  ngOnInit() {
  }

}
