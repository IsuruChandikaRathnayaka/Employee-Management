const express=require('express');
const router =express.Router();
const employeeController=require('../controllers/employeeController');
const upload=require('../middlewares/upload');


router.get("/",employeeController.getAllEmployees);
router.post("/addEmployee",upload.single('picture'),employeeController.addEmployee);
router.delete("/deleteEmployee/:id",employeeController.deleteEmployee);
router.put("/EmployeeUpdate/:id",employeeController.employeeUpdate);
router.get("/EmployeeView/:id",employeeController.employeeView);


module.exports = router;