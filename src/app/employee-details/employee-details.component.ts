import { Component, OnInit, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';

// This interface may be useful in the times ahead...
interface Employee {
  firstName: string;
  lastName: string;
  jobTitle: string;
  site: string;
  status: string;
}

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit, OnChanges {
  editmode = false;
  employeeModel: Employee;
  employeeForm: FormGroup;
  submitted = false;
  alertType: String;
  alertMessage: String;
  sites = [];
  selectedEmployee: any;
  currentSite: any;
  errorMessage: any;

  constructor(private fb: FormBuilder,
    private appService: AppService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.appService.getSites().subscribe(sites => {
      this.sites = sites;
    },
      error => {
        this.errorMessage = error;
        console.log(this.errorMessage);
      });
    const id = this.activatedRoute.snapshot.params.id;



    this.selectedEmployee = this.appService.currentEmployee;
    if (this.selectedEmployee) { this.editmode = true; }


    this.employeeForm = this.fb.group({
      id: [this.selectedEmployee ? this.selectedEmployee.id : null],
      firstName: [this.selectedEmployee ? this.selectedEmployee.firstName : null, Validators.required],
      lastName: [this.selectedEmployee ? this.selectedEmployee.lastName : null, Validators.required],
      jobTitle: [this.selectedEmployee ? this.selectedEmployee.jobTitle : null, Validators.required],
      site: [this.selectedEmployee ? this.selectedEmployee.siteName : null, Validators.required],
      status: [this.selectedEmployee ? this.selectedEmployee.status : null, Validators.required],
    });
  }

  getSiteList() {
    this.appService.getSites().subscribe(sites => (this.sites = sites));
  }

  back() {
    this.appService.currentEmployee = null;
    this.router.navigate(['/employees']);
  }
  ngOnChanges(change: SimpleChanges) {
  }


  onSubmit(form: FormGroup) {
    this.employeeModel = form.value;
    if (this.editmode) {
      this.appService.editEmployee(this.employeeModel).subscribe(result => {
        this.router.navigate(['/employees']);
      });
    } else {
      this.appService.addEmployee(this.employeeModel).subscribe(result => {
        this.router.navigate(['/employees']);
      });
    }


  }
}
