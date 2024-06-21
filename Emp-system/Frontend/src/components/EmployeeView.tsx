import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";


export default function EmployeeView() {
    const [employee,setEmployee] =useState<any>([]);
    const {id} =useParams();


    useEffect(()=>{
        axios.get(`http://localhost:8088/EmployeeView/${id}`)
        .then(res => setEmployee(res.data[0]))
        .catch(err => console.log(err))
    },[]);


  return (
    <div className="container mt-3  ">
            <div className="card bg-dark text-light">
                <div className="card-header border-light">
                    <h3 className="card-title mb-0">Employee Details</h3>
                </div>
                <div className="card-body ">
                    <div className="mb-3">
                        <strong>First Name:</strong> {employee.first_name}
                    </div>
                    <div className="mb-3">
                        <strong>Last Name:</strong> {employee.last_name}
                    </div>
                    <div className="mb-3">
                        <strong>Email:</strong> {employee.email}
                    </div>
                    <div className="mb-3">
                        <strong>Position:</strong> {employee.position}
                    </div>
                    <div className="mb-3">
                        <strong>Salary:</strong>{employee.salary}
                    </div>
                    <div className="mb-3">
                        <strong>Department:</strong> {employee.department_name?employee.department_name: "No roles assigned yet!"}
                    </div>
                    <div className="mb-3">
                        <strong>Roles:</strong> {employee.roles ? employee.roles : "No roles assigned yet!"}
                    </div>
                    <div className="mb-3">
                        <Link to="/" className="btn btn-primary bg-dark mx-2">Go Back</Link>
                    </div>
                </div>
            </div>
        </div>
  )
}
