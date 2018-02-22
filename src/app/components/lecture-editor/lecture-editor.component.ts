import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { DoneTickComponent } from '../done-tick/done-tick.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemeService } from '../../services/theme/theme.service';
import { LectureEditorService } from '../../services/lecture-editor/lecture-editor.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { TimelineItem, ItemType } from '../../models/timelineItem';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../services/auth/auth.service';
import { UserInfo } from '../../models/userInfo';
import { UploadService } from '../../services/upload/upload.service';
import { VideoItem } from '../../models/videoItem';
import { v4 as uuid } from 'uuid';


@Component({
  selector: 'app-lecture-editor',
  templateUrl: './lecture-editor.component.html',
  styleUrls: ['./lecture-editor.component.scss']
})
export class LectureEditorComponent implements OnInit, OnDestroy {

  /* User data */
  public userInfo: UserInfo

  /* Lecture data */
  public lectureId: string
  public lectureEndTime: number // End time in seconds
  public timelineItems: Observable<TimelineItem[]>

  /* Dropzone data */
  public showDropBox: boolean
  public dropzoneActive: boolean
  public videoActive: boolean
  public showUploadProgress: boolean
  public uploadProgress: number
  public videoName: string

  public Math = Math

  constructor(private _themeService: ThemeService,
    private _lectureEditorService: LectureEditorService,
    private _firebase: AngularFireDatabase,
    private _authService: AuthService,
    private _uploadService: UploadService) {
    this.lectureEndTime = 3000
    this.showDropBox = true
  }

  ngOnInit() {
    /* Subscribe to changes to the user */
    this._authService.currentUserObservable
      .subscribe((user: any) => {
        // Allows page access only if the user is logged in
        this._authService.checkLogin()
      })

    /* Subscribe to user info */
    this._authService.currentUserInfo
      .subscribe((userInfo: UserInfo) => {
        this.userInfo = userInfo
      })

    /* Subscribe to lecture ID */
    this._lectureEditorService.currentLectureId
      .subscribe((lectureId: string) => {
        this.lectureId = lectureId
      })

    this._themeService.changeThemeClass("deep-purple");

    // Create a new lecture object, must be changed later
    this._lectureEditorService.publishLecture('CS 420')

  }

  ngOnDestroy() {
    this._themeService.changeThemeClass("default");
  }

  public dropzoneState($event: boolean) {
    this.dropzoneActive = $event
    console.log(this.dropzoneActive)
  }

  public handleDrop(fileList: FileList) {
    this.uploadProgress = 0
    this.videoActive = false
    this.showUploadProgress = true
    this.showDropBox = false
    this.videoName = fileList[0].name

    // Rename file
    let blob = fileList[0].slice(0, -1, '.')
    const videoFile: File = new File([blob], uuid(), { type: fileList[0].type })

    console.log(videoFile)

    this._uploadService.uploadVideoFile(videoFile)
      .subscribe((event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          // This is an upload progress event. Compute and show the % done:
          const percentDone = Math.round(100 * event.loaded / event.total);
          this.uploadProgress = percentDone
          console.log(`File is ${percentDone}% uploaded.`);
        } else if (event instanceof HttpResponse) {
          this.showUploadProgress = false

          console.log('File is completely uploaded!');

          this.showDropBox = false
          this.videoActive = true
          let vid = document.createElement('video');
          const fileURL = URL.createObjectURL(videoFile);
          vid.src = fileURL;
          // wait for duration to change from NaN to the actual duration
          vid.ondurationchange = () => {
            this.lectureEndTime = vid.duration

            const videoItem: VideoItem = {
              name: 'Lecture Video',
              lecture: this.lectureId,
              eventTime: 1,
              type: ItemType.VIDEO,
              resource: "VIDEO URL",
              videoTime: this.lectureEndTime
            }

            this._lectureEditorService.publishTimelineItem(videoItem)
          };
        }
      })
  }

}
