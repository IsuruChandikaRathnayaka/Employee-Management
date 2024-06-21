import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    const [employee, setEmployee] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        axios.get("http://localhost:8088/")
        .then(res => setEmployee(res.data))
        .catch(err => console.log(err));
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:8088/deleteEmployee/${id}`);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }

    const filteredEmployees = employee.filter((data) => 
        data.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.department_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.roles?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center mt-3 mb-3">
            <div className="row justify-content-center w-100">
                <div className="col-lg-12 col-md-12 col-sm-12 rounded p-3">
                    <div className="bg-dark rounded p-3 text-light">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h3 className="text-center mb-3">Employee List</h3>
                            <Link to="/addEmployee" className="btn btn-success">Add+</Link>
                        </div>
                        <div className="mb-3 ">
                           
                            <input 
                                type="text" 
                                placeholder="Search..." 
                                value={searchTerm} 
                                onChange={handleSearchChange} 
                                className="form-control"
                            />
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover table-striped">
                                <thead className="thead-dark">
                                    <tr>
                                        <th>Emp ID</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                        <th>Position</th>
                                        <th>Salary</th>
                                        <th>Department</th>
                                        <th>Roles</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredEmployees.map((data, i) => (
                                        <tr key={i}>
                                            <td>{data.id}</td>
                                            <td>{data.first_name}</td>
                                            <td>{data.last_name}</td>
                                            <td>{data.email}</td>
                                            <td>{data.position}</td>
                                            <td>{data.salary}</td>
                                            <td className={data.department_name ? "" : "text-danger fw-bold"}>
                                                {data.department_name ? data.department_name : "Not Assigned Yet!"}
                                            </td>
                                            <td className={data.roles ? "" : "text-danger fw-bold"}>
                                                {data.roles ? data.roles : "Not Assigned Yet!"}
                                            </td>
                                            <td>
                                                <Link to={`EmployeeView/${data.id}`} className='btn btn-info btn-sm'>View</Link>
                                                <Link to={`EmployeeUpdate/${data.id}`} className='btn btn-primary btn-sm ms-2'>Update</Link>
                                                <button onClick={() => handleDelete(data.id)} className='btn btn-danger btn-sm ms-2'>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
