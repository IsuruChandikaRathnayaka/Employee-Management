import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import AddEmployee from "./components/AddEmployee"
import EmployeeUpdate from "./components/EmployeeUpdate"
import EmployeeView from "./components/EmployeeView"
import DisplayDepartments from "./components/DisplayDepartments"
import DepartmentView from "./components/DepartmentView"
import DepartmentUpdate from "./components/DepartmentUpdate"
import DepartmentAdd from "./components/DepartmentAdd"
import DisplayRoles from "./components/DisplayRoles"
import RoleView from "./components/RoleView"
import RoleUpdate from "./components/RoleUpdate"
import RolesAdd from "./components/RolesAdd"


function App() {
  

  return (
    <>
      <BrowserRouter>
     
        <nav className="et-hero-tabs text-light bg-dark pb-5">
          <h1>Employee Management System</h1>
          <h3>Employee Management web platform</h3>
          <div className="et-hero-tabs-container bg-black-opacity">
            <Link className="et-hero-tab text-light" to="/">Home</Link>
            <Link className="et-hero-tab text-light" to="/addEmployee">Add Employee</Link>
            <Link className="et-hero-tab text-light" to="/Departments">Department Management</Link>
            <Link className="et-hero-tab text-light" to="/DisplayRoles">Role Management</Link>
            <span className="et-hero-tab-slider text-light"></span>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/addEmployee" element={<AddEmployee/>}></Route>
          <Route path="/EmployeeUpdate/:id" element={<EmployeeUpdate/>}></Route>
          <Route path="/EmployeeView/:id" element={<EmployeeView/>}></Route>
          <Route path="/Departments" element={<DisplayDepartments/>}></Route>
          <Route path="/Departments/DepartmentView/:id" element={<DepartmentView/>}></Route>
          <Route path="/Departments/DepartmentUpdate/:id" element={<DepartmentUpdate/>} ></Route>
          <Route path="/Departments/DepartmentAdd" element={<DepartmentAdd/>} ></Route>
          <Route path="/DisplayRoles" element={<DisplayRoles/>} ></Route>
          <Route path="/DisplayRoles/RoleView/:id" element={<RoleView/>}></Route>
          <Route path="/DisplayRoles/RoleUpdate/:id" element={<RoleUpdate/>}></Route>
          <Route path="/DisplayRoles/RolesAdd" element={<RolesAdd/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
