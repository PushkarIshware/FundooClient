import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginModel } from 'src/app/model/Login.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.baseUrl;
  z: string;
  constructor(private http: HttpClient) { }
  login(userData) {
    return this.http.post(this.baseUrl + 'login', userData, { responseType: 'json' });
  }
  register(userData) {
    return this.http.post(this.baseUrl + 'registration', userData, { responseType: 'json' });
  }
  forgotPassword(userData) {
    return this.http.get('http://127.0.0.1:8000/password_reset/');
  }

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

        'Authorization': localStorage.getItem('token')
      })
    };
    return this.http.post(this.baseUrl + 'note', userData, httpOptions);
  }
  getNotes() {
    const httpOptions = {
      headers: new HttpHeaders({

        'Authorization': localStorage.getItem('token')
      })
    };
    return this.http.get(this.baseUrl + 'shownotes', httpOptions);
  }

  getUrl() {
    const httpOptions = {
      headers: new HttpHeaders({

        'Authorization': localStorage.getItem('token')
      })
    };
    return this.http.get(this.baseUrl + 'get_url', httpOptions);
  }



  update(userData) {
    const httpOptions = {
      headers: new HttpHeaders({

        'Authorization': localStorage.getItem('token')
      })
    };
    return this.http.post(this.baseUrl + 'updatenote', userData, httpOptions);
  }


  postFile(fileToUpload: File) {
    const endpoint = this.baseUrl + 'profile';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    this.z = JSON.stringify(formData);
    return this.http.post(endpoint, this.z);
  }


  upload(file: File) {
    // tslint:disable-next-line:prefer-const
    let headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');

    const formData: FormData = new FormData();
    formData.append('pic', file);


    return this.http.post(this.baseUrl + 'profile', formData.get('pic'));
  }

  uploadnew(formData) {
    return this.http.post(this.baseUrl + 'profile', formData);
  }

  public loggIn() {
    return !!localStorage.getItem('token');
  }

}
