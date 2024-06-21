import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


export default function RoleView() {

    const [department,setDepartment]=useState<any>([]);
    const {id} =useParams();

    useEffect(()=>{
        axios.get(`http://localhost:8088/RoleView/${id}`)
        .then(res =>setDepartment(res.data[0]))
        .catch(err=>console.log(err))

    })
  return (
    <div>
    <div className="container  mt-3 ">
        <div className="card bg-dark text-light ">
            <div className="card-header border-light">
                <h3 className="card-title mb-0">Role Details</h3>
            </div>
            <div className="card-body">
                <div className="mb-3">
                    <strong>Role Name :</strong> {department.title}
                </div>
                <div className="mb-3">
                    <strong>Role Location :</strong> {department.description}
                </div>

                <div className="mb-3">
                  <Link to="/DisplayRoles" className="btn btn-primary bg-dark">Go Back</Link>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}
