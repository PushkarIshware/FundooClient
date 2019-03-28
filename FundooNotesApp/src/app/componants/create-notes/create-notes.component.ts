import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/UserServices/user.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import { notEqual } from 'assert';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { ViewService } from 'src/app/services/viewservice/view.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { SearchComponent } from '../search/search.component';
import { TrashComponent } from '../trash/trash.component';

@Component({
  selector: 'app-create-notes',
  templateUrl: './create-notes.component.html',
  styleUrls: ['./create-notes.component.scss']
})
export class CreateNotesComponent implements OnInit {
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
  // labelData: { 'id': any; '': any; };

  constructor(private view: ViewService, private http: HttpClient,
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

  // data: any;
  uid: any;
  date = new FormControl('');
  addlabel = new FormControl('');
  collab_name = new FormControl('');
  message: any;
  ngOnInit() {
    this.ShowLabels();
    this.getNoteData();
    this.showCollaborators();
    this.view.currentMessage.subscribe(message => this.message = message);
  }

  // getting data from database calling service method.
  getNoteData() {
    this.service.getNotes().subscribe(
      (response) => {
        // tslint:disable-next-line:forin

        // console.log('success get notes', response['data']);
        this.data = response;
        console.log(this.data);
    // this.uid = localStorage.getItem('user_id');
    },
      (error) => {console.log('error', error); }
      );
  }

// Methods for all
remainder(note) {
  console.log(note.id, '----', this.date.value);
  this.noteData = {
    'id': note.id,
    'reminder': this.date.value,
};
  console.log('remainder Valueeeeeeeee', this.noteData);
}
// ShowLabels() {
//   console.log('showing labels');
//   const httpOptions = {
//     headers: new HttpHeaders({

//       // 'Authorization': localStorage.getItem('user_id');
//       'Authorization': localStorage.getItem('token')
//     })
//   };
//   this.http.get('http://127.0.0.1:8000/api/showlabel', httpOptions).subscribe(
//         (response) => {console.log('success in create notes', response);
//       this.DataLabels = response;
//       },
//         (error) => {console.log('error', error);
//       });
// }
ShowLabels() {
  console.log('showing labels');
  const httpOptions = {
    headers: new HttpHeaders({

      // 'Authorization': localStorage.getItem('user_id');
      'Authorization': localStorage.getItem('token')
    })
  };
  this.http.get('http://127.0.0.1:8000/api/getmaplabels', httpOptions).subscribe(
        (response) => {console.log('success in create notes', response);
      this.DataLabels_map = response;
      },
        (error) => {console.log('error', error);
      });
}

archiveNote(note) {
  console.log(note.id, '----------');
  this.archivevalue = note.is_archived;
  console.log(this.archivevalue, 'before');
  this.archivevalue = ! this.archivevalue;
  console.log(this.archivevalue, 'after');
  this.noteData = {
    'id': note.id,
    'is_archived': this.archivevalue,
  };
  const httpOptions = {
    headers: new HttpHeaders({

      // 'Authorization': localStorage.getItem('user_id');
      'Authorization': localStorage.getItem('token')
    })
  };
  console.log(this.noteData, '----------');
  this.http.post('http://127.0.0.1:8000/api/archive/' + note.id , this.noteData, httpOptions).subscribe(
    (response) => {console.log('success', response);
    // this.data = response;
    // console.log('dataa', this.data);
    },
    (error) => {console.log('error', error); }
  );
}


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

    // 'Authorization': localStorage.getItem('user_id');
    'Authorization': localStorage.getItem('token')
  })
};
this.http.post('http://127.0.0.1:8000/api/pinunpin/' + note.id , this.noteData, httpOptions).subscribe(
  (response) => {console.log('success', response);
  // this.data = response;
  // console.log('dataa', this.data);
  },
  (error) => {console.log('error', error); }
);
}
  // this.pinData = {
  //   'isPined': this.deletevalue,
  //   'noteIdList': [card.id]
  // };
  // console.log(this.pinData);

  // this.service.pinnote(this.pinData).subscribe(
  //   (response) => {console.log('success', response);
  // console.log(this.data);
  // },
  //   (error) => {console.log('error', error); }
  // );
// }

changeColor(color) {

  this.color = color;
  // card.color = color;
  console.log(this.color, this.id);
  // this.ColorData = {
  //   'color': this.color,
  //   'noteIdList': [this.id]
  // };
  // console.log(this.ColorData);

  // this.service.colornote(this.ColorData).subscribe(
  //   (response) => {console.log('success', response);
  // console.log(this.data);
  // },
  //   (error) => {console.log('error', error); }
  // );

}

getcolorid(card) {
 this.id = card.id;
console.log(this.id);
}

