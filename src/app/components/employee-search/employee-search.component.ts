import { Component } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';  

@Component({
  selector: 'app-employee-search',
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.scss'],
})
export class EmployeeSearchComponent {
  searchQuery: string = '';
  filteredEmployees: any[] = [];
  private db!: SQLiteObject; 

  constructor(private databaseService: DatabaseService) {}

  ngOnInit() {
    this.initializeDatabase();
  }

  initializeDatabase() {
    this.databaseService.createDatabase().then((db: SQLiteObject) => {
      this.db = db;
      this.loadEmployees();
    }).catch((e: any) => {
      console.error('Error initializing database:', e);
    });
  }

  loadEmployees() {
    this.databaseService.fetchEmployees(this.db).then((employees: any[]) => {
      this.filteredEmployees = employees;  // Store the employees in the component
    }).catch((e: any) => {
      console.error('Error loading employees:', e);
    });
  }

  
  filterEmployees(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredEmployees = this.filteredEmployees.filter(employee =>
      employee.name.toLowerCase().includes(query) ||
      employee.department.toLowerCase().includes(query)
    );
  }
}


