import { Component, OnInit, Injectable, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
// import { environment } from 'src/environments/environment';

import { environment } from 'src/environments/environment.prod';

import { UserService } from 'src/app/services/UserServices/user.service';
import { ProfileModel } from 'src/app/model/Profile.model';
// import { start } from 'repl';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})



export class ProfileComponent implements OnInit {
  user: ProfileModel = new ProfileModel();
  photoData: any;
  // selectedFile: ImageSnippet;
  // file: any;
  fileToUpload: File ;
  da: { 'pic': File; };

  profileForm: FormGroup;
  error: string;

  fileUpload = {status: '', message: '', filePath: ''};

  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef, private service: UserService, private snackBar: MatSnackBar, private router: Router, private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.profileForm = this.fb.group({
      name: [''],
      profile: ['']
    });
  }

  handleFileInput(files: File)  {
    this.fileToUpload = files;
    // return this.fileToUpload;
}
// working
// uploadFileToActivity() {
//   this.userData = {
//     'id': '100',
//     'pic' : this.fileToUpload
//   };
//   console.log('userdata is ', this.userData);
//   this.service.postFile(this.userData).subscribe(data => {
//     // do something, if upload success
//     console.log(data);
//     }, error => {
//       console.log(error);
//     });
// }

uploadFileToActivity() {
  this.service.postFile(this.fileToUpload).subscribe(data => {
    console.log(data);
    }, error => {
      console.log(error);
    });
}

uploadImage(imageInput) {
  const file: File = imageInput.files[0];
  console.log(file.name);
  this.da = {
    'pic': file,

  };
  console.log('img', this.da);
  this.service.upload(file).subscribe(
    Response => {
      console.log('success', Response);
      }, error => {
        console.log(error);
      }
  );
}


onSelectedFile(event) {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.profileForm.get('profile').setValue(file);
    console.log(this.profileForm.get('profile').setValue(file));
  }
}
onSubmit() {
  const formData = new FormData();
  formData.append('name', this.profileForm.get('name').value);
  formData.append('profile', this.profileForm.get('profile').value);

  console.log('=======', this.profileForm.get('profile').value);

  this.service.uploadnew(formData).subscribe(data => {
    console.log(data);
    }, error => {
      console.log(error);
    });
}




}
