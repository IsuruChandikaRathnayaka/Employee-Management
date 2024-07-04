const db= require('../db/db');

const getAllDepartments=()=>{
    const query="SELECT * FROM Departments";

    return new Promise((resolve,reject)=>{
        db.query(query,(err,data)=>{
            if(err){
                reject(err); 
                
            }
            resolve(JSON.parse(JSON.stringify(data)));
        });
    })
    
}


const updateDepartment=(id,departmentName,departmentLocation)=>{
    const sql="UPDATE Departments SET name=?, location=? WHERE id=?";
    return new Promise((resolve,reject)=>{
        db.query(sql,[departmentName,departmentLocation,id],(err,data)=>{
            if(err) {
                console.log(err);
                reject(err);

            }else{
                console.log("methana ok");
                resolve(data);

            }
            
        });
    
    });


}

const deleteDepartment =(id)=>{
    const updateEmployeeQuery = 'UPDATE Employees SET department_id=NULL WHERE department_id=?';
    return new Promise((resolve,reject)=>{
        db.query(updateEmployeeQuery, [id], (err, result) => {
            if (err) {
                console.error("Error deleting roles:", err);
                reject(err);
            }
    
         
            const deleteDepartmentQuery = 'DELETE FROM Departments WHERE id = ?';
            
            db.query(deleteDepartmentQuery, [id], (err, result) => {
                if (err) {
                    console.error("Error deleting employee:", err);
                    reject(err);
                }
    
                if (result.affectedRows === 0) {
                    return res.status(404).json({ error: 'Employee not found' });
                }
    
                resolve(result);
            });
        });

    })
}

const viewDepartment=(id)=>{
    const sql="SELECT * from Departments WHERE id = ?";
    return new Promise((resolve,reject)=>{
        db.query(sql,[id],(err,data)=>{
            if(err) {
                console.log(err);
                reject(err);
            }else{
               resolve(data);
            }
                
        })
    })

}

const addDepartment=(depatment_name,department_location)=>{
    const sql="INSERT INTO Departments (name,location) VALUES (?,?)";
    return new Promise((resolve,reject)=>{
        db.query(sql,[depatment_name,department_location],(err,data)=>{
            if(err){
                console.log("Error inserting data : ",err);
                reject(err);
            }
            console.log("department added successfully!");
           
            resolve(data);

        });

    })

}

module.exports={
    getAllDepartments,
    updateDepartment,
    deleteDepartment,
    viewDepartment,
    addDepartment
}