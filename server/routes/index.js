const { Router } = require("express");
const StudentsController = require("../controller/studentsController");

const router = Router();

router.post("/reg", StudentsController.authorization);

module.exports = router;
