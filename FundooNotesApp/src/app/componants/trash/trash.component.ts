import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/UserServices/user.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  data: any;
  constructor(private service: UserService, private http: HttpClient) { }
  baseUrl = environment.baseUrl;

  ngOnInit() {
    this.getNoteData();

  }
  getNoteData() {
    this.service.getNotes().subscribe(
      (response) => {
        this.data = response;
      },
      (error) => { }
    );
  }
  DeleteForever(note) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')
      })
    };
    this.http.delete(this.baseUrl + 'deleteforever/' + note.id, httpOptions).subscribe(
      (response) => {
      },
      (error) => {
      }
    );
  }
}
