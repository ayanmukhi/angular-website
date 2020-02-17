import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  constructor() { }

  public fontweight: any;
  public headerHeight: any;
  public lineHeight: any;

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

}
