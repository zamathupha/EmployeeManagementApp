import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      department: ['', Validators.required],
      position: ['', Validators.required],
      contact: ['', [Validators.required, Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)]]
    });
  }

  ngOnInit() {
    
  }

  submitForm() {
    if (this.employeeForm.valid) {
      
      console.log('Form Submitted', this.employeeForm.value);
    } else {

      console.log('Form is invalid');
    }
  }
}


