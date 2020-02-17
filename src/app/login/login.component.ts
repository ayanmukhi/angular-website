import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { emailValidator, passwordValidator } from '../shared/form-validators';
import { ApiServiceService } from "../api-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userData : any;
  constructor( private fb: FormBuilder, private _apiservice: ApiServiceService) { }
  
  get getUsername() {
    return this.loginForm.get('username');
  }
  get getPassword() {
    return this.loginForm.get('password');
  }
  
  loginForm = this.fb.group({
    username: ['', [Validators.required,emailValidator]],
    password: ['', [Validators.required, Validators.minLength(4), passwordValidator]]
  });


  onSubmit(){
    console.log(this.loginForm.value);
    this._apiservice.login(this.loginForm.value)
    .subscribe(
      data => this.saveData(data),
      error => console.log(error)
    );
  }

  saveData(data) {
    //console.log("in func");
    this.userData = data;
    console.log(this.userData)
    console.log(this.userData.data);
  }


  ngOnInit() {
  }

}
