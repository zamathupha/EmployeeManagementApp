const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yourpassword',
  database: 'employee_management'
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL connected...');
});

// CRUD routes
app.get('/employees', (req, res) => {
  db.query('SELECT * FROM employees', (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.post('/employees', (req, res) => {
  const employee = req.body;
  db.query('INSERT INTO employees SET ?', employee, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.put('/employees/:id', (req, res) => {
  const { id } = req.params;
  const employee = req.body;
  db.query('UPDATE employees SET ? WHERE id = ?', [employee, id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.delete('/employees/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM employees WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
