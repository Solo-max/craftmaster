const { Router } = require("express");
const StudentsController = require("../controller/studentsController");
const TeacherController = require("../controller/teacherController");
const { body } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");

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
router.post(
    "/addUser",
    body("full_name_parent")
        .notEmpty()
        .withMessage("full_name_parent обязателен"),
    body("full_name_student")
        .notEmpty()
        .withMessage("full_name_student обязателен"),
    body("password").notEmpty().withMessage("Пароль обязателен"),
    body("phone").notEmpty().withMessage("Телефон обязателен"),
    StudentsController.addUser
);
router.get("/homePage", authMiddleware, StudentsController.getHomePage);
router.get("/getAllUsers", authMiddleware, StudentsController.getAllUsers);
router.get("/refresh", StudentsController.refresh);

module.exports = router;
