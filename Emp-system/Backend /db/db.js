const express=require("express");
const mysql=require("mysql");


//Creating the database connection
const db=mysql.createConnection({
    host:"localhost",
    port:8889,
    user:"root",
    password:"root",
    database:"Emp_Management"
})

module.exports=db;
