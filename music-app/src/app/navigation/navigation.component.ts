import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Router, NavigationStart} from '@angular/router';
import {filter} from 'rxjs/operators';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  //notify main screen that nav bar has been toggled
  @Output() navToggled = new EventEmitter();
  navOpen = false;

  constructor(private router: Router) { }
  
  ngOnInit() {

    // Close nav menu after routing
    this.router.events

      .pipe(
        filter(event => event instanceof NavigationStart && this.navOpen)
      )
      .subscribe(event => this.toggleNav());
  }

  toggleNav() {
    this.navOpen = !this.navOpen;
    this.navToggled.emit(this.navOpen);
  }

}
