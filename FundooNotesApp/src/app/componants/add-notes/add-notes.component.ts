import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/services/UserServices/user.service';
import { CreateNoteModel } from 'src/app/model/CreateNote.model';
import { CreateNotesComponent } from '../create-notes/create-notes.component';

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
  note: CreateNoteModel = new CreateNoteModel;

  title = new FormControl(this.note.title, [Validators.required]);
  description = new FormControl(this.note.description, [Validators.required]);
  id: any;

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
  @ViewChild(CreateNotesComponent) child;

  ngOnInit() {
  }
  showDiv() {
    this.flag = !this.flag;
  }
  // tslint:disable-next-line:member-ordering
  pinVALUE: any = false;
  // tslint:disable-next-line:member-ordering
  archiveVALUE: any = false;
  pin() {
    this.pinVALUE = !this.pinVALUE;
  }
  archive() {
    this.archiveVALUE = !this.archiveVALUE;
  }

  changeColor(color) {
    this.color = color;
  }
  // tslint:disable-next-line:member-ordering
  @Output() change = new EventEmitter();
  createNote() {
    this.noteData = {
      'title': this.title.value,
      'description': this.description.value,
      'color': this.color,
      'is_pinned': this.pinVALUE,
      'is_archived': this.archiveVALUE,

    };

    if (this.title.value != null || this.description.value != null) {
      this.service.createnotes(this.noteData).subscribe(
        (response) => {
          this.data = response;
          this.change.emit();
          this.child.getNoteData();
          this.NoteAdded();
        },
        (error) => {
        }
      );
    } else {
      this.NoteAdded_failed();
    }
  }
  addnotesevent() {
  }

  NoteAdded() {
    this.snackBar.open('New note added', 'OK', {
      duration: 3000
    });
  }

  NoteAdded_failed() {
    this.snackBar.open('Title and Description should not be empty.', 'OK',
      { duration: 3000 });
  }

}
