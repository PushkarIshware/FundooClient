import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatIconRegistry } from '@angular/material';
import { DashboardComponent } from '../dashboard/dashboard.component';
// import { NoteService } from 'src/app/services/notes/note.service';
import { FormControl } from '@angular/forms';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from 'src/app/services/UserServices/user.service';

@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.scss']
})
export class DialogboxComponent implements OnInit {

  pinnedIconSrc = '../../assets/Icons/pinIcon.svg';
  unpinnedIconSrc = '../../assets/Icons/unpinIcon.svg';
  colorCode: Array<Object> = [
    { name: 'white', colorCode: '#fff' },
    { name: 'red', colorCode: '#fc8981' },
    { name: 'orange', colorCode: '#ffb834' },
    { name: 'yellow', colorCode: '#fff181' },
    { name: 'green', colorCode: '#c5fd98' },
    { name: 'teal', colorCode: '#96ffec' },
    { name: 'blue', colorCode: '#c4f0f7' },
    { name: 'darkblue', colorCode: '#a6cbf7' },
    { name: 'purple', colorCode: '#d9aff7' },
    { name: 'pink', colorCode: '#ffcee6' },
    { name: 'brown', colorCode: '#e9c7a9' },
    { name: 'gray', colorCode: '#e7e9ec' }
  ];
  color = '#ffffff';
  notificationIcon = '../../assets/Icons/notification.svg';
  flag = false;
  isActive = false;
  // pinValue = false;
  // archivevalue = false;
  noteData: any;

  user = localStorage.getItem('token');
  // delete = localStorage.removeItem('token');

title = new FormControl(this.data.title);
description = new FormControl(this.data.description);

date = new FormControl(this.data.date);

// color1 = this.note.color;
    constructor(private http: HttpClient, public dialogRef: MatDialogRef<DashboardComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any, private service: UserService,
      private matIconRegistry: MatIconRegistry,
      private domSanitizer: DomSanitizer
      ) {
        this.matIconRegistry.addSvgIcon('unpinIcon',
          this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/Icons/unpinIcon.svg'),
        ); }
    ngOnInit() {
    }
    onNoClick(): void {
      this.dialogRef.close();
    }
    showDiv() {
      // console.log('called div');
      this.flag = ! this.flag;
    }
    pin() {
      console.log('called pin');
      this.data.pinValue = ! this.data.pinValue ;
      console.log(this.data.pinValue );
    }
    // archive note
    archive() {
      console.log('called archive');
      this.data.archivevalue = ! this.data.archivevalue;
      console.log(this.data.archivevalue);
    }

    delete() {
      this.data.is_deleted = ! this.data.is_deleted;
    }

    changeColor(color) {
      this.data.color = color;
    }
    // tslint:disable-next-line:member-ordering

    updateNotes() {
      console.log('close clicked');
      console.log('printingh tile and descri', this.title.value , ' ', this.description.value);
      this.noteData = {
        'id': this.data.id,
        'title': this.title.value,
        'description': this.description.value,
        // 'is_pinned': this.data.pinValue,
        'color': this.data.color,
        'reminder': this.date.value,
        // 'is_archived': this.data.archivevalue,
        // 'delete': this.data.is_deleted,
        // 'user': token
      };
       console.log(this.noteData);

       const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': localStorage.getItem('token')
        })
      };
        // this.service.update(this.noteData).subscribe(
        this.http.post('http://127.0.0.1:8000/api/updatenote/' + this.data.id , this.noteData, httpOptions).subscribe(
        (response) => {console.log('success', response);

        },
        (error) => {console.log('error', error); }
      );
    }
}
