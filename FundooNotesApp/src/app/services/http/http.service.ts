import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl = environment.baseUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    })
  };
  constructor(private http: HttpClient) { }

  ShowLabels() {
    return this.http.get(this.baseUrl + 'getmaplabels', this.httpOptions);
  }
  archiveNote(noteData, note_id) {
    return this.http.post(this.baseUrl + 'archive/' + note_id, noteData, this.httpOptions);
  }
  pin(noteData, note_id) {
    return this.http.post(this.baseUrl + 'pinunpin/' + note_id, noteData, this.httpOptions);
  }
  delete_note(noteData, note_id) {
    return this.http.post(this.baseUrl + 'deletenote/' + note_id, noteData, this.httpOptions);
  }
  CreateLabel(labelData) {
    return this.http.post(this.baseUrl + 'createlabel', labelData, this.httpOptions);
  }
  showLabelsMapping() {
    return this.http.get(this.baseUrl + 'showlabel', this.httpOptions);
  }
  setLabels(setLabels) {
    return this.http.post(this.baseUrl + 'maplabel', setLabels, this.httpOptions);
  }

}
