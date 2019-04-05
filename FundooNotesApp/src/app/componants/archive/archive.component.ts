import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/UserServices/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
  baseUrl = environment.baseUrl;

  data: any;
  archivevalue: boolean;
  noteData: { 'id': any; 'is_archived': boolean; };
  constructor(private service: UserService, private http: HttpClient) { }

  ngOnInit() {
    this.getNoteData();
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
}
