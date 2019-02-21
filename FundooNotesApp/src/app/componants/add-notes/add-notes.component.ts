import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
// import { CreateNote } from 'src/app/models/createnote.model';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/services/UserServices/user.service';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.scss']
})
export class AddNotesComponent implements OnInit {
  flag = false;
  isActive = false;
  pinValue = false;
  archiveValue = false;
  pinnedIconSrc = '../../assets/Icons/pinIcon.svg';
  unpinnedIconSrc = '../../assets/Icons/unpinIcon.svg';
  colorCode: Array<Object> = [
    { name: 'white', colorCode: '#fff' },
    { name: 'red', colorCode: '#fc8981' },
    { name: 'orange', colorCode: '#ffb834' },
    { name: 'yellow', colorCode: '#fff181' },
    { name: 'green', colorCode: '#c5fd98' },
    { name: 'teal', colorCode: '#96ffec' },
    { name: 'blue', colorCode: '#c4f0f7' },
    { name: 'darkblue', colorCode: '#a6cbf7' },
    { name: 'purple', colorCode: '#d9aff7' },
    { name: 'pink', colorCode: '#ffcee6' },
    { name: 'brown', colorCode: '#e9c7a9' },
    { name: 'gray', colorCode: '#e7e9ec' }
  ];
  color: any = '#fffff';
  notificationIcon = '../../assets/Icons/notification.svg';
  noteData: any;
  // note : CreateNote =new CreateNote;
// title = new FormControl(this.note.title)
// description = new FormControl(this.note.description)
title = new FormControl('');
description = new FormControl('');
  constructor(private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer, private snackBar: MatSnackBar, private service: UserService
    ) {
      this.matIconRegistry.addSvgIcon(
        'unpinIcon',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/Icons/unpinIcon.svg'),
      );
      this.matIconRegistry.addSvgIcon(
        'pinIcon',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/Icons/pinIcon.svg'),
      );
   }

  ngOnInit() {
  }
  showDiv() {
    // console.log('called div');
    this.flag = ! this.flag;
  }
  pin() {
  }
  archive() {
  }
  CreateNotes() {
  }
  Color(color) {
    this.color = color;
  }
}
