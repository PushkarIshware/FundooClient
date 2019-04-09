import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/UserServices/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { environment } from 'src/environments/environment';
import { environment } from 'src/environments/environment.prod';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
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

  baseUrl = environment.baseUrl;
  myDate = new Date();
  collab_name = new FormControl('');
  date = new FormControl('');
  data: any;
  archivevalue: boolean;
  noteData: { 'id': any; 'is_archived': boolean; };
  deletevalue: boolean;
  noteDataDel: { 'id': any; 'is_deleted': boolean; 'deleted_time': any; };
  collab_data: { 'id': any; 'new_username': any; };
  addCollab: Object;
  DataCollaborator_show: Object;
  noteDataDate: {
  'id': any;
    // 'reminder': this.date.value.toLocaleDateString(),
    'reminder': any;
  };
  noteId: any;
  noteDataColor: { 'id': any; 'color': any; };
  constructor(private service: UserService, private http: HttpClient) { }

  ngOnInit() {
    this.getNoteData();
    this.showCollaborators();
  }
  getNoteData() {
    this.service.getNotes().subscribe(
      (response) => {console.log('success get notes', response);
      this.data = response;
    // this.uid = localStorage.getItem('user_id');
    },
      (error) => {console.log('error', error); }
      );
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
    console.log(this.noteData, '----------');
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Authorization': localStorage.getItem('user_id');
        'Authorization': localStorage.getItem('token')
      })
    };
    this.http.post(this.baseUrl + 'archive/' + note.id , this.noteData, httpOptions).subscribe(
      (response) => {console.log('success', response);
      // this.data = response;
      // console.log('dataa', this.data);
      },
      (error) => {console.log('error', error); }
    );
  }

  stopPropagation1(event) {
    event.stopPropagation();
    // console.log("Clicked!");
    }
  // set delete value true/false
delete_note(note) {
  console.log('delete 1 fun call', note.id);
  this.deletevalue = true;
  console.log(this.deletevalue);
  this.noteDataDel = {
    'id': note.id,
    'is_deleted': this.deletevalue,
    'deleted_time': this.myDate,
};
console.log(this.noteDataDel);
const httpOptions = {
  headers: new HttpHeaders({

    'Authorization': localStorage.getItem('token')
  })
};
  this.http.post(this.baseUrl + 'deletenote/' + note.id , this.noteDataDel, httpOptions).subscribe(
  (response) => {console.log('success', response);
  // this.delete_success();
  },
  (error) => {console.log('error', error);
  // this.delete_failed();
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
  // this.collaborator_success();
  },
  (error) => {console.log('error', error);
  // this.collaborator_failed();
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
    this.http.get(this.baseUrl + 'sc', httpOptions).subscribe(
          (response) => {console.log('success', response);
        this.DataCollaborator_show = response;
        console.log(this.DataCollaborator_show, 'this is from backend');
        },
          (error) => {console.log('error', error);
        });
  }
}

// set reminder to note
remainder(note) {
  this.noteDataDate = {
    'id': note.id,
    // 'reminder': this.date.value.toLocaleDateString(),
    'reminder': this.date.value,
};
console.log(this.noteDataDate);
  // sending token to backend
   const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    })
  };
  this.http.post(this.baseUrl + 'set_reminder/' + note.id , this.noteDataDate, httpOptions).subscribe(
    (response) => {console.log('success', response);
    // this.remind_success();
    },
    (error) => {console.log('error', error);
    // this.remind_failed();
  }
  );
}
note_id(noteId) {
  this.noteId = noteId;
  console.log(noteId);
}

changeColor(color, note) {
  this.data.color = color;
  console.log(this.data.color);
  console.log('close clicked');
  this.noteDataColor = {
    'id': this.noteId,
    'color': this.data.color,
  };
   console.log(this.noteDataColor);

   const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    })
  };
    // this.service.update(this.noteData).subscribe(
    this.http.post(this.baseUrl + 'changecolor/' + this.noteId , this.noteDataColor, httpOptions).subscribe(
    (response) => {console.log('success', response);
    },
    (error) => {console.log('error', error); }
  );
}

}
