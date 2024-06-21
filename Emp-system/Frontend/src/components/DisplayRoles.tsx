import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Roles {
    id:number;
    title: string;
    description: string;
  }

export default function DisplayRoles() {

   const [department,setDepartment] =useState<Roles[]>([]);

   useEffect(()=>{
        axios.get("http://localhost:8088/DisplayRoles")
        .then(res=>setDepartment(res.data))
        .catch(err =>console.log(err))
   },[]);


   const handleDelete=async(id:number)=>{
    try{
        await axios.delete(`http://localhost:8088/deleteRole/${id}`)
        window.location.reload() 
    }catch(err){
        console.log(err);
    }
}
  return (
    <div>
    <div className="container-fluid  d-flex  pt-5">
   <div className="row justify-content-center w-100">
       <div className="col-lg-10 col-md-3 col-sm-3 bg-dark text-light rounded p-3">
           <div className="d-flex justify-content-between align-items-center mb-3">
               <h3 className="text-center">Roles</h3>
               <Link  to="/DisplayRoles/RolesAdd" className="btn btn-success">Add+</Link>
              
           </div>
           <div className="table-responsive">
               <table className="table table-hover table-striped">
                   <thead className="thead-dark">
                       <tr>
                           <th>Role ID</th>
                           <th>Role Title</th>
                           <th>Role Description</th>
                           <th>Action</th>
                       </tr>
                   </thead>
                   <tbody>
                       {
                           department.map((data,i)=>(
                            <tr key={i}>
                               <td>{data.id}</td>
                               <td>{data.title}</td>
                               <td>{data.description}</td>
                               <td>
                                   <Link to={`/DisplayRoles/RoleView/${data.id}`} className="btn btn-info btn-sm" >View</Link>
                                   <Link to={`/DisplayRoles/RoleUpdate/${data.id}`} className="btn btn-success ms-2 btn-sm">Update</Link>
                                   <button onClick={() => handleDelete(data.id)} className='btn btn-danger btn-sm ms-2'>Delete</button>
                                   
                               </td>
                            </tr>
                           ))
                       }
                       
                   </tbody>
               </table>
           </div>
       </div>
   </div>
</div>
</div>
  )
}
