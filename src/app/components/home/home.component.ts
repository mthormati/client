import { Component, OnInit, ViewChild } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { breakpointsProvider, BreakpointsService, BreakpointEvent } from 'angular-breakpoints';
import { NavbarService } from '../../services/navbar/navbar.service';
import { MatSidenav } from '@angular/material';
import { CardBoilerplateComponent } from '../card-boilerplate/card-boilerplate.component';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [breakpointsProvider()]
})
export class HomeComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav
  public sidenavMode: string
  public themeClass: string

  constructor(private _breakpointsService: BreakpointsService,
    private _navbarService: NavbarService,
    private _themeService: ThemeService) {
    this.sidenavMode = "side"

    /* Listen for breakpoint changes */
    this._breakpointsService.changes.subscribe((bp: BreakpointEvent) => {
      if (bp.name == "xs" || bp.name == "sm") {
        this.sidenavMode = "over"
      } else {
        this.sidenavMode = "side"
      }
    });

    /* Listen for theme changes */
    this._themeService.currentThemeClass
      .subscribe((themeClass: string) => {
        this.themeClass = themeClass
      })
  }

  ngOnInit() {
    this._navbarService.changeLeftSidenav(this.sidenav);
		this._themeService.changeThemeClass("default");
  }

}
