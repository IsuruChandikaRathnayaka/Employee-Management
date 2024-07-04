const express=require("express");
const cors =require("cors");
const db = require('./db/db');
const multer=require('multer');
const app=express();
const path=require('path');
app.use(express.json());
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const {check,validationResult}=require('express-validator');
const employeeRoutes= require('./routes/employeeRoutes');
const departmentRoutes=require('./routes/departmentRoutes');
const roleRoutes=require('./routes/roleRoutes');

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        db(null,'services')
        
    },
    filename:(req,file,cb)=>{
        db(null,file.fieldname)
    }
   
})

const upload =multer({
    storage:storage

})




app.use('/',employeeRoutes);
app.use('/',departmentRoutes);
app.use('/',roleRoutes);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// app.post('/upload',upload.single('image'),(req,res)=>{
//     console.log(req.file);
// })

//creating the API for fetching data
// app.get("/",(req,res)=>{
//     const sql = `SELECT
//      e.id, e.first_name,
//       e.last_name,
//        e.email, 
//        e.position, 
//        e.salary, 
//        d.name AS department_name,
//         GROUP_CONCAT(r.title SEPARATOR ', ') AS roles 
//         FROM Employees e 
//         LEFT JOIN Departments d ON e.department_id = d.id 
//         LEFT JOIN EmployeeRoles er ON e.id = er.employee_id 
//         LEFT JOIN Roles r ON er.role_id = r.id 
//         GROUP BY e.id, e.first_name, e.last_name, e.email, e.position, e.salary, d.name`;
//     db.query(sql,(err,data)=>{
//         if(err){
//             console.log("Error fetching data : ",err);
//             return res.status(500).json({error:"Database error!"});
//         }
//         return res.json(data);
//     })
// })


app.use(express.urlencoded({ extended: true }));

// Serve static files from the uploads directory
app.use('/uploads', express.static('uploads'));

// Use routes
app.use('/api/employees', employeeRoutes);
//creating the API from the post method
// app.post("/addEmployee",[

//     check('firstName',"First Name is Required!").notEmpty(),
//     check('lastName',"Last Name is Required!").notEmpty(),
//     check('position',"Position is Required!").notEmpty(),
//     check('email',"Email is not valid!").isEmail(),
//     check('email',"Email is Required!").notEmpty(),
//     check('salary',"Salary length should have 4 to 8 characters").isLength({min:4,max:8}),
//     check('salary',"Salary is Required!").notEmpty(),
//     check('departmentId',"Department Selection is Required!").notEmpty(),
//     check('roleId',"Role Selection is Required!").notEmpty(),

// ], (req, res) => {
//     const { firstName, lastName, email, position, salary, departmentId, roleId } = req.body;

//     // Insert new employee
//     const sqlInsertEmployee = "INSERT INTO Employees (first_name, last_name, email, position, salary, department_id) VALUES (?, ?, ?, ?, ?, ?)";
//     const employeeValues = [firstName, lastName, email, position, salary, departmentId];
//     const errors=validationResult(req);
//     if(!errors.isEmpty()){
//         return res.json(errors);
//     }else{
//     db.query(sqlInsertEmployee, employeeValues, (err, result) => {
//             console.log("this executed!");

//             if (err) {
//                 console.error("Error inserting employee data:", err);
//                 return res.status(500).json({ error: 'Failed to add employee' });
//             }
    
//             const employeeId = result.insertId; // Get the generated employee ID
    
//             // Prepare SQL to select employee
//             const sqlSelectEmployee = "SELECT id FROM Employees WHERE first_name=? AND last_name=? AND email=?";
//             const selectValues = [firstName, lastName, email];
    
//             db.query(sqlSelectEmployee, selectValues, (err, selectResult) => {
//                 if (err) {
//                     console.error("Error selecting employee data:", err);
//                     return res.status(500).json({ error: 'Failed to select employee' });
//                 }
    
