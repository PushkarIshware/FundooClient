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
  ],
  entryComponents: [
    DialogboxComponent,
    ProfileDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
