const ApiError = require("../Errors/ApiErrors");
const { Students } = require("../models/models");
const { validationResult } = require("express-validator");

class StudentsController {
    async authorizationUser(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw ApiError.BadRquest("Ошибка валидации", errors.array());
            }
            const { phone, password } = req.body;
            console.log(phone);
            const student = await Students.findOne({ where: { phone } });
            if (!student) {
                throw ApiError.UnauthorizedUserError();
            }
            if (password != student.password) {
                throw ApiError.UnauthorizedUserError();
            }
            return res.status(200).json(student);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new StudentsController();
