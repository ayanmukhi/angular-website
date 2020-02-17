import { Component } from '@angular/core';
// import { ApiServiceService } from "./api-service.service";
// import { Comments } from "./classes/comments";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'website';
  // userData : Comments[];

  constructor(){}

  ngOnInit(){

    // this._apiService.getComments()
    // .subscribe(
    //   data=>
    //   {
    //     this.userData = data;
    //     console.log(this.userData);
    //   }  
    // );
  }

}
