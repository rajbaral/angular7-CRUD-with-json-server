import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    // If false, the application will run on 4200 and call json-server directly
    // If true, the application will utilize node API
    DEBUG: Boolean = true;
    api: string;
    username: string;
    isLoggedIn: boolean;
    // password hard coded just for sake of demonstration of auth guard
    password: string;
    employees: any[] = [];
    sites: any[] = [];
    currentEmployee: any;

    constructor(private http: HttpClient, private router: Router) {
        if (this.DEBUG) {
            this.api = 'http://localhost:3000';
        } else {
            this.api = 'http://localhost:8000/api';
        }
    }

    // Returns all employees
    getEmployees() {
        return this.http.get(`${this.api}/employees`).pipe(catchError(this.handleError));
    }

    addEmployee(employeeForm) {
        return this.http.post(`${this.api}/employees`, employeeForm).pipe(catchError(this.handleError));
    }

    editEmployee(employeeForm) {
        return this.http.put(`${this.api}/employees/${employeeForm.id}`, employeeForm).pipe(catchError(this.handleError));
    }
    deleteEmployee(id: number) {
        return this.http.delete(`${this.api}/employees/${id}`).pipe(catchError(this.handleError));
    }

    login() {
        if (this.username === 'admin' && this.password === 'password') {
            this.isLoggedIn = true;
            this.router.navigate(['employees']);
        } else {
            alert('You do not have permission.');
        }
    }

    getSites() {
        return this.http.get(`${this.api}/sites`).pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
        }
        return [];
    }
}
