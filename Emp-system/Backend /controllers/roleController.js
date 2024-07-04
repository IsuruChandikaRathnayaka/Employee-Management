const db = require("../db/db");
const roleService = require("../services/roleServices");

const displayAllRoles = async (req, res) => {
  try {
    const data = await roleService.displayAllRoles();
    res.status(201).json(data);
  } catch (err) {
    console.error("Error fetching data", err);
    res.status(500).json({ error: "database error!" });
  }
};

const getRole = async (req, res) => {
  const { id } = req.params;
  try {
    const role = await roleService.getRole(id);
    res.json(role);
  } catch (err) {
    console.error("Error feching role", err);
    res.status(501).json({ error: "failed to fecth the role", error: err });
  }
};

const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const { roleTitle, roleDescription } = req.body;
    const role = await roleService.updateRole(id, roleTitle, roleDescription);
    res.status(200).json({ message: "role updation completed!", data: role });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Error when updating the role!", error: err });
  }
};

const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const role_id = await roleService.deleteRole(id);
    res.status(201).json({ message: "role deletion completed!", role_id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "failed to delete the role!" });
  }
};

const addRole = async (req, res) => {
    const {roleTitle,roleDescription} = req.body;
    try{
        const roleid=await roleService.addRole(roleTitle,roleDescription);
        res.status(201).json({message:'role adding completed!',roleid});
        
    }catch(err){
        console.error("somthing went wrong when inserying the data!",err);
        res.status(501).json({error:'failed to add role!'});

    }
};

module.exports = {
  displayAllRoles,
  getRole,
  updateRole,
  deleteRole,
  addRole,
};
