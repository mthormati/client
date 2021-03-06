import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { DialogsModule } from './modules/dialogs/dialogs.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { environment } from '../environments/environment';

/* Angular Material Modules */
import {
  MatButtonModule, MatToolbarModule, MatMenuModule, MatIconModule, MatSidenavModule, MatCardModule,
  MatInputModule, MatCheckboxModule, MatStepperModule, MatSliderModule, MatRadioModule, MatListModule,
  MatSlideToggleModule, MatProgressSpinnerModule, MatProgressBarModule, MatDialogModule, MatExpansionModule,
  MatSelectModule, MatDatepickerModule
} from '@angular/material';

/* Services */
import { NavbarService } from './services/navbar/navbar.service';
import { ThemeService } from './services/theme/theme.service';
import { ClassesService } from './services/classes/classes.service';
import { LectureEditorService } from './services/lecture-editor/lecture-editor.service';
import { LecturesService } from './services/lectures/lectures.service';
import { AuthService } from './services/auth/auth.service';
import { UploadService } from './services/upload/upload.service';
import { DialogsService } from './services/dialogs/dialogs.service';
import { CreateCourseService } from './services/create-course/create-course.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UsernameComponent } from './components/username/username.component';
import { CardBoilerplateComponent } from './components/card-boilerplate/card-boilerplate.component';
import { MainPanelComponent } from './components/main-panel/main-panel.component';
import { SidenavContentComponent } from './components/home/sidenav-content/sidenav-content.component';
import { LectureEditorComponent } from './components/lecture-editor/lecture-editor.component';
import { DoneTickComponent } from './components/done-tick/done-tick.component';
import { SidenavHeaderComponent } from './components/home/sidenav-content/sidenav-header/sidenav-header.component';
import { SidenavBodyComponent } from './components/home/sidenav-content/sidenav-body/sidenav-body.component';
import { SidenavLectureComponent } from './components/home/sidenav-content/sidenav-lecture/sidenav-lecture.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { ModelEditorComponent } from './components/model-editor/model-editor.component';
import { AnnouncementsCardComponent } from './components/announcements-card/announcements-card.component';
import { FocusOnCreateDirective } from './directives/focus-on-create/focus-on-create.directive';
import { TimelineComponent } from './components/timeline/timeline.component';
import { OnCreateDirective } from './directives/oncreate/on-create.directive';
import { TimelineItemDirective } from './directives/timeline-item/timeline-item.directive';
import { TemploginComponent } from './components/templogin/templogin.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { FileDropDirective } from './directives/file-drop/file-drop.directive';
import { QuizzesService } from './services/quizzes/quizzes.service';
import { AnnouncementsService } from './services/announcements/announcements.service';

import { FilterCoursesPipe } from './directives/filter-courses.pipe';
import { ConfirmDeactivateGuard } from './injectables/confirm-deactivate-guard';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
// import { AnnouncementPanelComponent } from './components/announcement-panel/announcement-panel.component';
import { QuizPanelComponent } from './components/quiz-panel/quiz-panel.component';
import { PanelContentService } from './services/panel-content/panel-content.service';
import { LectureCardComponent } from './components/lecture-card/lecture-card.component';
import { AnnouncementDialogComponent } from './components/announcement-dialog/announcement-dialog.component';
import { QuizStudentComponent } from './components/quiz-panel/quiz-student/quiz-student.component';
import { QuizInstructorComponent } from './components/quiz-panel/quiz-instructor/quiz-instructor.component';
import { DisableControlDirective } from './directives/disable-control/disable-control.directive';
import { FilterQuizzesStudentPipe } from './directives/filter-quizzes-student.pipe';
import { FilterQuizzesInstructorPipe } from './directives/filter-quizzes-instructor.pipe';
import { FilterQuizResponsesPipe } from './directives/filter-quiz-responses.pipe';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FilterContentPipe } from './directives/filter-content.pipe';
import { FilterContentService } from './services/filter-content/filter-content.service';
import { GeneralAnnouncementCardComponent } from './components/general-announcement-card/general-announcement-card.component';
import { ForumCardComponent } from './components/forum-card/forum-card.component';
import { FilterAnnouncementsPipe } from './directives/filter-announcements.pipe';
import { CourseIdDialogComponent } from './components/course-id-dialog/course-id-dialog.component';
import { FilterSearchwordPipe } from './directives/filter-searchword.pipe';
import { FilterLecturesPipe } from './directives/filter-lectures.pipe';
import { FilterForumPipe } from './directives/filter-forum.pipe';

@NgModule({
  declarations: [
    OnCreateDirective,
    TimelineItemDirective,
    AppComponent,
    HomeComponent,
    NavbarComponent,
    UsernameComponent,
    CardBoilerplateComponent,
    MainPanelComponent,
    SidenavContentComponent,
    LectureEditorComponent,
    DoneTickComponent,
    SidenavHeaderComponent,
    SidenavBodyComponent,
    SidenavLectureComponent,
    QuizComponent,
    ModelEditorComponent,
    AnnouncementsCardComponent,
    FocusOnCreateDirective,
    TimelineComponent,
    TemploginComponent,
    FileDropDirective,
    DialogComponent,
    FilterCoursesPipe,
    UserSettingsComponent,
    LectureCardComponent,
    AnnouncementDialogComponent,
    // AnnouncementPanelComponent,
    QuizPanelComponent,
    LectureCardComponent,
    QuizStudentComponent,
    QuizInstructorComponent,
    DisableControlDirective,
    FilterQuizzesStudentPipe,
    FilterQuizzesInstructorPipe,
    FilterQuizResponsesPipe,
    LoginComponent,
    RegisterComponent,
    FilterContentPipe,
    GeneralAnnouncementCardComponent,
    ForumCardComponent,
    FilterAnnouncementsPipe,
    CourseIdDialogComponent,
    FilterSearchwordPipe,
    FilterLecturesPipe,
    FilterForumPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DialogsModule,
    FlexLayoutModule,
    NgxChartsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MatButtonModule, MatToolbarModule, MatMenuModule, MatIconModule, MatSidenavModule, MatCardModule,
    MatInputModule, MatCheckboxModule, MatStepperModule, MatSliderModule, MatRadioModule, MatListModule,
    MatSlideToggleModule, MatDialogModule, MatProgressSpinnerModule, MatProgressBarModule, MatExpansionModule,
    MatSelectModule, MatDatepickerModule
  ],
  exports: [
    DialogComponent,
    AnnouncementDialogComponent,
    CourseIdDialogComponent
  ],
  providers: [NavbarService, ConfirmDeactivateGuard, ThemeService, ClassesService, LectureEditorService, LecturesService, AuthService, DialogsService, UploadService, CreateCourseService, QuizzesService, PanelContentService, AnnouncementsService, FilterContentService],
  entryComponents: [
    DialogComponent,
    AnnouncementDialogComponent,
    CourseIdDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
