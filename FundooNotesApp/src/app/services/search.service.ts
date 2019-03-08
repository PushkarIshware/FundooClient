import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
private messageSource = new Subject();
currentMessage = this.messageSource.asObservable();


  constructor() { }
changeMessage(message: string) {
  this.messageSource.next();

}
}