delete1(note) {
  console.log('delete 1 fun call', note.id);
  // this.deletevalue = ! this.deletevalue;
  this.deletevalue = true;
  console.log(this.deletevalue);
  this.noteData = {
    'id': note.id,
    'is_deleted': this.deletevalue,
};
console.log(this.noteData);
const httpOptions = {
  headers: new HttpHeaders({

    // 'Authorization': localStorage.getItem('user_id');
    'Authorization': localStorage.getItem('token')
  })
};
  // this.service.update(this.noteData).subscribe(
  this.http.post('http://127.0.0.1:8000/api/deletenote/' + note.id , this.noteData, httpOptions).subscribe(
  (response) => {console.log('success', response);
  // this.data = response;
  // console.log('dataa', this.data);
  },
  (error) => {console.log('error', error); }
);
}

AddLabel(note) {
  console.log('label fumnctions', note.id);
}


delete(card) {
 console.log(card.id);
 console.log('deleted');
 this.deletevalue = ! this.deletevalue;
 console.log(this.deletevalue);

// this.deleteData = {
// 'isDeleted': this.deletevalue,
// 'noteIdList': [card.id]
// };
// console.log(this.deleteData);

// Delete note service method
// this.service.trashnote(this.deleteData).subscribe(
// (response) => {console.log('success', response);
// console.log(this.data);
// },
// (error) => {console.log('error', error); }
// );

}

archive(card) {
  console.log(card.id);
 console.log('archived');
 this.archivevalue = ! this.archivevalue;

// this.archiveData = {
// 'isArchived': this.archivevalue,
// 'noteIdList': [card.id]
// };
// console.log(this.archiveData);

// Archive note service methods
// this.service.archivednote(this.archiveData).subscribe(
// (response) => {console.log('success', response);
// console.log(this.data);
// },
// (error) => {console.log('error', error); }
// );
// this.updateNotes(card);
}

updateNotes(card) {
  this.updateData = {
    'noteId': card.id,
    'title': card.title,
    'description': card.description
  };
  console.log('dataaaaa', this.updateData);

  // update note services

  // this.service.updatednote(this.updateData).subscribe(
  //   (response) => {console.log('success', response);
  // console.log(this.data);
  // },
  //   (error) => {console.log('error', error); }
  // );
}


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
  this.http.post('http://127.0.0.1:8000/api/createlabel' , this.labelData, httpOptions).subscribe(
  (response) => {console.log('success', response);
  this.CreateDataLabels = response;
  // console.log('dataa', this.data);
  },
  (error) => {console.log('error', error); }
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

  showLABELS() {
    console.log('show');
    {
      console.log('showing labels');
      const httpOptions = {
        headers: new HttpHeaders({

          // 'Authorization': localStorage.getItem('user_id');
          'Authorization': localStorage.getItem('token')
        })
      };
      this.http.get('http://127.0.0.1:8000/api/showlabel', httpOptions).subscribe(
            (response) => {console.log('success', response);
          this.DataLabels_show = response;
          },
            (error) => {console.log('error', error);
          });
    }
  }

  setLABEL(label, id) {
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

    this.http.post('http://127.0.0.1:8000/api/maplabel' , this.setLabels, httpOptions).subscribe(
    (response) => {console.log('success', response);
    // this.DataLabels = response;
    // console.log('dataa', this.data);
    },
    (error) => {console.log('error', error); }
  );
  }

  RemoveLabel(label) {
    console.log('remove label called', label);
    const httpOptions = {
      headers: new HttpHeaders({

        'Authorization': localStorage.getItem('token')
      })
    };
    this.http.delete('http://127.0.0.1:8000/api/removemaplabel/' + label.id, httpOptions).subscribe(
    (response) => {console.log('success', response);
    // this.DataLabels = response;
    // console.log('dataa', this.data);
    },
    (error) => {console.log('error', error); }
  );
  }


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
    this.http.post('http://127.0.0.1:8000/api/addcollaborator' , this.collab_data, httpOptions).subscribe(
    (response) => {console.log('success', response);
    this.CreateDataLabels = response;
    // console.log('dataa', this.data);
    },
    (error) => {console.log('error', error); }
  );
  }

// show collaborator
showCollaborators() {
  console.log('show collab');
  {
    console.log('showing collab');
    const httpOptions = {
      headers: new HttpHeaders({

        // 'Authorization': localStorage.getItem('user_id');
        'Authorization': localStorage.getItem('token')
      })
    };
    this.http.get('http://127.0.0.1:8000/api/sc', httpOptions).subscribe(
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
  // this.Removecollab_data = {
  //   'collaborator_name': collab.uname,
  //   'note_id': collab.note_id
  // };
  const httpOptions = {
    headers: new HttpHeaders({

      'Authorization': localStorage.getItem('token')
    })
  };
  this.http.delete('http://127.0.0.1:8000/api/removemcollaborator/' + collab.note_id, httpOptions).subscribe(
  (response) => {console.log('success', response);
  // this.DataLabels = response;
  // console.log('dataa', this.data);
  },
  (error) => {console.log('error', error); }
);
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

}
