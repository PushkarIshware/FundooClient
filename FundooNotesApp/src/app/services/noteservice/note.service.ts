import { Injectable } from '@angular/core';
import { UserService } from '../UserServices/user.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NoteService {
  baseUrl = environment.baseUrl;

  constructor(private svc: UserService) { }

  createNotes(userData) {
    return this.svc.PostForm(this.baseUrl + 'note', userData);
  }
}
