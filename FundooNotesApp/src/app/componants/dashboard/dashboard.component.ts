import { Component, OnInit } from '@angular/core';
import { ViewService } from 'src/app/services/viewservice/view.service';
import { UserService } from 'src/app/services/UserServices/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';
import { ProfileDialogComponent } from '../profile-dialog/profile-dialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
// import { environment } from 'src/environments/environment';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  baseUrl = environment.baseUrl;

icon: any = 'view_stream';
  data: Object;
  Search: any;
  profile: any;
  DataLabels: Object;
  URLdata: Object;
  Unamedata: any;
  constructor(public dialog: MatDialog, private ser: SearchService, private router: Router, private http: HttpClient,
     private view: ViewService, private service: UserService) { }

  ngOnInit() {
    this.view.currentMessagep.subscribe(message => this.profile = message);
    console.log(this.profile);
    this.getUrl();
    // this.ShowLabels();
  }
  // logout() {
  //   localStorage.removeItem('token');
  // }

  openSearch() {
    this.router.navigate(['/dashboard/search']);
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
  this.http.get(this.baseUrl + 'reminder', httpOptions).subscribe(
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
ShowLabels() {
  console.log('showing labels');
  const httpOptions = {
    headers: new HttpHeaders({

      // 'Authorization': localStorage.getItem('user_id');
      'Authorization': localStorage.getItem('token')
    })
  };
  this.http.get(this.baseUrl + 'showlabel', httpOptions).subscribe(
        (response) => {console.log('success', response);
      this.DataLabels = response;
      },
        (error) => {console.log('error', error);
      });
}

deleteLabel(label) {
  console.log(label.id);
  const httpOptions = {
    headers: new HttpHeaders({

      'Authorization': localStorage.getItem('token')
    })
  };
  this.http.delete(this.baseUrl + 'deletelabel/' + label.id, httpOptions).subscribe(
  (response) => {console.log('success', response);
  // this.DataLabels = response;
  // console.log('dataa', this.data);
  },
  (error) => {console.log('error', error); }
);
}

getUrl() {
  this.service.getUrl().subscribe(
    (response) => {
      // tslint:disable-next-line:forin

      // console.log('success get notes', response['data']);
      this.URLdata = response['data'];
      this.Unamedata = response['username'];
      // console.log(this.data);
  // this.uid = localStorage.getItem('user_id');
  },
    (error) => {console.log('error', error); }
    );
}

openDialog(): void {
  const dialogRef = this.dialog.open(ProfileDialogComponent,
   {
  //  data : {
  //    id: card.id,
  //    title: card.title,
  //    description: card.description,
  //    color: card.color,
  //    is_pinned: card.pinValue,
  //    is_archived: card.archivevalue,
  //  }
  }
  );
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}
}
