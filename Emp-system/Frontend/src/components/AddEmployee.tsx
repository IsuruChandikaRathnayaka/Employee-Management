import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";


interface Department {
    id: number;
    name: string;
}

interface BackendError {
    msg: string;

}

interface Role {
    id:number;
    title:string;
}

interface DepartmentOption {
    value: number;
    label: string;
}

interface RoleOption {
    value: number;
    label: string;
}

export default function AddEmployee() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [position, setPosition] = useState('');
    const [salary, setSalary] = useState('');
    const [departmentId, setDepartmentId] = useState('');
    const navigate=useNavigate();
    const [departmentOptions, setDepartmentOptions] = useState<DepartmentOption[]>([]);
    const [RoleOption, setRoleOption] = useState<DepartmentOption[]>([]);
    const [roleId, setRoleId] = useState('');
    const[backendErrors,setBackendErrors]=useState<BackendError[]>([]);
   
    
    useEffect(() => {
        fetchDepartments();
        fetchRoles();
    }, []);

    const fetchDepartments = () => {
        axios.get<Department[]>("http://localhost:8088/departments")
            .then(response => {
                const departments: Department[] = response.data;
                const options: DepartmentOption[] = departments.map(dep => ({
                    value: dep.id,
                    label: `${dep.id} - ${dep.name}`
                }));
                setDepartmentOptions(options);
            })
            .catch(error => {
                console.error('Error fetching departments:', error);
            });
    };

    const fetchRoles = () => {
        axios.get<Role[]>("http://localhost:8088/DisplayRoles")
            .then(response => {
                const roles: Role[] = response.data;
                const options: RoleOption[] = roles.map(role => ({
                    value: role.id,
                    label: `${role.id} - ${role.title}`
                }));
                setRoleOption(options);
            })
            .catch(error => {
                console.error('Error fetching departments:', error);
            });
    };



    function handleSubmit(event:any){
        event.preventDefault();
        axios.post("http://localhost:8088/addEmployee",{firstName,lastName,email,position,salary,departmentId,roleId})
        .then (res =>{

            if(res.data.errors){
                setBackendErrors(res.data.errors);

            }else{
                setBackendErrors([]);
                console.log(res);
                navigate("/");
                alert("User added completed!")
            }
           
           

            
           

        })
        .catch(err=>{
            console.log(err);
        })


    }

   

  return (
    <div>
    <div className="d-flex  justify-content-center align-items-center p-5 mb-5 mt-5">
        <div className="w-50 bg-dark rounded p-3 text-light">
            <h3 className="pb-3 text-center">Add Employee</h3>
        <form onSubmit={handleSubmit}>
        {backendErrors && backendErrors.map((e, i) => (
    <p key={i} className="text-light bg-danger p-2">{e.msg}</p>
))}


                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input type="text" className="form-control" id="firstName" placeholder="Enter first name here" onChange={(e) => setFirstName(e.target.value)}  />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input type="text" className="form-control" id="lastName" placeholder="Enter last name here" onChange={(e) => setLastName(e.target.value)}  />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" placeholder="Enter email here" onChange={(e) => setEmail(e.target.value)}  />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="position" className="form-label">Position</label>
                        <input type="text" className="form-control" id="position" placeholder="Enter position here" onChange={(e) => setPosition(e.target.value)}  />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="salary" className="form-label">Salary</label>
                        <input type="number" className="form-control" id="salary" placeholder="Enter salary here" onChange={(e) => setSalary(e.target.value)}  />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="departmentId" className="form-label">Department ID</label>
                            <select className="form-select" id="departmentId" onChange={(e) => setDepartmentId(e.target.value)} value={departmentId}>
                                <option value="">Select Department ID</option>
                                {departmentOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                    </div>

                    <div className="mb-3">
                    <label htmlFor="roleId" className="form-label">Role</label>
                            <select className="form-select" id="roleId" onChange={(e) => setRoleId(e.target.value)} value={roleId} >
                                <option value="">Select Role</option>
                                {RoleOption.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                    </div>
                
                    <button type="submit" className="btn btn-primary me-2 bg-dark">Submit</button>
                
                </form>
        </div>
    </div>
</div>
  )
}
