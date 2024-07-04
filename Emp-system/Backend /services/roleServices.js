const db = require("../db/db");

const displayAllRoles = () => {
  const sql = "SELECT * FROM Roles";
  return new Promise((resolve, reject) => {
    db.query(sql, (err, data) => {
      if (err) {
        console.log("Error fetching data : ", err);
        reject(err);
      }
      resolve(data);
    });
  });
};

const getRole = (id) => {
  const sql = "SELECT * from Roles WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.query(sql, [id], (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const updateRole = (id, roleTitle, roleDescription) => {
  const sql = "UPDATE Roles SET title=?, description=? WHERE id=?";
  return new Promise((resolve, reject) => {
    db.query(sql, [roleTitle, roleDescription, id], (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const deleteRole = (id) => {
  const deleteRoleQuery = "DELETE FROM EmployeeRoles WHERE role_id = ?";
  return new Promise((resolve, reject) => {
    db.query(deleteRoleQuery, [id], (err, result) => {
      if (err) {
        console.error("Error deleting employee:", err);
        reject(err);
      }

      const sql2 = "DELETE FROM Roles WHERE id=?";

      db.query(sql2, [id], (err, results) => {
        if (err) {
          console.error("Error deleting employee:", err);
          reject(err);
        }
      });

      resolve(result);
    });
  });
};

const addRole = (roleTitle, roleDescription) => {
  const sql = "INSERT INTO Roles (title,description) VALUES (?,?)";
  return new Promise((resolve, reject) => {
    db.query(sql, [roleTitle, roleDescription], (err, data) => {
      if (err) {
        console.log("Error inserting data : ", err);
        reject(err);
      }
      console.log("department added successfully!");
      resolve(data);
    });
  });
};

module.exports = {
  displayAllRoles,
  getRole,
  updateRole,
  deleteRole,
  addRole
};
