import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/UserServices/user.service';
@Component({
  selector: 'app-create-notes',
  templateUrl: './create-notes.component.html',
  styleUrls: ['./create-notes.component.scss']
})
export class CreateNotesComponent implements OnInit {

  constructor(private service: UserService) { }
  data: any;

  ngOnInit() {
    this.getNoteData();
  }
  getNoteData() {
    this.service.getNotes().subscribe(
      (response) => {console.log('success get notes', response);
    this.data = response;
    },
      (error) => {console.log('error', error); }
      );
  }
}
