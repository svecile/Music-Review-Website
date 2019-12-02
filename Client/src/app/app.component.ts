import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'se3316-svecile-lab4';
  adminBanner:string;

  ngOnInit(): void {
    //if it is an admin logged in display the banner
    this.adminBanner= localStorage.getItem('admin');
  }


}
