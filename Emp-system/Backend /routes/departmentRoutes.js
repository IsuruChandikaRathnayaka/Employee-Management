const express=require('express');
const router =express.Router();
const departmentController=require('../controllers/departmentController');

router.get('/allDepartments',departmentController.getAllDepartments);
router.get('/departments',departmentController.getAllDepartments);
router.delete('/deleteDepartment/:id',departmentController.deleteDepartment);
router.get('/DepartmentView/:id',departmentController.viewDepartment);
router.put('/DepartmentUpdate/:id',departmentController.updateDepartment);
router.post("/addDepartment",departmentController.addDepartment);

module.exports = router;