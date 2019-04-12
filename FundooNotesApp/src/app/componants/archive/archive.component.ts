import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/UserServices/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
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
      (response) => {
        this.data = response;
      },
      (error) => { }
    );
  }

  archiveNote(note) {
    this.archivevalue = note.is_archived;
    this.archivevalue = !this.archivevalue;
    this.noteData = {
      'id': note.id,
      'is_archived': this.archivevalue,
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')
      })
    };
    this.http.post(this.baseUrl + 'archive/' + note.id, this.noteData, httpOptions).subscribe(
      (response) => {
      },
      (error) => { }
    );
  }

  stopPropagation1(event) {
    event.stopPropagation();
  }
  delete_note(note) {
    this.deletevalue = true;
    this.noteDataDel = {
      'id': note.id,
      'is_deleted': this.deletevalue,
      'deleted_time': this.myDate,
    };
    const httpOptions = {
      headers: new HttpHeaders({

        'Authorization': localStorage.getItem('token')
      })
    };
    this.http.post(this.baseUrl + 'deletenote/' + note.id, this.noteDataDel, httpOptions).subscribe(
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
