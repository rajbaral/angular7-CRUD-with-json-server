import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { AppService } from './app.service';

import { AppComponent } from './app.component';
import { BannerComponent } from './banner/banner.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeesComponent } from './employees/employees.component';
import { LoginComponent } from './login/login.component';
import { EmployeeGuard } from './guards/employee.guard';

// We may be missing a route...
const ROUTES = [
  {
    path: '',
    redirectTo: 'employees',
    pathMatch: 'full'
  },
  {
      path: 'employees',
      component: EmployeesComponent, canActivate: [EmployeeGuard]},
  {
    path: 'employee-details/:id',
      component: EmployeeDetailsComponent, canActivate: [EmployeeGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

// Notice how both FormsModule and ReactiveFormsModule imported...choices, choices!
@NgModule({
    declarations: [AppComponent, BannerComponent, EmployeeDetailsComponent, EmployeesComponent, LoginComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
    providers: [AppService, HttpClient, EmployeeGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
