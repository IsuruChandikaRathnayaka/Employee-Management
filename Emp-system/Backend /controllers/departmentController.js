const db=require('../db/db');
const departmentSerice=require('../services/departmentServices');

const getAllDepartments = async (req,res)=>{
    try{
        const departments =await departmentSerice.getAllDepartments();
        res.status(200).json(departments);

    }catch(err){
        console.log("Error fetching departments!",err);
        res.status(500).json({message:"Errror feching departments",error:err.message});
    }
   
}

const deleteDepartment=(req,res)=>{
    const departmentId = req.params.id;
    try{
        console.log(departmentId);
        const department_id=departmentSerice.deleteDepartment(departmentId);
        res.status(201).json({message:'Department deleted successfully',department_id});

    }catch(err){
        console.error("something went wrong when deleting the department id ",departmentId);
        res.status(500).json({error:"Failed to delete the department"});

    }

    

  
    
}

const viewDepartment=(req,res)=>{
 try{
    const id=req.params.id;
    const department=departmentSerice.viewDepartment(id);
    res.status(200).json(department);

 }catch(err){
    console.error(err);
    res.status(501).json({error:"failed to fetch employee details ",error:err})

 }
    

    
}


const updateDepartment= async (req,res)=>{
    try{
        const {id} =req.params;
        console.log(id);
        const {departmentName,departmentLocation}=req.body;
        const depart=await departmentSerice.updateDepartment(id,departmentName,departmentLocation);
        res.status(200).json({message:"department updation completed!",data:depart});


    }catch(err){
        console.log(err);
        res.status(500).json({message:"Error when updating the department!",error:err});
    }
   

}


const addDepartment= async (req,res)=>{
    const {department_name ,department_location}=req.body;
    try{
        const departid=await departmentSerice.addDepartment(department_name,department_location);
        res.status(201).json({message:'Department added successfully!',departid});

    }catch(err){
        console.error("somthing went wrong when inserting the data",err);
        res.status(500).json({error:'failed to add department'});

    }

}








module.exports={
    getAllDepartments,
    deleteDepartment,
    viewDepartment,
    updateDepartment,
    addDepartment
}