import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/UserServices/user.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  data: any;
  constructor(private service: UserService) { }

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

}
