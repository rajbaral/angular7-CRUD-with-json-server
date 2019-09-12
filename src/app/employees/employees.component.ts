import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
    selectedEmployee: any = {};
    employees = [];

    constructor(public appService: AppService, private router: Router) { }

    ngOnInit() {
        this.getEmployeesList();
    }
    getEmployeesList() {
        this.appService.getEmployees().subscribe(employees => (this.employees = employees));
    }

    goToAddEmployeeForm() {
        this.appService.currentEmployee = null;
        this.router.navigate(['employee-details/0']);
    }

    logout() {
        this.appService.username = '';
        this.router.navigate(['/login']);
    }
    editEmployeeByID(id: number) {
        const employee = this.employees.find(x => x.id === id);
        this.appService.currentEmployee = employee;
        console.log(employee);
        this.router.navigate(['employee-details/' + id]);
    }

    deleteEmployeeById(id: number) {
        this.appService.deleteEmployee(id).subscribe(result => {
            alert('Construction Site Employee Deleted');
            this.appService.getEmployees().subscribe(employees => (this.employees = employees));
        });
    }
}