//                 if (selectResult.length === 0) {
//                     return res.status(404).json({ error: 'Employee not found' });
//                 }
    
//                 const selectedEmployee = selectResult[0]; 
//                 const selectedEmployeeId = selectedEmployee.id; 
    
                
//                 const sqlInsertRole = "INSERT INTO EmployeeRoles (employee_id, role_id) VALUES (?, ?)";
//                 const roleValues = [selectedEmployeeId, roleId];
    
//                 db.query(sqlInsertRole, roleValues, (err, roleResult) => {
//                     if (err) {
//                         console.error("Error inserting role data:", err);
//                         return res.status(500).json({ error: 'Failed to add employee role' });
//                     }
    
//                     console.log("Employee and role added successfully");
//                     return res.status(201).json({ message: 'Employee and role added successfully', employeeId: selectedEmployeeId });
                
//                 });
//             });
        

        
            
        
        
//     });
// }
// });




// app.get("/departments", (req, res) => {
//     const sql = "SELECT * FROM Departments";
//     db.query(sql, (err, departments) => {
//         if (err) {
//             console.error("Error fetching departments:", err);
//             res.status(500).json({ error: "Error fetching departments" });
//             return;
//         }
//         res.json(departments);
//     });
// });

// app.delete("/deleteEmployee/:id", (req, res) => {
//     const employeeId = req.params.id;

//     const deleteRolesQuery = 'DELETE FROM EmployeeRoles WHERE employee_id = ?';

  
//     db.query(deleteRolesQuery, [employeeId], (err, result) => {
//         if (err) {
//             console.error("Error deleting roles:", err);
//             return res.status(500).json({ error: 'Failed to delete employee roles' });
//         }

     
//         const deleteEmployeeQuery = 'DELETE FROM Employees WHERE id = ?';
        
//         db.query(deleteEmployeeQuery, [employeeId], (err, result) => {
//             if (err) {
//                 console.error("Error deleting employee:", err);
//                 return res.status(500).json({ error: 'Failed to delete employee' });
//             }

//             if (result.affectedRows === 0) {
//                 return res.status(404).json({ error: 'Employee not found' });
//             }

//             return res.status(200).json({ message: 'Employee and assigned roles deleted successfully' });
//         });
//     });
// });




// app.put("/EmployeeUpdate/:id",[
//     check('firstName',"First Name is Required!").notEmpty(),
//     check('lastName',"Last Name is Required!").notEmpty(),
//     check('position',"Position is Required!").notEmpty(),
//     check('email',"Email is not valid!").isEmail(),
//     check('email',"Email is Required!").notEmpty(),
//     check('salary',"Salary length should have 4 to 8 characters").isLength({min:4,max:8}),
//     check('salary',"Salary is Required!").notEmpty(),
//     check('departmentId',"Department Selection is Required!").notEmpty(),
//     check('roleId',"Role Selection is Required!").notEmpty(),

// ], (req, res) => {
//     const sql = "UPDATE Employees SET first_name = ?, last_name = ?, email = ?, position = ?, salary = ?, department_id = ? WHERE id = ?";
//     const values = [
//         req.body.firstName,
//         req.body.lastName,
//         req.body.email,
//         req.body.position,
//         req.body.salary,
//         req.body.departmentId
//     ];
//     const id = req.params.id;

//     const errors=validationResult(req);
//     if(!errors.isEmpty()){
//         return res.json(errors);
//     }else{

//     // Update the Employees table
//     db.query(sql, [...values, id], (err, data) => {
//         if (err) return res.json({ error: "Error updating employee!" });

//         // Check if an entry exists in EmployeeRoles for this employee_id
//         const checkRoleQuery = "SELECT COUNT(*) AS count FROM EmployeeRoles WHERE employee_id = ?";
//         db.query(checkRoleQuery, [id], (err, result) => {
//             if (err) return res.json({ error: "Error checking employee roles!" });

