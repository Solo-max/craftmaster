const { Students } = require("../models/models");

class StudentsController {
    async authorization(req, res) {
        try {
            const { role } = req.body;
            if (role == "admin") {
                const { password } = req.body;
                if (password == "123") {
                    return res.status(200).json({ message: "Вход одобрен" });
                }
                return res.status(400).json({ message: "Неверный пароль" });
            }
            if (role == "user") {
                const { phone, password } = req.body;
                if (!phone || !password) {
                    return res
                        .status(400)
                        .json({ message: "укажите пароль и телефон" });
                }
                const student = await Students.findOne({ where: { phone } });
                if (student.length == 0) {
                    return res
                        .status(400)
                        .json({ message: "Пользователь не найден" });
                }
                if (password != student.password) {
                    return res
                        .status(400)
                        .json({ message: "Не верный пароль" });
                }
                return res.status(200).json(student);
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Ошибка сервера" });
        }
    }
}

module.exports = new StudentsController();
