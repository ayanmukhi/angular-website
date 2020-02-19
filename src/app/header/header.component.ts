import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  constructor(private route: Router) { }

  public fontweight: any;
  public headerHeight: any;
  public lineHeight: any;

  get windowWidth() {
    return window.innerWidth + "px";
  }

  setStyleSize() {
    this.fontweight = (window.innerWidth * 0.019) + "px";
    this.headerHeight = (window.innerWidth * 0.04) + "px";
    this.lineHeight = (0.1 * this.headerHeight) + "px";
  }

  ngOnInit() {
    this.setStyleSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setStyleSize();
  }

  checkJwt() {
    if( localStorage.getItem('jwt')) {
      return true;
    }
    return false;
  }

  logout() { 
    localStorage.clear();
    this.route.navigate(['']);
  }

}
