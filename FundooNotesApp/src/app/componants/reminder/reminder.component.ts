import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/UserServices/user.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {

  constructor(private service: UserService) { }
  data: any;
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
