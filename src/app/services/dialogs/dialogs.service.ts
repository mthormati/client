import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';


@Injectable()
export class DialogsService {

  constructor(private dialog: MatDialog) {
   }

   public result: Observable<string>;

    public confirm(title: string, message: string, fullName: string): Observable<string> {

        let dialogRef: MatDialogRef<DialogComponent>;

        dialogRef = this.dialog.open(DialogComponent, {
            width: '380px',
        });
        
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;
        dialogRef.componentInstance.fullName = fullName;

        return dialogRef.afterClosed();
    }

}
