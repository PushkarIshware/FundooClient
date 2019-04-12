import { Component, OnInit, EventEmitter, Output, Input, ViewChild, Inject } from '@angular/core';
import { UserService } from 'src/app/services/UserServices/user.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, throwMatDialogContentAlreadyAttachedError} from '@angular/material';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import { notEqual } from 'assert';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { ViewService } from 'src/app/services/viewservice/view.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { SearchComponent } from '../search/search.component';
import { TrashComponent } from '../trash/trash.component';
import { MatSnackBar } from '@angular/material';
import { toDate } from '@angular/common/src/i18n/format_date';
import { HttpService } from 'src/app/services/http/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-notes',
  templateUrl: './create-notes.component.html',
  styleUrls: ['./create-notes.component.scss']
})
export class CreateNotesComponent implements OnInit {
  baseUrl = environment.baseUrl;
  // rewriting code
  noteData: any;

  @Input() arrayCards;
  @Input() Search;

  deletevalue = false;

  data: any;
  label: any;
  color: any;

  footerData: any;

  deleteData: { 'isDeleted': boolean; 'noteIdList': any[]; };

  archivevalue: boolean;

  archiveData: { 'isArchived': boolean; 'noteIdList': any[]; };

  pinValue: boolean;

  id: any;

  updateData: any;

  pinData: { 'isPined': boolean; 'noteIdList': any[]; };

  myDate = new Date();

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

  ColorData: { 'color': boolean; 'noteIdList': any[]; };

  carddata = this.data;
  remainderValue: { 'remainder': any; };
  labelData: any;
  DataLabels: any;

  setLabels: { 'id': any; 'label_id': any; 'label_name': any; };
  removeLabel: { 'id': any; };
  CreateDataLabels: any;
  collab_data: { 'id': any; 'new_username': any; };
  DataLabels_sidebar: any;
  DataLabels_map: any;
  DataLabels_show: Object;
  DataCollaborator_show: any;
  collaborator_data: { 'collaborator_name': any; 'note_id': any; };
  Removecollab_data: { 'collaborator_name': any; 'note_id': any; };
  addCollab: Object;
  URLdata: any;
  Unamedata: any;

  constructor(private httpservice: HttpService, private snackBar: MatSnackBar, private view: ViewService, private http: HttpClient,
    private service: UserService, public dialog: MatDialog, private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {

      // constructor body
      this.matIconRegistry.addSvgIcon(
        'unpinIcon',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/Icons/unpinIcon.svg'),
      );
      this.matIconRegistry.addSvgIcon(
        'pinIcon',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/Icons/pinIcon.svg'),
      );
     }

  uid: any;
  date = new FormControl('');
  addlabel = new FormControl('');
  collab_name = new FormControl('');
  message: any;

  ngOnInit() {
    this.getNoteData();

    this.ShowLabels();

    this.showCollaborators();
    this.view.currentMessage.subscribe(message => this.message = message);

    this.getUrl();
  }

  getNoteData() {
    this.service.getNotes().subscribe(
      (response) => {
        this.data = response;
    },
      (error) => { }
      );
  }

remainder(note) {
  this.noteData = {
    'id': note.id,
    'reminder': this.date.value,
};
   const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    })
  };
  this.http.post(this.baseUrl + 'set_reminder/' + note.id , this.noteData, httpOptions).subscribe(
    (response) => {
    this.remind_success();
    },
    (error) => {
    this.remind_failed();
  }
  );
}

ShowLabels() {
  this.httpservice.ShowLabels().subscribe(
    (response) => {
          this.DataLabels_map = response;
          },
            (error) => {
          });
}

archiveNote(note) {
  this.archivevalue = note.is_archived;
  this.archivevalue = ! this.archivevalue;
  this.noteData = {
    'id': note.id,
    'is_archived': this.archivevalue,
    'archive_time': this.myDate,
  };
  this.httpservice.archiveNote(this.noteData, note.id).subscribe(
    (response) => {
          this.archive_success();
        },
        (error) => {
        this.archive_failed();
        });
}

pin(note) {
  this.pinValue = note.is_pinned;
  this.pinValue = ! this.pinValue;

  this.noteData = {
    'id': note.id,
    'is_pinned': this.pinValue,
};
this.httpservice.pin(this.noteData, note.id).subscribe(
  (response) => {

  },
  (error) => { }
);
}

changeColor(color) {
  this.color = color;
}

getcolorid(card) {
 this.id = card.id;
}

delete_note(note) {
  this.deletevalue = true;
  this.noteData = {
    'id': note.id,
    'is_deleted': this.deletevalue,
    'deleted_time': this.myDate,
};
this.httpservice.delete_note(this.noteData, note.id).subscribe(
  (response) => {
  this.delete_success();
  },
  (error) => {
  this.delete_failed();
}
);
}

