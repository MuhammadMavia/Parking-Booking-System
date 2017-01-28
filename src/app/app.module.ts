import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {MaterialModule} from '@angular/material';
import {DatepickerModule} from 'angular2-material-datepicker';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {DataService}from './data.service'

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SelectDateComponent} from './select-date/select-date.component';
import {SelectAreaComponent} from './select-area/select-area.component';
import {GiveFeedbackComponent} from './give-feedback/give-feedback.component';
import {ViewResarvedComponent} from './view-resarved/view-resarved.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'select-date', component: SelectDateComponent},
  {path: 'select-area', component: SelectAreaComponent},
  {path: 'giveFeedback', component: GiveFeedbackComponent},
  {path: 'booking', component: ViewResarvedComponent},
  {path: 'adminDashboard', component: AdminDashboardComponent},
  {path: '**', component: LoginComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    DashboardComponent,
    SelectDateComponent,
    SelectAreaComponent,
    GiveFeedbackComponent,
    ViewResarvedComponent,
    AdminDashboardComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    MaterialModule.forRoot(),
    BrowserModule,
    DatepickerModule,
    FormsModule,
    HttpModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
