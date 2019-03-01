import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserService } from 'src/app/services/UserServices/user.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import { notEqual } from 'assert';
@Component({
  selector: 'app-create-notes',
  templateUrl: './create-notes.component.html',
  styleUrls: ['./create-notes.component.scss']
})
export class CreateNotesComponent implements OnInit {
  // rewriting code

  deletevalue = false;

  data: any;

  color: any;

  footerData: any;

  deleteData: { 'isDeleted': boolean; 'noteIdList': any[]; };

  archivevalue = false;

  archiveData: { 'isArchived': boolean; 'noteIdList': any[]; };

  pinValue = false;

  id: any;

  updateData: any;

  pinData: { 'isPined': boolean; 'noteIdList': any[]; };

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

  ColorData: { 'color': boolean; 'noteIdList': any[]; };

  carddata = this.data;

  constructor(private service: UserService, public dialog: MatDialog, private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {

      // constructor body
      this.matIconRegistry.addSvgIcon(
        'unpinIcon',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/Icons/unpinIcon.svg'),
      );
      this.matIconRegistry.addSvgIcon(
        'pinIcon',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/Icons/pinIcon.svg'),
      );
     }
  // data: any;
  uid: any;

  ngOnInit() {
    this.getNoteData();
  }

  // getting data from database calling service method.
  getNoteData() {
    this.service.getNotes().subscribe(
      (response) => {console.log('success get notes', response);
  this.data = response;
    // this.uid = localStorage.getItem('user_id');
    },
      (error) => {console.log('error', error); }
      );
  }

// Methods for all
pin(card) {
  console.log('called pin');
  this.pinValue = ! this.pinValue;
  console.log(card.id);
  this.pinData = {
    'isPined': this.deletevalue,
    'noteIdList': [card.id]
  };
  console.log(this.pinData);

  // this.service.pinnote(this.pinData).subscribe(
  //   (response) => {console.log('success', response);
  // console.log(this.data);
  // },
  //   (error) => {console.log('error', error); }
  // );
}

changeColor(color) {

  this.color = color;
  // card.color = color;
  console.log(this.color, this.id);
  this.ColorData = {
    'color': this.color,
    'noteIdList': [this.id]
  };
  console.log(this.ColorData);

  // this.service.colornote(this.ColorData).subscribe(
  //   (response) => {console.log('success', response);
  // console.log(this.data);
  // },
  //   (error) => {console.log('error', error); }
  // );

}

getcolorid(card) {
 this.id = card.id;
console.log(this.id);
}

delete(card) {
 console.log(card.id);
 console.log('deleted');
 this.deletevalue = ! this.deletevalue;
 console.log(this.deletevalue);

this.deleteData = {
'isDeleted': this.deletevalue,
'noteIdList': [card.id]
};
console.log(this.deleteData);

// Delete note service method
// this.service.trashnote(this.deleteData).subscribe(
// (response) => {console.log('success', response);
// console.log(this.data);
// },
// (error) => {console.log('error', error); }
// );

}

archive(card) {
  console.log(card.id);
 console.log('archived');
 this.archivevalue = ! this.archivevalue;

this.archiveData = {
'isArchived': this.archivevalue,
'noteIdList': [card.id]
};
console.log(this.archiveData);

// Archive note service methods
// this.service.archivednote(this.archiveData).subscribe(
// (response) => {console.log('success', response);
// console.log(this.data);
// },
// (error) => {console.log('error', error); }
// );
// this.updateNotes(card);
}

updateNotes(card) {
  this.updateData = {
    'noteId': card.id,
    'title': card.title,
    'description': card.description
  };
  console.log('dataaaaa', this.updateData);

  // update note services

  // this.service.updatednote(this.updateData).subscribe(
  //   (response) => {console.log('success', response);
  // console.log(this.data);
  // },
  //   (error) => {console.log('error', error); }
  // );
}
// THIS is New Componant for dialog block

openDialog(card): void {
  const dialogRef = this.dialog.open(DialogboxComponent,
   {
   data : {
     id: card.id,
     title: card.title,
     description: card.description,
     color: card.color,
     is_pinned: card.is_pinned
   }
  }
  );
  console.log(card.id);
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}
}

