import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";


interface Department {
    id: number;
    name: string;
    location: string;
  }
  

export default function DisplayDepartments() {
  const [department,setDepartment] =useState<Department[]>([]);
   useEffect(()=>{
        axios.get("http://localhost:8088/allDepartments")
        .then(res=>setDepartment(res.data))
        .catch(err =>console.log(err))
   },[]);


   const handleDelete=async(id:number)=>{
    try{
        await axios.delete(`http://localhost:8088/deleteDepartment/${id}`)
        window.location.reload() 
    }catch(err){
        console.log(err);
    }
}

  return (
    <div>
         <div className="container-fluid  d-flex  pt-5">
        <div className="row justify-content-center w-100 text-light">
            <div className="col-lg-10 col-md-3 col-sm-3 bg-dark rounded p-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className="text-center">All Departments</h3>
                    <Link  to="/Departments/DepartmentAdd" className="btn btn-success">Add+</Link>
                   
                </div>
                <div className="table-responsive">
                    <table className="table table-hover table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th>Department ID</th>
                                <th>Department Name</th>
                                <th>Department Location</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                department.map((data,i)=>(
                                 <tr key={i}>
                                    <td>{data.id}</td>
                                    <td>{data.name}</td>
                                    <td>{data.location}</td>
                                    <td>
                                        <Link to={`/Departments/DepartmentView/${data.id}`} className="btn btn-info btn-sm" >View</Link>
                                        <Link to={`/Departments/DepartmentUpdate/${data.id}`} className="btn btn-success ms-2 btn-sm">Update</Link>
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
