import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/UserServices/user.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {
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
  deletevalue: boolean;
  noteData: { 'id': any; 'is_deleted': boolean; 'deleted_time': any; };
  archivevalue: boolean;
  noteDataArch: { 'id': any; 'is_archived': boolean; 'archive_time': Date; };
  collab_name = new FormControl('');
  date = new FormControl('');
  collab_data: { 'id': any; 'new_username': any; };
  addCollab: Object;
  DataCollaborator_show: Object;
  noteDataDate: {
    'id': any;
    'reminder': any;
  };
  noteDataColor: { 'id': any; 'color': any; };
  noteId: any;

  constructor(private service: UserService, private http: HttpClient) { }
  baseUrl = environment.baseUrl;
  data: any;
  myDate = new Date();
  ngOnInit() {
    this.getNoteData();
    this.showCollaborators();
  }
  getNoteData() {
    this.service.getNotes().subscribe(
      (response) => {
        this.data = response;
      },
      (error) => { }
    );
  }
  stopPropagation1(event) {
    event.stopPropagation();
  }
  delete_note(note) {
    this.deletevalue = true;
    this.noteData = {
      'id': note.id,
      'is_deleted': this.deletevalue,
      'deleted_time': this.myDate,
    };
    const httpOptions = {
      headers: new HttpHeaders({

        'Authorization': localStorage.getItem('token')
      })
    };
    this.http.post(this.baseUrl + 'deletenote/' + note.id, this.noteData, httpOptions).subscribe(
      (response) => {
      },
      (error) => {
      }
    );
  }

  archiveNote(note) {
    this.archivevalue = note.is_archived;
    this.archivevalue = !this.archivevalue;
    this.noteDataArch = {
      'id': note.id,
      'is_archived': this.archivevalue,
      'archive_time': this.myDate,
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')
      })
    };
    this.http.post(this.baseUrl + 'archive/' + note.id, this.noteDataArch, httpOptions).subscribe(
      (response) => {
      },
      (error) => {
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
    this.http.post(this.baseUrl + 'addcollaborator', this.collab_data, httpOptions).subscribe(
      (response) => {
        this.addCollab = response;
      },
      (error) => {
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
  remainder(note) {
    this.noteDataDate = {
      'id': note.id,
      'reminder': this.date.value,
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')
      })
    };
    this.http.post(this.baseUrl + 'set_reminder/' + note.id, this.noteDataDate, httpOptions).subscribe(
      (response) => {
      },
      (error) => {
      }
    );
  }

  note_id(noteId) {
    this.noteId = noteId;
  }

  changeColor(color, note) {
    this.data.color = color;
    this.noteDataColor = {
      'id': this.noteId,
      'color': this.data.color,
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')
      })
    };
    this.http.post(this.baseUrl + 'changecolor/' + this.noteId, this.noteDataColor, httpOptions).subscribe(
      (response) => {
      },
      (error) => { }
    );
  }
}


