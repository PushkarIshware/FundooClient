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

import { environment } from 'src/environments/environment';

// import { DatePipe } from '@angular/common';
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

  constructor(private snackBar: MatSnackBar, private view: ViewService, private http: HttpClient,
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
    // show all notes
    this.getNoteData();

    // show mapped labels of given notes
    this.ShowLabels();

    // show collaborator name of given notes
    this.showCollaborators();
    this.view.currentMessage.subscribe(message => this.message = message);

    // url
    this.getUrl();
  }

  // getting data from database calling service method.

  // show all notes
  getNoteData() {
    this.service.getNotes().subscribe(
      (response) => {
        this.data = response;
        console.log(this.data);
    },
      (error) => {console.log('error', error); }
      );
  }

// Methods for all

// set reminder to note
remainder(note) {
  this.noteData = {
    'id': note.id,
    // 'reminder': this.date.value.toLocaleDateString(),
    'reminder': this.date.value,
};
console.log(this.noteData);
  // sending token to backend
   const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    })
  };
  this.http.post(this.baseUrl + 'set_reminder/' + note.id , this.noteData, httpOptions).subscribe(
    (response) => {console.log('success', response);
    this.remind_success();
    },
    (error) => {console.log('error', error);
    this.remind_failed();
  }
  );
}

// show mapped labels of given notes
ShowLabels() {
  const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    })
  };
  this.http.get(this.baseUrl + 'getmaplabels', httpOptions).subscribe(
        (response) => {
      this.DataLabels_map = response;
      },
        (error) => {console.log('error', error);
      });
}

// set archive value note
archiveNote(note) {
  this.archivevalue = note.is_archived;
  this.archivevalue = ! this.archivevalue;
  this.noteData = {
    'id': note.id,
    'is_archived': this.archivevalue,
    'archive_time': this.myDate,
  };
  const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    })
  };
  console.log(this.noteData, '----------');
  this.http.post(this.baseUrl + 'archive/' + note.id , this.noteData, httpOptions).subscribe(
    (response) => {
      this.archive_success();
      console.log('success', response);
    },
    (error) => {console.log('error', error);
    this.archive_failed();
    }
  );
}

// set pin value true/false
pin(note) {
  console.log('called pin');
  this.pinValue = note.is_pinned;
  console.log('before', this.pinValue);
  this.pinValue = ! this.pinValue;
  console.log(note.id, ' after', this.pinValue);

  this.noteData = {
    'id': note.id,
    'is_pinned': this.pinValue,
};

const httpOptions = {
  headers: new HttpHeaders({

    'Authorization': localStorage.getItem('token')
  })
};
this.http.post(this.baseUrl + 'pinunpin/' + note.id , this.noteData, httpOptions).subscribe(
  (response) => {console.log('success', response);

  },
  (error) => {console.log('error', error); }
);
}

changeColor(color) {
  this.color = color;
  console.log(this.color, this.id);
}

getcolorid(card) {
 this.id = card.id;
console.log(this.id);
}

// set delete value true/false
delete_note(note) {
  console.log('delete 1 fun call', note.id);
  this.deletevalue = true;
  console.log(this.deletevalue);
  this.noteData = {
    'id': note.id,
    'is_deleted': this.deletevalue,
    'deleted_time': this.myDate,
};
console.log(this.noteData);
const httpOptions = {
  headers: new HttpHeaders({

    'Authorization': localStorage.getItem('token')
  })
};
  this.http.post(this.baseUrl + 'deletenote/' + note.id , this.noteData, httpOptions).subscribe(
  (response) => {console.log('success', response);
  this.delete_success();
  },
  (error) => {console.log('error', error);
  this.delete_failed();
}
);
}

// create new label from note
CreateLabel(card) {
  this.labelData = {
    'id': card.id,
    'label_name': this.addlabel.value,
  };
  const httpOptions = {
    headers: new HttpHeaders({

      'Authorization': localStorage.getItem('token')
    })
  };
  console.log('label adding functions', this.labelData);
  this.http.post(this.baseUrl + 'createlabel' , this.labelData, httpOptions).subscribe(
  (response) => {console.log('success', response);
  this.CreateDataLabels = response;
  this.new_label_success();
  },
  (error) => {console.log('error', error);
  this.new_label_failed();
}
);


}
stopPropagation(event) {
  event.stopPropagation();
  // console.log("Clicked!");
  }

  stopPropagation1(event) {
    event.stopPropagation();
    // console.log("Clicked!");
    }

