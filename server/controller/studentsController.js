const ApiError = require("../Errors/ApiErrors");
const { Students } = require("../models/models");
const { validationResult } = require("express-validator");
const StudentsLogic = require("../logic/studentsLogic");

class StudentsController {
    async authorizationUser(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw ApiError.BadRquest("Ошибка валидации", errors.array());
            }
            const { phone, password } = req.body;
            const studentData = await StudentsLogic.login(phone, password);
            res.cookie("refreshToken", studentData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.status(200).json(studentData);
        } catch (err) {
            next(err);
        }
    }
    async addUser(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw ApiError.BadRquest("Ошибка валидации", errors.array());
            }
            const { phone, full_name_parent, full_name_student, password } =
                req.body;
            const studentData = await StudentsLogic.createStudent(
                phone,
                full_name_parent,
                full_name_student,
                password
            );
            res.cookie("refreshToken", studentData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.status(200).json(studentData);
        } catch (err) {
            next(err);
        }
    }
    async getAllUsers(req, res, next) {
        try {
            const students = await Students.findAll();
            res.status(200).json(students);
        } catch (err) {
            next(err);
        }
    }
    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const studentData = await StudentsLogic.refresh(refreshToken);
            res.cookie("refreshToken", studentData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.status(200).json(studentData);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new StudentsController();
