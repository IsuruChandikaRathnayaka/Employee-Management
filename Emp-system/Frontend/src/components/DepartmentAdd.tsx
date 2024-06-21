import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface BackendError {
    msg: string;

}

export default function DepartmentAdd() {
    const [department_name, setDepartment_name] = useState('');
    const [department_location, setDepartment_location] = useState('');
    const navigate=useNavigate();
    const[backendErrors,setBackendErrors]=useState<BackendError[]>([]);





    function handleSubmit(event:any){
        event.preventDefault();
        axios.post("http://localhost:8088/addDepartment",{department_name,department_location})
        .then (res =>{

            if(res.data.errors){
                setBackendErrors(res.data.errors);

            }else{
                setBackendErrors([]);
                console.log(res);
                navigate("/Departments");
                alert("Department added completed!")
            }

        })
        .catch(err=>{
            console.log(err);
        })


    }
  return (
    <div>
    <div className="d-flex justify-content-center mt-5">
        <div className="w-50 bg-dark rounded p-3 text-light" >
            <h3 className="pb-3 text-center">Add Department</h3>
        <form onSubmit={handleSubmit}>
        {backendErrors && backendErrors.map((e, i) => (
    <p key={i} className="text-light bg-danger p-2">{e.msg}</p>
))}
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">Department Name</label>
                        <input type="text" className="form-control" id="firstName" placeholder="Enter Department Name" onChange={(e) => setDepartment_name(e.target.value)}  />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Department Location</label>
                        <input type="text" className="form-control" id="lastName" placeholder="Enter Department Location" onChange={(e) => setDepartment_location(e.target.value)}  />
                    </div>
                   
     

                    <button type="submit" className="btn btn-primary me-2 bg-dark">Submit</button>
                    <Link to="/Departments" type="submit" className="btn btn-primary me-2 bg-dark">Go Back</Link>
                </form>
        </div>
    </div>
</div>
  )
}
