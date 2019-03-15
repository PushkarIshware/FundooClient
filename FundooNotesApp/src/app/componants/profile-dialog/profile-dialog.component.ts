import { Component, OnInit, Injectable, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/UserServices/user.service';
import { ProfileModel } from 'src/app/model/Profile.model';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.scss']
})
export class ProfileDialogComponent implements OnInit {
  profileForm: FormGroup;

  error: string;

  fileUpload = {status: '', message: '', filePath: ''};

  imageChangedEvent: any = '';

  croppedImage: any = '';
  pic_data: { 'profile1': any; };

  // tslint:disable-next-line:max-line-length
  constructor(private http: HttpClient, private fb: FormBuilder, private cd: ChangeDetectorRef, private service: UserService,
     private snackBar: MatSnackBar, private router: Router, private formBuilder: FormBuilder) {


      }

  ngOnInit() {
    this.profileForm = this.fb.group({
      // name: [''],
      profile: ['']
    });
  }
  onSelectedFile(event) {
    this.imageChangedEvent = event;
    // const file = this.imageChangedEvent;
    // this.profileForm.get('profile').setValue(file);
    // console.log(this.profileForm.get('profile').setValue(file));
    // console.log(file);

    // if (event.target.files.length > 0) {
    //   const file = event.target.files[0];
    //   this.profileForm.get('profile').setValue(file);
    //   console.log(this.profileForm.get('profile').setValue(file));
    // }
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    // this.pic_data = {
    //   'profile1': this.croppedImage,
    // };
    // console.log(this.pic_data);
    // this.profileForm.get('profile').setValue(this.croppedImage);
    // console.log(this.profileForm.get('profile').setValue(this.croppedImage));
    // console.log('cropped image', this.imageCropped);
}

  onSubmit(croppedImage) {

    console.log(croppedImage);
    const formData = new FormData();
    // this.profileForm.get('profile').setValue(this.croppedImage);
    // formData.append('profile', this.profileForm.get('profile').value);
    formData.append('profile', croppedImage);
     this.pic_data = {
      'profile1': formData.get('profile'),
    };
    console.log(this.pic_data);

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('label adding functions', this.pic_data);
    this.http.post('http://127.0.0.1:8000/api/RestProfile' , this.pic_data, httpOptions).subscribe(
    (response) => {console.log('success', response);
    // console.log('dataa', this.data);
    },
    (error) => {console.log('error', error);
  });
  }


  // onSubmit() {
  //   const formData = new FormData();
  //   // formData.append('name', this.profileForm.get('name').value);
  //   formData.append('profile', this.profileForm.get('profile').value);

  //   console.log('=======', this.profileForm.get('profile').value);

  //   this.service.uploadnew(formData).subscribe(data => {
  //     console.log(data);
  //     }, error => {
  //       console.log(error);
  //     });
  // }
}
