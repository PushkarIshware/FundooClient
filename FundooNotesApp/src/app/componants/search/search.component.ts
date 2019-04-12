import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/UserServices/user.service';
import { HttpClient } from '@angular/common/http';
import { SearchService } from 'src/app/services/search.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  data: any;
  Search: any;

  constructor(private http: HttpClient, private ser: SearchService,
    private service: UserService) { }

  ngOnInit() {
    this.ser.currentMessage.subscribe(message => {
      this.Search = message;
    });
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
}
