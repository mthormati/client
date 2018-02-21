import { Component, OnInit } from '@angular/core';
import { ClassesService } from '../../../../services/classes/classes.service';
import { ThemeService } from '../../../../services/theme/theme.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserInfo } from '../../../../models/userInfo';
import { Course } from '../../../../models/course';

@Component({
  selector: 'app-sidenav-body',
  templateUrl: './sidenav-body.component.html',
  styleUrls: ['./sidenav-body.component.scss']
})
export class SidenavBodyComponent implements OnInit {

  public themeClass: string = "default-theme";
  public themes: string[][] = this._themeService.getThemes();
  public hover: boolean[] = [];

  public userInfo: UserInfo;
  public courses: Course[] = [];

  constructor(private _classesService: ClassesService,
    private _themeService: ThemeService,
    private _authService: AuthService,
    private _firebase: AngularFireDatabase) { }

  ngOnInit() {
    /* Subscribe for theme changes */
    this._themeService.currentThemeClass.subscribe((theme: string) => {
			this.themeClass = theme;
    });

    /* Subscribe to user info */
    this._authService.currentUserInfo
      .subscribe((userInfo: UserInfo) => {
        this.userInfo = userInfo;

        //Get all the courses the user is enrolled in
        let courseIDList = this._classesService.getEnrolledCourses();
        //Add courses to courses array
        this.courses = [];
        courseIDList.forEach((courseID: string) => {
          this._firebase.object('Courses/' + courseID).valueChanges().subscribe((course: Course) => {
            this.courses.push(course);
          })
        })
      });
  }

  //Takes index of button as parameter
  //Returns color for button
  public getButtonColor(index: number): string {
    return this.themes[index % this.themes.length][1];
  }

  //Called when a class button is clicked
  //Changes the theme of the page and changes sidenav to lecture sidenav view
  public navigateToCourse(index: number) {
    this._themeService.changeThemeClass(this.themes[index][0]);
    this._classesService.selectCourse(this.courses[index]);
  }
}
