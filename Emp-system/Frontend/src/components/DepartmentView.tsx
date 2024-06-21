import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";

export default function DepartmentView() {
    const [department,setDepartment]=useState<any>([]);
    const {id} =useParams();

    useEffect(()=>{
        axios.get(`http://localhost:8088/DepartmentView/${id}`)
        .then(res =>setDepartment(res.data[0]))
        .catch(err=>console.log(err))

    })

  return (
    <div>
        <div className="container  mt-3">
            <div className="card bg-dark text-light mt-4">
                <div className="card-header border-light">
                    <h3 className="card-title mb-0">Department Details</h3>
                </div>
                <div className="card-body">
                    <div className="mb-3">
                        <strong>Department Name :</strong> {department.name}
                    </div>
                    <div className="mb-3">
                        <strong>Department Location :</strong> {department.location}
                    </div>

                    <div className="mb-3">
                      <Link to="/Departments" className="btn btn-primary bg-dark">Go Back</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
