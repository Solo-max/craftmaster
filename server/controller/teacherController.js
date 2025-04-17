const ApiError = require("../Errors/ApiErrors");
const { validationResult } = require("express-validator");

class TeacherController {
    async authorizationAdmin(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw ApiError.BadRquest("Ошибка валидации", errors.array());
            }
            const { password } = req.body;
            if (password != "123") {
                throw ApiError.BadRquest("Не верный пароль");
            }
            return res.status(200).json({ message: "Вход одобрен" });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new TeacherController();
