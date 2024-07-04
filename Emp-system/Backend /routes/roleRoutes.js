const express=require('express');
const router =express.Router();
const roleController=require('../controllers/roleController');

router.get("/DisplayRoles",roleController.displayAllRoles);
router.get("/RoleView/:id",roleController.getRole);
router.put("/RoleUpdate/:id",roleController.updateRole);
router.delete("/deleteRole/:id",roleController.deleteRole);
router.post("/addRole",roleController.addRole);
module.exports = router;