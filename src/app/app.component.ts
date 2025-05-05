import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EmployeeModel } from './model/Employee';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  employeeForm: FormGroup = new FormGroup({});

  employeeObj: EmployeeModel = new EmployeeModel();

  employeeList: EmployeeModel[] = [];

  constructor() {
    debugger;
    this.createForm();
    const data = localStorage.getItem('employeeData');
    if (data != null) {
      this.employeeList = JSON.parse(data);
    }
  }


  createForm() {
    this.employeeForm = new FormGroup({
      empId: new FormControl(this.employeeObj.empId),
      empName: new FormControl(this.employeeObj.empName, [Validators.required]),
      empSalary: new FormControl(this.employeeObj.empSalary, [Validators.required]),
      email: new FormControl(this.employeeObj.email, [Validators.required, Validators.email]),
      mobile: new FormControl(this.employeeObj.mobile, [Validators.required]),
      empAddress: new FormControl(this.employeeObj.empAddress, [Validators.required]),
      pinCode: new FormControl(this.employeeObj.pinCode, [Validators.required, Validators.minLength(6)]),
    })
  }


  onSave() {
    debugger;
    const oldData = localStorage.getItem('employeeData');
    if (oldData != null) {
      const oldDataObj = JSON.parse(oldData);
      this.employeeForm.controls['empId'].setValue(oldDataObj.length + 1);
      this.employeeList.unshift(this.employeeForm.value);
    } else {
      this.employeeList.unshift(this.employeeForm.value);

    }
    localStorage.setItem('employeeData', JSON.stringify(this.employeeList));
  }

  onEdit(item: EmployeeModel) {
    debugger;
    this.employeeObj = item;
    this.createForm();

  }
  onUpdate() {
    const record = this.employeeList.findIndex((item: EmployeeModel) => item.empId == this.employeeObj.empId);
    if (record > -1) {
      this.employeeList[record] = this.employeeForm.value;
      localStorage.setItem('employeeData', JSON.stringify(this.employeeList));
    }
    this.employeeObj = new EmployeeModel();
    this.createForm();
  }

  onDelete(id: number) {
    debugger;
    const record = this.employeeList.findIndex(item => item.empId == id);
    if (record > -1) {
      this.employeeList.splice(record, 1);
      localStorage.setItem('employeeData', JSON.stringify(this.employeeList));
    }

  }
}
