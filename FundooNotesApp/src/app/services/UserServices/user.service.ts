import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { LoginModel } from 'src/app/model/Login.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
// user: LoginModel = new LoginModel();
// Importing BaseUrl from environment file
baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }
  // calling login API
  login(userData) {
    console.log(userData);
    return this.http.post(this.baseUrl + 'login', userData, {responseType: 'json'});
}
  // Calling register API
  register(userData) {
  return this.http.post(this.baseUrl + 'registration', userData, {responseType: 'json'});
}
  forgotPassword(userData) {
    console.log(userData);
    return this.http.get('http://127.0.0.1:8000/password_reset/');
  }
  // Calling profile API
  profile(userData) {
    return this.http.post(this.baseUrl + 'profile', userData, {responseType: 'json'});
  }
  // Calling Notes API
  public PostForm(url: any, data: any) {
    const httpOptions = {
      headers: new HttpHeaders({

        'Authorization': localStorage.getItem('data')
      })
    };
    return this.http.post(url, data, httpOptions);
  }
  createnotes(userData) {
    const httpOptions = {
    headers: new HttpHeaders({

    // 'Authorization': localStorage.getItem('user_id')
    'Authorization': localStorage.getItem('token')
  })
};
    return this.http.post(this.baseUrl + 'note', userData, httpOptions);
  }
  // Display All Notes API
  getNotes() {
    const httpOptions = {
      headers: new HttpHeaders({

        // 'Authorization': localStorage.getItem('user_id');
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log(httpOptions);
    return this.http.get(this.baseUrl + 'shownotes', httpOptions);
  }
}
