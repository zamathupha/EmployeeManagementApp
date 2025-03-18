import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx'; 
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',  
})
export class DatabaseService {
  database!: SQLiteObject;


  constructor(private platform: Platform, private sqlite: SQLite) {
    this.platform.ready().then(() => {
        this.initializeDatabase();
    });
}

async initializeDatabase() {
  this.database = await this.sqlite.create({
      name: 'data.db',
      location: 'default',
  });
}

createDatabase(): Promise<SQLiteObject> {
  return this.sqlite.create({
      name: 'data.db',
      location: 'default',
  }).then((db: SQLiteObject) => {
      return db.executeSql(`CREATE TABLE IF NOT EXISTS employees (
          id INTEGER PRIMARY KEY, 
          name TEXT, 
          department TEXT, 
          position TEXT, 
          contact TEXT)`, [])
      .then(() => {
          console.log('Table created');
          return db;
      });
  }).catch((error) => {
      console.error('Error creating database:', error);
      throw error;
  });
}

fetchEmployees(db: SQLiteObject): Promise<any[]> {
  return db.executeSql('SELECT * FROM employees', []).then((res) => {
    let employees = [];
    for (let i = 0; i < res.rows.length; i++) {
      employees.push(res.rows.item(i)); 
    }
    return employees;
  }).catch((error) => {
    console.error('Error fetching employees:', error);
    throw error;
  });
}




  insertEmployee(db: SQLiteObject, employeeForm: any) {
    return db.executeSql('INSERT INTO employees (name, department, position, contact) VALUES (?, ?, ?, ?)', [
      employeeForm.name, employeeForm.department, employeeForm.position, employeeForm.contact
    ]).then(() => {
      console.log('Employee added');
    }).catch((e) => console.error('Error inserting employee', e));
  }

 
  updateEmployee(db: SQLiteObject, employeeForm: any) {
    return db.executeSql('UPDATE employees SET name = ?, department = ?, position = ?, contact = ? WHERE id = ?', [
      employeeForm.name, employeeForm.department, employeeForm.position, employeeForm.contact, employeeForm.id
    ]).then(() => {
      console.log('Employee updated');
    }).catch((e) => console.error('Error updating employee', e));
  }


  
 
  deleteEmployee(db: SQLiteObject, id: number) {
    return db.executeSql('DELETE FROM employees WHERE id = ?', [id]).then(() => {
      console.log('Employee deleted');
    }).catch((e) => console.error('Error deleting employee', e));
  }
}

  



 