//             const roleExists = result[0].count > 0;
//             const roleId = req.body.roleId;

//             if (roleExists) {
//                 // Update the role if it exists
//                 const updateRoleQuery = "UPDATE EmployeeRoles SET role_id = ? WHERE employee_id = ?";
//                 db.query(updateRoleQuery, [roleId, id], (err, result) => {
//                     if (err) return res.json({ error: "Error updating employee role!" });
//                     return res.json({ message: "Employee and role updated successfully!" });
//                 });
//             } else {
//                 // Insert the role if it does not exist
//                 const insertRoleQuery = "INSERT INTO EmployeeRoles (employee_id, role_id) VALUES (?, ?)";
//                 db.query(insertRoleQuery, [id, roleId], (err, result) => {
//                     if (err) return res.json({ error: "Error inserting employee role!" });
//                     return res.json({ message: "Employee updated and role assigned successfully!" });
//                 });
//             }
//         });
//     });
// }
// });



// app.get("/EmployeeView/:id",(req,res)=>{
//     const sql = "SELECT e.id, e.first_name, e.last_name, e.email, e.position, e.salary, d.name AS department_name, GROUP_CONCAT(r.title SEPARATOR ', ') AS roles FROM Employees e LEFT JOIN Departments d ON e.department_id = d.id LEFT JOIN EmployeeRoles er ON e.id = er.employee_id LEFT JOIN Roles r ON er.role_id = r.id WHERE e.id=? GROUP BY e.id;";
//     const id = req.params.id; 
//     db.query(sql,[id],(err,data)=>{
//         if(err) return res.json("Error!")
//         return res.json(data)
//     });
// });


//Department CRUD operations

// app.get("/allDepartments",(req,res)=>{
//     const sql="SELECT * FROM Departments";
//     db.query(sql,(err,data)=>{
//         if(err){
//             console.log("Error fetching data : ",err);
//             return res.status(500).json({error:"Database error!"});

//         }
//         return res.json(data);
//     });
// });


// app.delete("/deleteDepartment/:id",(req,res)=>{
//     const departmentId = req.params.id;

//     const updateEmployeeQuery = 'UPDATE Employees SET department_id=NULL WHERE department_id=?';

  
//     db.query(updateEmployeeQuery, [departmentId], (err, result) => {
//         if (err) {
//             console.error("Error deleting roles:", err);
//             return res.status(500).json({ error: 'Failed to update employee roles' });
//         }

     
//         const deleteDepartmentQuery = 'DELETE FROM Departments WHERE id = ?';
        
//         db.query(deleteDepartmentQuery, [departmentId], (err, result) => {
//             if (err) {
//                 console.error("Error deleting employee:", err);
//                 return res.status(500).json({ error: 'Failed to delete employee' });
//             }

//             if (result.affectedRows === 0) {
//                 return res.status(404).json({ error: 'Employee not found' });
//             }

//             return res.status(200).json({ message: 'Employee and assigned roles deleted successfully' });
//         });
//     });
// });


// app.get("/DepartmentView/:id",(req,res)=>{
//     const sql="SELECT * from Departments WHERE id = ?";
//     const id=req.params.id;

//     db.query(sql,[id],(err,data)=>{
//         if(err) return res.json("Error!")
//             return res.json(data)
//     })

// });


// app.put("/DepartmentUpdate/:id",[

//     check('departmentName',"Department Name is Required!").notEmpty(),
//     check('departmentLocation',"Department Location is Required!").notEmpty()

// ],(req,res)=>{
//     const sql="UPDATE Departments SET name=?, location=? WHERE id=?";

//     const values=[
//         req.body.departmentName,
//         req.body.departmentLocation
//     ];

//     const id=req.params.id;
//     const errors=validationResult(req);

//     if(!errors.isEmpty()){
//         return res.json(errors);
//     }else{

//     db.query(sql,[...values,id],(err,data)=>{
//         if(err) return res.json("Error!");
//         return res.json(data);
        