// show all labels for mapping to given note
show_labels_forMapping() {
  console.log('show');
  {
    console.log('showing labels');
    const httpOptions = {
      headers: new HttpHeaders({

        // 'Authorization': localStorage.getItem('user_id');
        'Authorization': localStorage.getItem('token')
      })
    };
    this.http.get(this.baseUrl + 'showlabel', httpOptions).subscribe(
          (response) => {console.log('success', response);
        this.DataLabels_show = response;
        },
          (error) => {console.log('error', error);
        });
  }
}

// set given label to that note
set_labels(label, id) {
    console.log('label name', label.label_name, id);

    this.setLabels = {
      'id': id,
      'label_id': label.id,
      'label_name': label.label_name,
    };
    console.log(this.setLabels);
    const httpOptions = {
      headers: new HttpHeaders({

        'Authorization': localStorage.getItem('token')
      })
    };

    this.http.post(this.baseUrl + 'maplabel' , this.setLabels, httpOptions).subscribe(
    (response) => {console.log('success', response);
    this.map_label_success();
    },
    (error) => {console.log('error', error);
    this.map_label_failed();
  }
  );
  }

// remove given mapped label from note
RemoveLabel(label) {
  console.log('remove label called', label);
  const httpOptions = {
    headers: new HttpHeaders({

      'Authorization': localStorage.getItem('token')
    })
  };
  this.http.delete(this.baseUrl + 'removemaplabel/' + label.id, httpOptions).subscribe(
  (response) => {console.log('success', response);
  this.rem_label_success();
  },
  (error) => {console.log('error', error);
  this.rem_label_failed();
}
);
}

// add collaborator to that note
AddCollaborator(note) {
  console.log('add collab called', note.id, this.collab_name.value);
  this.collab_data = {
    'id': note.id,
    'new_username': this.collab_name.value
  };
  console.log(this.collab_data);
  const httpOptions = {
    headers: new HttpHeaders({

      'Authorization': localStorage.getItem('token')
    })
  };
  console.log('label adding functions', this.collab_data);
  this.http.post(this.baseUrl + 'addcollaborator' , this.collab_data, httpOptions).subscribe(
  (response) => {console.log('success', response);
  this.addCollab = response;
  this.collaborator_success();
  },
  (error) => {console.log('error', error);
  this.collaborator_failed();
 }
);
}

// show all collaborator
showCollaborators() {
  console.log('show collab');
  {
    console.log('showing collab');
    const httpOptions = {
      headers: new HttpHeaders({

        'Authorization': localStorage.getItem('token')
      })
    };
    this.http.get(this.baseUrl + 'api/sc', httpOptions).subscribe(
          (response) => {console.log('success', response);
        this.DataCollaborator_show = response;
        console.log(this.DataCollaborator_show, 'this is from backend');
        },
          (error) => {console.log('error', error);
        });
  }
}

// Remove Collaborators
RemoveCollab(collab) {
  console.log('remove called', collab.uname, collab.note_id);
  const httpOptions = {
    headers: new HttpHeaders({

      'Authorization': localStorage.getItem('token')
    })
  };
  this.http.delete(this.baseUrl + 'removemcollaborator/' + collab.note_id, httpOptions).subscribe(
  (response) => {console.log('success', response);
  this.rem_collab_success();
  },
  (error) => {console.log('error', error);
  this.rem_collab_failed();
 }
);
}

demo() {
  const now1 = new Date();
  now1.setHours(8);
  now1.setMinutes(0);
  now1.setSeconds(0);
  console.log(now1);
}

// THIS is New Componant for dialog block

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
  console.log(card.id);
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}
// snackbars for message display
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

      // console.log('success get notes', response['data']);
      this.URLdata = response['data'];
      this.Unamedata = response['username'];
      // console.log(this.data);
  // this.uid = localStorage.getItem('user_id');
  },
    (error) => {console.log('error', error); }
    );
}
}
