import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

interface BackendError {
    msg: string;

}

export default function RoleUpdate() {
    const [roleTitle,setRoleTitle]=useState('');
    const [roleDescription,setRoleDescription]=useState('');
    const[backendErrors,setBackendErrors]=useState<BackendError[]>([]);
   
 
    const {id} =useParams();
    const navigate =useNavigate();

    function handleSubmit(event:any){
        event.preventDefault();
        axios.put(`http://localhost:8088/RoleUpdate/${id}`,{roleTitle,roleDescription})
        .then((res)=>{
            if(res.data.errors){
                setBackendErrors(res.data.errors);

            }else{
                setBackendErrors([]);
                console.log(res);
                navigate("/DisplayRoles");
                alert("Details updated successful!");
            }
           

        })
        .catch(err=>{
            console.log(err);
        })
    }
  return (
    <div>
        <div className="d-flex justify-content-center  mt-5 mb-5">
        <div className="w-50 bg-dark rounded p-3 text-light">
            <h3 className="pb-3 text-center">Update Role with id number {id}</h3>
        <form onSubmit={handleSubmit}>
        {backendErrors && backendErrors.map((e, i) => (
    <p key={i} className="text-light bg-danger p-2">{e.msg}</p>
))}

                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">Role Title</label>
                        <input type="text" className="form-control" id="firstName" placeholder="Enter the Role Title" onChange={(e) => setRoleTitle(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Role Description</label>
                        <input type="text" className="form-control" id="lastName"  placeholder="Enter the Role Description"  onChange={(e) => setRoleDescription(e.target.value)} />
                    </div>
                    
                    <button type="submit" className="btn btn-primary me-2 bg-dark" >Submit</button>
                    <Link to="/DisplayRoles" type="submit" className="btn btn-primary me-2 bg-dark" >Go Back</Link>
                </form>
        </div>
    </div>
    </div>
  )
}
