import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

interface BackendError {
    msg: string;

}

export default function DepartmentUpdate() {
    const [departmentName,setDepartmentName]=useState('');
    const [departmentLocation,setdepartmentLocation]=useState('');
    const[backendErrors,setBackendErrors]=useState<BackendError[]>([]);
 
    const {id} =useParams();
    const navigate =useNavigate();

    function handleSubmit(event:any){
        event.preventDefault();
        axios.put(`http://localhost:8088/DepartmentUpdate/${id}`,{departmentName,departmentLocation})
        .then((res)=>{
            if(res.data.errors){
                setBackendErrors(res.data.errors);
            }else{
                console.log(res);
                navigate("/Departments");
                alert("Details updated successful!");

            }

            

        })
        .catch(err=>{
            console.log(err);
        })
    }
  return (
<div>
        <div className="d-flex justify-content-center mt-5">
        <div className="w-50 bg-dark text-light rounded p-3">
            <h3 className="pb-3 text-center">Update Employee with id number {id}</h3>
        <form onSubmit={handleSubmit}>
        {backendErrors && backendErrors.map((e, i) => (
    <p key={i} className="text-light bg-danger p-2">{e.msg}</p>
))}
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">Department Name</label>
                        <input type="text" className="form-control" id="firstName" placeholder="Enter Department Name"  onChange={(e) => setDepartmentName(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Department Location</label>
                        <input type="text" className="form-control" id="lastName" placeholder="Enter Department Location" onChange={(e) => setdepartmentLocation(e.target.value)}/>
                    </div>
                    
                    <button type="submit" className="btn btn-primary me-2 bg-dark" >Submit</button>
                    <Link to="/Departments" type="submit" className="btn btn-primary me-2 bg-dark" >Go Back</Link>
                </form>
        </div>
    </div>
    </div>
  )
}
