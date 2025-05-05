export class EmployeeModel {
    empId: number;
    empName: string;
    empSalary: number;
    email: string;
    mobile: string;
    empAddress: string;
    pinCode: string;

    constructor() {
        this.empId = 1;
        this.empName = '';
        this.empSalary = 0.0;
        this.email = '';
        this.mobile = '';
        this.empAddress = '';
        this.pinCode = '';
    }



}