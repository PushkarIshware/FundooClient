import { Component, OnInit, Injectable, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/UserServices/user.service';
import { ProfileModel } from 'src/app/model/Profile.model';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.scss']
})
export class ProfileDialogComponent implements OnInit {
  profileForm: FormGroup;

  error: string;

  fileUpload = {status: '', message: '', filePath: ''};



  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef, private service: UserService,
     private snackBar: MatSnackBar, private router: Router, private formBuilder: FormBuilder) {


      }

  ngOnInit() {
    this.profileForm = this.fb.group({
      // name: [''],
      profile: ['']
    });
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
    // formData.append('name', this.profileForm.get('name').value);
    formData.append('profile', this.profileForm.get('profile').value);

    console.log('=======', this.profileForm.get('profile').value);

    this.service.uploadnew(formData).subscribe(data => {
      console.log(data);
      }, error => {
        console.log(error);
      });
  }
}
