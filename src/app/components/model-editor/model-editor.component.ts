import { Component, OnInit, Input } from '@angular/core';
import { DoneTickComponent } from '../done-tick/done-tick.component';
import { v4 as uuid } from 'uuid';
import { HttpEventType, HttpResponse } from '@angular/common/http';

/* Services */
import { UploadService } from '../../services/upload/upload.service';
import { LectureEditorService } from '../../services/lecture-editor/lecture-editor.service';

/* Models */
import { ModelItem, RotationAxis, RotationDirection } from '../../models/modelItem';
import { AudioItem } from '../../models/audioItem';
import { ItemType } from '../../models/timelineItem';

@Component({
  selector: 'app-model-editor',
  templateUrl: './model-editor.component.html',
  styleUrls: ['./model-editor.component.scss']
})
export class ModelEditorComponent implements OnInit {

  @Input() lectureTime: number
  private lectureId: string


  public newModelMode: boolean

  /* Model Item */
  public modelStartTime: number // Start time in seconds
  public modelMM: number
  public modelSS: number
  public modelFile: File
  public modelItem: ModelItem

  /* Audio Item */
  public audioItem: AudioItem
  public audioFile: File

  /* Dropzone data */
  public showDropBox: boolean
  public dropzoneActive: boolean
  public modelActive: boolean
  public showUploadProgress: boolean
  public uploadProgress: number

  /* Enums */
  public RotationAxis: any = RotationAxis
  public RotationDirection: any = RotationDirection

  public Math: any = Math

  constructor(private _uploadService: UploadService,
    private _lectureEditorService: LectureEditorService) {
    this.calculateModelTimeSlider({ value: 5 })
    this.modelItem = new ModelItem()
    this.audioItem = new AudioItem()
  }

  ngOnInit() {
    /* Subscribe to lecture ID */
    this._lectureEditorService.currentLectureId
      .subscribe((lectureId: string) => {
        this.lectureId = lectureId
      })
  }

  public initModel() {
    this.newModelMode = true
  }

  public calculateModelTime() {
    this.modelStartTime = Number(this.modelMM) * 60 + Number(this.modelSS)
    console.log(this.modelStartTime);
  }

  public calculateModelTimeSlider($event: any) {
    this.modelStartTime = Number($event.value)
    this.modelMM = Math.floor(this.modelStartTime / 60)
    this.modelSS = this.modelStartTime % 60
  }

  public finishModel() {
    this.publishModel()
    this.newModelMode = false
  }

  public onUpload($event: any) {
    if ($event.srcElement.files.length) {
      this.handleDrop($event.srcElement.files)
    }
  }

  public onAudioUpload($event: any) {
    if ($event.srcElement.files.length) {
      this.handleAudioDrop($event.srcElement.files)
    }
  }

  public handleDrop(fileList: FileList) {
    // Create lecture object

    this.uploadProgress = 0
    this.modelActive = false
    this.showUploadProgress = true
    this.showDropBox = false
    const uniqueName = uuid()

    this.modelItem.name = fileList[0].name
    this.modelItem.resource = "https://s3.us-east-2.amazonaws.com/vyden/models/" + uniqueName + "/model.gltf"

    // Rename file
    let blob = fileList[0].slice(0, -1, '.')
    this.modelFile = new File([blob], uniqueName + '.zip', { type: fileList[0].type })
    console.log(this.modelFile.type);

    console.log(this.modelFile)

    this._uploadService.uploadModelFile(this.modelFile)
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
          this.modelActive = true
          // this._lectureEditorService.publishTimelineItem(videoItem)
        }
      })
  }

  public handleAudioDrop(fileList: FileList) {
    // Create lecture object

    const uniqueName = uuid()

    this.audioItem.name = fileList[0].name
    this.audioItem.resource = "https://s3.us-east-2.amazonaws.com/vyden/audios/" + uniqueName

    // Rename file
    let blob = fileList[0].slice(0, -1, '.')
    this.audioFile = new File([blob], uniqueName, { type: fileList[0].type })

    console.log(this.audioFile.type);

    console.log(this.audioFile)

    this._uploadService.uploadAudioFile(this.audioFile)
      .subscribe((event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          // This is an upload progress event. Compute and show the % done:
          const percentDone = Math.round(100 * event.loaded / event.total);
          console.log(`File is ${percentDone}% uploaded.`);
        } else if (event instanceof HttpResponse) {
          console.log('File is completely uploaded!');
          // this._lectureEditorService.publishTimelineItem(videoItem)

          let au = document.createElement('audio');
          const fileURL = URL.createObjectURL(this.audioFile);
          au.src = fileURL;
          au.ondurationchange = () => {
            this.audioItem.duration = au.duration
          };
        }
      })
  }

  public getKeys(obj) {
    return Object.keys(obj).map((key) => { return obj[key] });
  }

  public getObjectArray(obj) {
    return Object.keys(obj).map((key) => { return { key: key, value: obj[key] } });
  }

  public publishModel() {
    this.modelItem.lecture = this.lectureId
    this.modelItem.eventTime = this.modelStartTime
    this.modelItem.type = ItemType.MODEL

    if(this.audioFile) {
      this.modelItem.audio = this.audioItem.resource
      this.modelItem.duration = Math.max(this.modelItem.duration, this.audioItem.duration)
    }

    this._lectureEditorService.publishTimelineItem(this.modelItem)
    console.log(this.modelItem);
  }

  public publishAudio() {
    this.audioItem.lecture = this.lectureId
    this.audioItem.eventTime = this.modelStartTime
    this.audioItem.type = ItemType.AUDIO

    this._lectureEditorService.publishTimelineItem(this.audioItem)
    console.log(this.modelItem);
  }

}
