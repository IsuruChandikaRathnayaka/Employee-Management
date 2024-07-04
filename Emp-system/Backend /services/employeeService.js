const db= require('../db/db');

const getAllEmployees = ()=>{
    const sql = `SELECT
    e.id, e.first_name,
     e.last_name,
      e.email, 
      e.position, 
      e.salary, 
      d.name AS department_name,
       GROUP_CONCAT(r.title SEPARATOR ', ') AS roles 
       FROM Employees e 
       LEFT JOIN Departments d ON e.department_id = d.id 
       LEFT JOIN EmployeeRoles er ON e.id = er.employee_id 
       LEFT JOIN Roles r ON er.role_id = r.id 
       GROUP BY e.id, e.first_name, e.last_name, e.email, e.position, e.salary, d.name`;
    
       return new Promise((resolve,reject)=>{
            db.query(sql,(err,data)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                }
            })
})
}


const addEmployee = (firstName, lastName, email, position, salary, departmentId,roleId,picture)=>{
    const sqlInsertEmployee = "INSERT INTO Employees (first_name, last_name, email, position, salary, department_id, photo) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const employeeValues = [firstName, lastName, email, position, salary, departmentId, picture];

    return new Promise((resolve,reject)=>{
        db.query(sqlInsertEmployee, employeeValues, (err, result) => {
            if (err) {
                console.error("Error inserting employee data:", err);
                return reject(err);
            }
            const employeeId = result.insertId;
            const sqlInsertRole = "INSERT INTO EmployeeRoles (employee_id, role_id) VALUES (?, ?)";
            const roleValues = [employeeId, roleId];
    
            db.query(sqlInsertRole, roleValues, (err) => {
                if (err) {
                    console.error("Error inserting role data:", err);
                    return reject(err);
                }
                console.log("Employee and role added successfully");
                return resolve(employeeId);
            });
        });
    })

}

const deleteEmployee=(id)=>{
    const deleteRolesQuery = 'DELETE FROM EmployeeRoles WHERE employee_id = ?';
    const empId=id;

    return new Promise((resolve,reject)=>{
        db.query(deleteRolesQuery, [empId], (err, result) => {
            if (err) {
                console.error("Error deleting roles:", err);
                return reject(err);
            }
    
            const deleteEmployeeQuery = 'DELETE FROM Employees WHERE id = ?';
            
            db.query(deleteEmployeeQuery, [empId], (err, result) => {
                if (err) {
                    console.error("Error deleting employee:", err);
                    return reject(err);
                }
    
                if (result.affectedRows === 0) {
                    return res.status(404).json({ error: 'Employee not found' });
                }
    
                resolve(result)
            });
        });
    })

}

const employeeUpdate=(firstName, lastName, email, position, salary, departmentId, roleId,id)=>{
    const sql = "UPDATE Employees SET first_name = ?, last_name = ?, email = ?, position = ?, salary = ?, department_id = ?, photo =? WHERE id = ?";
    
    return new Promise((resolve,reject)=>{
        db.query(sql, [firstName, lastName, email, position, salary, departmentId, roleId, id], (err, data) => {
            if (err){
                console.log(err);
                return reject(err);
            }else{ 

            const checkRoleQuery = "SELECT COUNT(*) AS count FROM EmployeeRoles WHERE employee_id = ?";
            db.query(checkRoleQuery, [id], (err, result) => {
                if (err) return reject(err);
    
                const roleExists = result[0].count > 0;
       
    
                if (roleExists) {
                    const updateRoleQuery = "UPDATE EmployeeRoles SET role_id = ? WHERE employee_id = ?";
                    db.query(updateRoleQuery, [roleId, id], (err, result) => {
                        if (err){
                            console.log(err);
                             return reject(err);
                        }else{
                            resolve(result);
                        }
                   
                    });
                } else {
           
                    const insertRoleQuery = "INSERT INTO EmployeeRoles (employee_id, role_id) VALUES (?, ?)";
                    db.query(insertRoleQuery, [id, roleId], (err, result) => {
                        if (err) {
                            console.log(err);
                            return res.json({ error: "Error inserting employee role!" });
                        }else{
                            resolve(result);
                        }
                    });
                }
            });
        }
        });
    })
}

const employeeView=(id)=>{

    const sql = "SELECT e.id, e.first_name, e.last_name, e.email, e.position, e.salary, e.photo ,d.name AS department_name, GROUP_CONCAT(r.title SEPARATOR ', ') AS roles FROM Employees e LEFT JOIN Departments d ON e.department_id = d.id LEFT JOIN EmployeeRoles er ON e.id = er.employee_id LEFT JOIN Roles r ON er.role_id = r.id WHERE e.id=? GROUP BY e.id;";
    return new Promise((resolve,reject)=>{
        db.query(sql,[id],(err,data)=>{
            if(err) return reject(err);
            const employee = data[0];
            if (employee.photo) {
                const photoUrl = `/uploads/${employee.photo}`;
                employee.photo = photoUrl;
            }
        
            resolve([employee]);
           
    
        });
    })

}



module.exports ={
    getAllEmployees,
    addEmployee,
    deleteEmployee,
    employeeUpdate,
    employeeView

}