//     });
// }

// });


// app.post("/addDepartment",[
//     check('department_name',"Department Name is Required!").notEmpty(),
//     check('department_location',"Department Location is Required!").notEmpty()

// ],(req,res)=>{
//     const sql="INSERT INTO Departments (name,location) VALUES (?,?)";
//     const values=[
//         req.body.department_name,
//         req.body.department_location
//     ];

//     const errors=validationResult(req);
//     if(!errors.isEmpty()){
//         return res.json(errors);
//     }else{
//         db.query(sql,values,(err,data)=>{
//             if(err){
//                 console.log("Error inserting data : ",err);
//                 return res.status(500).json({error:'failed to add Department!'});
//             }
//             console.log("department added successfully!");
//             return res.status(201).json({message:'Department added successfull!'});

//         });
// }
// });


//API creating for the role management
// app.get("/DisplayRoles",(req,res)=>{
//     const sql="SELECT * FROM Roles";
//     db.query(sql,(err,data)=>{
//         if(err){
//             console.log("Error fetching data : ",err);
//             return res.status(500).json({error:"Database error!"});

//         }
//         return res.json(data);
//     });
// });


// app.get("/RoleView/:id",(req,res)=>{
//     const sql="SELECT * from Roles WHERE id = ?";
//     const id=req.params.id;

//     db.query(sql,[id],(err,data)=>{
//         if(err) return res.json("Error!")
//             return res.json(data)
//     })

// });


// app.put("/RoleUpdate/:id", [

//     check('roleTitle',"Role Title is Required!").notEmpty(),
//     check('roleDescription',"Role Description is Required!").notEmpty()

// ],(req,res)=>{
//     const errors=validationResult(req);
//     if(!errors.isEmpty()){
//         return res.json(errors);
//     }else{

//         const sql="UPDATE Roles SET title=?, description=? WHERE id=?";

//         const values=[ 
//             req.body.roleTitle,
//             req.body.roleDescription
//         ];

//         const id=req.params.id;

//         db.query(sql,[...values,id],(err,data)=>{
//             if(err) return res.json("Error!");
//             return res.json(data);
            
//         });
// }

// });

//ToDO:
// app.delete("/deleteRole/:id",(req,res)=>{
//     const roleID = req.params.id;

//         const deleteRoleQuery = 'DELETE FROM EmployeeRoles WHERE role_id = ?';
        
//         db.query(deleteRoleQuery, [roleID], (err, result) => {
//             if (err) {
//                 console.error("Error deleting employee:", err);
//                 return res.status(500).json({ error: 'Failed to delete employee' });
//             }

//             const sql2="DELETE FROM Roles WHERE id=?";

//             db.query(sql2,[roleID],(err,results)=>{
//                 if (err) {
//                     console.error("Error deleting employee:", err);
//                     return res.status(500).json({ error: 'Failed to delete employee' });
//                 }
             
                
//             });

//               return res.status(200).json({ message: 'Employee and assigned roles deleted successfully' });

           

//     });
// });


// app.post("/addRole",[


//     check('roleTitle',"Role Title is Required!").notEmpty(),
//     check('roleDescription',"Role Description is Required!").notEmpty()

// ],(req,res)=>{

//     const errors=validationResult(req);
//     if(!errors.isEmpty()){
//         return res.json(errors);
//     }else{

//         const sql="INSERT INTO Roles (title,description) VALUES (?,?)";
//         const values=[
//             req.body.roleTitle,
//             req.body.roleDescription
//         ];
//         db.query(sql,values,(err,data)=>{
//             if(err){
//                 console.log("Error inserting data : ",err);
//                 return res.status(500).json({error:'failed to add Department!'});
//             }
//             console.log("department added successfully!");
//             return res.status(201).json({message:'Department added successfull!'});

//         });
// }
// });












app.listen(8088,()=>{
    console.log("Listning on port number 8088 ! ");
})