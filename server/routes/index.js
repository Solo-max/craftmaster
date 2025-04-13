const { Router } = require("express");
const StudentsController = require("../controller/studentsController");
const TeacherController = require("../controller/teacherController");
const { body } = require("express-validator");

const router = Router();

router.post(
    "/authUser",
    body("password").notEmpty().withMessage("Пароль обязателен"),
    body("phone").notEmpty().withMessage("Телефон обязателен"),
    StudentsController.authorizationUser
);
router.post(
    "/authAdmin",
    body("password").notEmpty().withMessage("Пароль обязателен"),
    TeacherController.authorizationAdmin
);

module.exports = router;
