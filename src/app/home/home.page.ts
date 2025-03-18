import { Component, OnInit } from '@angular/core';
import { IonicModule, AlertController, Platform } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../services/database.service';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [SQLite, DatabaseService],
})
export class HomePage implements OnInit {
  employees: any[] = [];
  searchQuery: string = '';
  editingEmployee: any = null;
  employeeForm: any = {};
  filteredEmployees: any[] = [];
  db!: SQLiteObject;
exitApp: any;

  constructor(
    private databaseService: DatabaseService,
    private alertController: AlertController,
    private sqlite: SQLite,
    private platform: Platform
  ) {
    this.platform.ready().then(() => {
      this.initializeDatabase();
    });
  }

  ngOnInit() {
    console.log('Component initialized');
    this.employeeForm = { name: '', department: '', position: '', contact: '' }; 
  }

  initializeDatabase() {
    this.databaseService.createDatabase().then((db: SQLiteObject) => {
      this.db = db;
      console.log('Database initialized successfully');
      this.loadEmployees();
    }).catch((error) => {
      console.error('Error initializing database:', error);
    });
  }

  loadEmployees() {
    if (!this.db) {
      console.error('Database not initialized');
      return;
    }
    this.databaseService.fetchEmployees(this.db).then((employees: any[]) => {
      this.employees = employees;
      this.filteredEmployees = [...employees];
    }).catch((e: any) => console.error('Error fetching employees:', e));
  }

  addEmployee() {
    if (!this.db) {
      console.error('Database not initialized');
      return;
    }
    this.databaseService.insertEmployee(this.db, this.employeeForm).then(() => {
      console.log('Employee added successfully');
      this.loadEmployees();
      this.employeeForm = { name: '', department: '', position: '', contact: '' }; 
    }).catch(e => console.error('Error adding employee:', e));
  }

  submitEmployeeForm() {
    if (this.editingEmployee) {
      this.databaseService.updateEmployee(this.db, this.employeeForm).then(() => {
        console.log('Employee updated successfully');
        this.cancelEdit();
        this.loadEmployees();
      }).catch(e => console.error('Error updating employee:', e));
    } else {
      this.addEmployee();
    }
  }

  searchEmployees() {
    const query = this.searchQuery.toLowerCase();
    this.filteredEmployees = this.employees.filter(employee =>
      employee.name.toLowerCase().includes(query) ||
      employee.department.toLowerCase().includes(query) ||
      employee.position.toLowerCase().includes(query)
    );
  }

  editEmployee(employee: any) {
    this.editingEmployee = employee;
    this.employeeForm = { ...employee };
  }

  deleteEmployee(id: number) {
    if (!this.db) {
      console.error('Database not initialized');
      return;
    }
    this.databaseService.deleteEmployee(this.db, id).then(() => {
      console.log('Employee deleted successfully');
      this.loadEmployees();
    }).catch((e: any) => console.error('Error deleting employee:', e));
  }

  cancelEdit() {
    this.editingEmployee = null;
    this.employeeForm = { name: '', department: '', position: '', contact: '' };
  }
}




