CreateLabel(card) {
  this.labelData = {
    'id': card.id,
    'label_name': this.addlabel.value,
  };
  this.httpservice.CreateLabel(this.labelData).subscribe(
    (response) => {
  this.CreateDataLabels = response;
  this.new_label_success();
  },
  (error) => {
  this.new_label_failed();
}
  );
}
stopPropagation(event) {
  event.stopPropagation();
  }

  stopPropagation1(event) {
    event.stopPropagation();
    }

show_labels_forMapping() {
    this.httpservice.showLabelsMapping().subscribe(
      (response) => {
      this.DataLabels_show = response;
      },
        (error) => {
      });
}

set_labels(label, id) {

    this.setLabels = {
      'id': id,
      'label_id': label.id,
      'label_name': label.label_name,
    };
    this.httpservice.setLabels(this.setLabels).subscribe(
      (response) => {
    this.map_label_success();
    },
    (error) => {
    this.map_label_failed();
  }
    );
  }

RemoveLabel(label) {
  const httpOptions = {
    headers: new HttpHeaders({

      'Authorization': localStorage.getItem('token')
    })
  };
  this.http.delete(this.baseUrl + 'removemaplabel/' + label.id, httpOptions).subscribe(
  (response) => {
  this.rem_label_success();
  },
  (error) => {
  this.rem_label_failed();
}
);
}

AddCollaborator(note) {
  this.collab_data = {
    'id': note.id,
    'new_username': this.collab_name.value
  };
  const httpOptions = {
    headers: new HttpHeaders({

      'Authorization': localStorage.getItem('token')
    })
  };
  this.http.post(this.baseUrl + 'addcollaborator' , this.collab_data, httpOptions).subscribe(
  (response) => {
  this.addCollab = response;
  this.collaborator_success();
  },
  (error) => {
  this.collaborator_failed();
 }
);
}

showCollaborators() {
  {
    const httpOptions = {
      headers: new HttpHeaders({

        'Authorization': localStorage.getItem('token')
      })
    };
    this.http.get(this.baseUrl + 'sc', httpOptions).subscribe(
          (response) => {
        this.DataCollaborator_show = response;
        },
          (error) => {
        });
  }
}

RemoveCollab(collab) {
  const httpOptions = {
    headers: new HttpHeaders({

      'Authorization': localStorage.getItem('token')
    })
  };
  this.http.delete(this.baseUrl + 'removemcollaborator/' + collab.note_id, httpOptions).subscribe(
  (response) => {
  this.rem_collab_success();
  },
  (error) => {
  this.rem_collab_failed();
 }
);
}

demo() {
  const now1 = new Date();
  now1.setHours(8);
  now1.setMinutes(0);
  now1.setSeconds(0);
}

RemCollab(collab) {
}


openDialog(card): void {
  const dialogRef = this.dialog.open(DialogboxComponent,
   {
   data : {
     id: card.id,
     title: card.title,
     description: card.description,
     color: card.color,
     is_pinned: card.pinValue,
     is_archived: card.archivevalue,
   }
  }
  );
  dialogRef.afterClosed().subscribe(result => {
  });
}
remind_success() {
  this.snackBar.open('Reminder set successfully.', 'OK',
  {duration: 3000});
}
remind_failed() {
  this.snackBar.open('something bad happed.', 'OK',
  {duration: 3000});
}
archive_success() {
  this.snackBar.open('Archieved successfully.', 'OK',
  {duration: 3000});
}
archive_failed() {
  this.snackBar.open('something bad happed.', 'OK',
  {duration: 3000});
}
delete_success() {
  this.snackBar.open('Deleted successfully.', 'OK',
  {duration: 3000});
}
delete_failed() {
  this.snackBar.open('something bad happed.', 'OK',
  {duration: 3000});
}
map_label_success() {
  this.snackBar.open('Label added successfully.', 'OK',
  {duration: 3000});
}
map_label_failed() {
  this.snackBar.open('something bad happed.', 'OK',
  {duration: 3000});
}
new_label_success() {
  this.snackBar.open('New label added successfully.', 'OK',
  {duration: 3000});
}
new_label_failed() {
  this.snackBar.open('something bad happed.', 'OK',
  {duration: 3000});
}
collaborator_success() {
  this.snackBar.open('Collaborated successfully.', 'OK',
  {duration: 3000});
}
collaborator_failed() {
  this.snackBar.open('something bad happed.', 'OK',
  {duration: 3000});
}
rem_collab_success() {
  this.snackBar.open('Collaborator removed successfully.', 'OK',
  {duration: 3000});
}
rem_collab_failed() {
  this.snackBar.open('something bad happed.', 'OK',
  {duration: 3000});
}
rem_label_success() {
  this.snackBar.open('Label removed successfully.', 'OK',
  {duration: 3000});
}
rem_label_failed() {
  this.snackBar.open('something bad happed.', 'OK',
  {duration: 3000});
}

getUrl() {
  this.service.getUrl().subscribe(
    (response) => {
      // tslint:disable-next-line:forin

      this.URLdata = response['data'];
      this.Unamedata = response['username'];
  },
    (error) => {}
    );
}
}
