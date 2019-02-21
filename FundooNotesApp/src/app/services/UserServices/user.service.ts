import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { LoginModel } from 'src/app/model/Login.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
user: LoginModel = new LoginModel();
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
  // forgotPassword(userData) {
  //   console.log(userData);
  //   return this.http.options<any>('http://127.0.0.1:8000/password_reset');
  // }
  // Calling profile API
  profile(userData) {
    return this.http.post(this.baseUrl + 'profile', userData, {responseType: 'json'});
  }
}
