import { Component, OnInit, Injectable, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Router, NavigationExtras } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/UserServices/user.service';
import { ProfileModel } from 'src/app/model/Profile.model';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ViewService } from 'src/app/services/viewservice/view.service';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.scss']
})
export class ProfileDialogComponent implements OnInit {
  baseUrl = environment.baseUrl;

  profileForm: FormGroup;

  error: string;

  fileUpload = { status: '', message: '', filePath: '' };

  imageChangedEvent: any = '';

  croppedImage: any = '';

  pic_data: { 'profile1': any; };
  usernameData: Object;

  // tslint:disable-next-line:max-line-length
  constructor(private http: HttpClient, private fb: FormBuilder, private cd: ChangeDetectorRef,
    private view: ViewService, private service: UserService,
    private snackBar: MatSnackBar, private router: Router, private formBuilder: FormBuilder) {


  }

  ngOnInit() {
    this.profileForm = this.fb.group({
      profile: ['']
    });
  }
  onSelectedFile(event) {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  onSubmit(croppedImage) {

    const formData = new FormData();

    formData.append('profile', croppedImage);
    this.pic_data = {
      'profile1': formData.get('profile'),
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')
      })
    };
    this.http.post(this.baseUrl + 'RestProfile', this.pic_data, httpOptions).subscribe(
      (response) => {
        this.usernameData = response['data'];
        this.view.changeMessagep(this.usernameData);
        this.router.navigate(['/dashboard'], this.usernameData);
      },
      (error) => {
      });
  }
}
