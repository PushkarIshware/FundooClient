import { Component, OnInit } from '@angular/core';
import { ViewService } from 'src/app/services/viewservice/view.service';
import { UserService } from 'src/app/services/UserServices/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
icon: any = 'view_stream';
  data: Object;
  Search: any;
  constructor(private ser: SearchService, private router: Router, private http: HttpClient,
     private view: ViewService, private service: UserService) { }

  ngOnInit() {
  }
  // logout() {
  //   localStorage.removeItem('token');
  // }

  openSearch() {
    this.router.navigate(['dashboard/search']);
  }
  lookFor() {
this.ser.changeMessage(this.Search);
  }
changeView() {
  if (this.icon === 'view_stream') {
    this.icon = 'dashboard';
    this.view.changeMessage('column wrap');
  } else {
    this.icon = 'view_stream';
    this.view.changeMessage('row wrap');
  }
}

notify() {
  console.log('upcoming events......');
  const httpOptions = {
    headers: new HttpHeaders({

      // 'Authorization': localStorage.getItem('user_id');
      'Authorization': localStorage.getItem('token')
    })
  };
  this.http.get('http://127.0.0.1:8000/api/reminder', httpOptions).subscribe(
        (response) => {console.log('success', response);
      this.data = response;
      },
        (error) => {console.log('error', error);
      });
}

logout() {
  localStorage.removeItem('token');
  // this.router.navigateByUrl('');
  this.router.navigate(['']);
}

}
