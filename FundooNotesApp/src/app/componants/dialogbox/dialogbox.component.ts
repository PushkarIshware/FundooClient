import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatIconRegistry } from '@angular/material';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FormControl } from '@angular/forms';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from 'src/app/services/UserServices/user.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.scss']
})
export class DialogboxComponent implements OnInit {
  baseUrl = environment.baseUrl;

  today: number = Date.now();
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

  noteData: any;

  user = localStorage.getItem('token');

  title = new FormControl(this.data.title);
  description = new FormControl(this.data.description);

  date = new FormControl(this.data.date);

  constructor(private http: HttpClient, public dialogRef: MatDialogRef<DashboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private service: UserService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon('unpinIcon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/Icons/unpinIcon.svg'),
    );
  }
  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  showDiv() {
    this.flag = !this.flag;
  }
  pin() {
    this.data.pinValue = !this.data.pinValue;
  }
  // archive note
  archive() {
    this.data.archivevalue = !this.data.archivevalue;
  }

  delete() {
    this.data.is_deleted = !this.data.is_deleted;
  }

  changeColor(color) {
    this.data.color = color;
  }
  // tslint:disable-next-line:member-ordering

  updateNotes() {
    this.noteData = {
      'id': this.data.id,
      'title': this.title.value,
      'description': this.description.value,
      'color': this.data.color,
      'reminder': this.date.value.toLocaleDateString(),

    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')
      })
    };
    this.http.post(this.baseUrl + 'updatenote/' + this.data.id, this.noteData, httpOptions).subscribe(
      (response) => {
      },
      (error) => { }
    );
  }

  demo() {
    const now1 = new Date();
    now1.setHours(8);
    now1.setMinutes(0);
    now1.setSeconds(0);
  }
}
