'use strict';
var dbConn = require('./../../src/config/db.config');
//Student object create
var Student = function(student){
  this.first_name     = student.first_name;
  this.last_name      = student.last_name;
  this.email          = student.email;
  this.phone          = student.phone;
  this.organization   = student.organization;
  this.designation    = student.designation;
  this.salary         = student.salary;
  this.status         = student.status ? student.status : 1;
  this.created_at     = new Date();
  this.updated_at     = new Date();
};
Student.create = function (newEmp, result) {
dbConn.query("INSERT INTO employees set ?", newEmp, function (err, res) {
if(err) {
  console.log("error: ", err);
  result(err, null);
}
else{
  console.log(res.insertId);
  result(null, res.insertId);
}
});
};
Student.findById = function (id, result) {
dbConn.query("Select * from USER where user_id = ? ", id, function (err, res) {
if(err) {
  console.log("error: ", err);
  result(err, null);
}
else{
  result(null, res);
}
});
};
Student.findAll = function (result) {
dbConn.query("Select * from employees", function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  console.log('employees : ', res);
  result(null, res);
}
});
};
Student.update = function(id, student, result){
dbConn.query("UPDATE employees SET first_name=?,last_name=?,email=?,phone=?,organization=?,designation=?,salary=? WHERE id = ?", [student.first_name,student.last_name,student.email,student.phone,student.organization,student.designation,student.salary, id], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}else{
  result(null, res);
}
});
};
Student.delete = function(id, result){
dbConn.query("DELETE FROM employees WHERE id = ?", [id], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  result(null, res);
}
});
};
module.exports= Student;