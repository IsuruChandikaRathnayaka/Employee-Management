import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface BackendError {
    msg: string;

}

export default function RolesAdd() {
    const [roleTitle, setRoleTitle] = useState('');
    const [roleDescription, setRoleDescription] = useState('');
    const navigate=useNavigate();
    const[backendErrors,setBackendErrors]=useState<BackendError[]>([]);


    function handleSubmit(event:any){
        event.preventDefault();
        axios.post("http://localhost:8088/addRole",{roleTitle,roleDescription})
        .then (res =>{
            if(res.data.errors){
                setBackendErrors(res.data.errors);
            }else{
                console.log(res);
                navigate("/DisplayRoles");
                alert("Role added completed!")

            }
            

        })
        .catch(err=>{
            console.log(err);
        })


    }
  return (
    <div>
    <div className="d-flex   justify-content-center mt-5">
        <div className="w-50 bg-dark text-light rounded p-3 ">
            <h3 className="pb-3 text-center">Add Role</h3>
        <form onSubmit={handleSubmit}>
        {backendErrors && backendErrors.map((e, i) => (
    <p key={i} className="text-light bg-danger p-2">{e.msg}</p>
))}
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">Role Title</label>
                        <input type="text" className="form-control" id="firstName" placeholder="Enter The Role Title Here" onChange={(e) => setRoleTitle(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Role Description</label>
                        <input type="text" className="form-control" id="lastName" placeholder="Enter Description Here" onChange={(e) => setRoleDescription(e.target.value)} />
                    </div>
                   

                    <button type="submit" className="btn btn-primary me-2 bg-dark">Submit</button>
                    <Link to="/Departments" type="submit" className="btn btn-primary me-2 bg-dark">Go Back</Link>
                </form>
        </div>
    </div>
</div>
  )
}
