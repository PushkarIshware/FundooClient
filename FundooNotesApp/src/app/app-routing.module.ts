import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './componants/login/login.component';
import { RegisterComponent } from './componants/register/register.component';
import { DashboardComponent } from './componants/dashboard/dashboard.component';
import { CreateNotesComponent } from './componants/create-notes/create-notes.component';
import { ForgotPasswordComponent } from './componants/forgot-password/forgot-password.component';
import { AddNotesComponent } from './componants/add-notes/add-notes.component';
import { NewPasswordComponent } from './componants/new-password/new-password.component';
import { ProfileComponent } from './componants/profile/profile.component';

const routes: Routes = [
  {
    path : '',
        component: LoginComponent
  },
    {
      path : 'register',
      component: RegisterComponent
      },
      {
        path : 'login/:activate/:uid/:token/',
        component: LoginComponent
        },
        {
          path : 'forgotpassword',
          component: ForgotPasswordComponent
          },
          {
            path: 'newpassword',
            component: NewPasswordComponent
          },
          {
            path: 'profile',
            component: ProfileComponent
          },
          {
            path : 'dashboard',
            component: DashboardComponent,
            children: [
              {
                path: 'addnotes',
                component: AddNotesComponent
              },
              {
                path: '',
                component: AddNotesComponent
              },
              {
                path: 'notes',
                component: CreateNotesComponent
              },
           ]
           },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
