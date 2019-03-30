import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { from } from 'rxjs';
import {MaterialModule} from './material';
import { RegisterComponent } from './componants/register/register.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './componants/login/login.component';
import { DashboardComponent } from './componants/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './componants/forgot-password/forgot-password.component';
import { AddNotesComponent } from './componants/add-notes/add-notes.component';
import { MenubarComponent } from './componants/menubar/menubar.component';
import { CreateNotesComponent } from './componants/create-notes/create-notes.component';
import { NewPasswordComponent } from './componants/new-password/new-password.component';
import { ProfileComponent } from './componants/profile/profile.component';
import { DialogboxComponent } from './componants/dialogbox/dialogbox.component';
import { ArchiveComponent } from './componants/archive/archive.component';
import { TrashComponent } from './componants/trash/trash.component';
import { ReminderComponent } from './componants/reminder/reminder.component';
import { SearchComponent } from './componants/search/search.component';
import { SearchPipe } from './pipe/search.pipe';
import { ProfileDialogComponent } from './componants/profile-dialog/profile-dialog.component';
// import { AddNotesComponent } from './componants/add-notes/add-notes.component';
import { ImageCropperModule } from 'ngx-image-cropper';

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
  LinkedinLoginProvider,
} from 'angular-6-social-login';

// Configs
export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('2375513825801070')
        },
        // {
        //   id: GoogleLoginProvider.PROVIDER_ID,
        //   provider: new GoogleLoginProvider('Your-Google-Client-Id')
        // },
          // {
          //   id: LinkedinLoginProvider.PROVIDER_ID,
          //   provider: new LinkedinLoginProvider('1098828800522-m2ig6bieilc3tpqvmlcpdvrpvn86q4ks.apps.googleusercontent.com')
          // },
      ]
  );
  return config;
}



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    AddNotesComponent,
    MenubarComponent,
    CreateNotesComponent,
    NewPasswordComponent,
    ProfileComponent,
    DialogboxComponent,
    ArchiveComponent,
    TrashComponent,
    ReminderComponent,
    SearchComponent,
    SearchPipe,
    ProfileDialogComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FlexLayoutModule,
    ImageCropperModule,
    SocialLoginModule,
  ],
  entryComponents: [
    DialogboxComponent,
    ProfileDialogComponent
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
