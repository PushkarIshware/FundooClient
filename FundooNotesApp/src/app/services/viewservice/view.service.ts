import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  private messageSource = new BehaviorSubject('row wrap');
  currentMessage = this.messageSource.asObservable();

  private messageSourcep = new BehaviorSubject('profile');
  currentMessagep = this.messageSourcep.asObservable();
  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  changeMessagep(profile: any) {
    this.messageSourcep.next(profile);
    console.log('services', this.messageSourcep);
  }
}
