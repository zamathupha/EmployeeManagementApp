import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';  

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  private db!: SQLiteObject;  

  constructor(private databaseService: DatabaseService) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.databaseService.createDatabase().then((db: SQLiteObject) => {
      this.db = db;
      this.databaseService.fetchEmployees(db).then((employees: any[]) => {
        this.employees = employees;
      });
    });
  }

  deleteEmployee(id: number) {
    this.databaseService.deleteEmployee(this.db, id);  
    this.loadEmployees();
  }
}


