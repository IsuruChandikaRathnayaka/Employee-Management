const db=require('../db/db');
const employeeService = require("../services/employeeService");


//implementation of the getAllEmployees function
const getAllEmployees = async (req,res)=>{

    try{
        const data =await employeeService.getAllEmployees();
        res.json(data);

    }catch(err){
        console.error("Error fecthing data ",err);
        res.status(500).json({error:"Database error!"});

    }

    
}

const addEmployee = async (req, res) => {
    const { firstName, lastName, email, position, salary, departmentId, roleId } = req.body;
    const picture = req.file ? req.file.filename : null;

    try{
        const empId= await employeeService.addEmployee(firstName,lastName, email, position, salary, departmentId,roleId, picture);
        res.status(201).json({message:'Employee added successfully!',empId});

    }catch(err){
        console.error("something went wrong went inserting the data ",err);
        res.status(500).json({error:"Failed to add employee!"});


    }
    
};




const deleteEmployee = async (req,res)=>{
    const empId = req.params.id;
    try{
        console.log(empId);
        const employeeId=await employeeService.deleteEmployee(empId);
        res.status(201).json({message:'Employee Deleted successfully!',employeeId})

    }catch(err){
        console.error("somthing went wrong when deleting the user with id ",empId,err);
        res.status(500).json({error:"Failed to delete the employee!",err})

    }
}

const employeeUpdate = async (req,res)=>{
   try{
    const {id} =req.params;
    const {firstName, lastName, email, position, salary, departmentId, roleId}=req.body;
    await employeeService.employeeUpdate(firstName, lastName, email, position, salary, departmentId, roleId,id);
    res.status(200).json({message:"customer updation completed!"})
   }catch(err){
    console.error("something went wrong when updating the user with id ",err);
    res.status(500).json({error:"failed to update the user ",err});
   }
   
}


const employeeView = async (req,res)=>{
    try{
    const {id} = req.params;
    const employee=await employeeService.employeeView(id)
    if (employee.photo) {
        employee.photo = `/uploads/${employee.photo}`;
    }
    res.json(employee);
}catch(err){
    console.error("Error fetching employee:", err);
    res.status(500).json({ error: "Failed to fetch employee details", details: err });
}
   

    
}


module.exports={
    getAllEmployees,
    addEmployee,
    deleteEmployee,
    employeeUpdate,
    employeeView
}