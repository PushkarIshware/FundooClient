import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
// import { CreateNote } from 'src/app/models/createnote.model';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/services/UserServices/user.service';
import { CreateNoteModel } from 'src/app/model/CreateNote.model';
// import { timingSafeEqual } from 'crypto';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.scss']
})
export class AddNotesComponent implements OnInit {
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
  pinValue = false;
  archiveValue = false;
  noteData: any;
  data: any;
  date = new FormControl('');
  user = localStorage.getItem('token');
  // delete = localStorage.removeItem('token');
  note: CreateNoteModel = new CreateNoteModel;

title = new FormControl(this.note.title);
description = new FormControl(this.note.description);
  id: any;

// color1 = this.note.color;
  constructor(private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer, private snackBar: MatSnackBar, private service: UserService
    ) {
      this.matIconRegistry.addSvgIcon(
        'unpinIcon',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/Icons/unpinIcon.svg'),
      );
      this.matIconRegistry.addSvgIcon(
        'pinIcon',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/Icons/pinIcon.svg'),
      );
   }

  ngOnInit() {
  }
  showDiv() {
    // console.log('called div');
    this.flag = ! this.flag;
  }
  pin() {
    console.log('called pin');
    this.pinValue = ! this.pinValue;
    console.log(this.pinValue);
  }
  // archive note
  archive() {
    console.log('called archive');
    this.archiveValue = ! this.archiveValue;
    console.log(this.archiveValue);
  }

  changeColor(color) {
    this.color = color;
  }
  // tslint:disable-next-line:member-ordering
  @Output() change = new EventEmitter();
  createNote() {
    // let username = localStorage.getItem('user_id');
    // let token = localStorage.getItem('token');
    console.log('close clicked');
    this.noteData = {
      // 'id': this.id.value,
      'title': this.title.value,
      'description': this.description.value,
      // 'is_pinned': this.pinValue ,
      'color': this.color,
      // 'reminder': this.date.value,
      // 'user': token
    };
     console.log(this.noteData);
    this.service.createnotes(this.noteData).subscribe(
      (response) => {console.log('success', response);
      this.data = response;
      console.log('dataa', this.data);
      this.change.emit();
      },
      (error) => {console.log('error', error); }
    );
  }
  addnotesevent() {
    console.log('event emitter add note event');
  }
}
