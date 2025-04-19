const { Students } = require("../models/models");
const ApiError = require("../Errors/ApiErrors");
const bcrypt = require("bcrypt");
const tokensLogic = require("./tokensLogic");
const StudentDto = require("../dtos/studentDto");

class StudentsLogic {
    async createStudent(phone, full_name_parent, full_name_student, password) {
        const candidate = await Students.findOne({ where: { phone } });
        if (candidate) {
            throw ApiError.BadRquest(
                "Студент с таким телефоном уже существует"
            );
        }

        const hashPassword = await bcrypt.hash(password, 3);

        const student = await Students.create({
            phone,
            full_name_parent,
            full_name_student,
            password: hashPassword,
        });

        const studentDto = new StudentDto(student);
        const tokens = tokensLogic.generateTokens({ ...studentDto });
        await tokensLogic.saveTokens(studentDto.id, tokens.refreshToken);
        return {
            ...tokens,
            user: studentDto,
        };
    }

    async login(phone, password) {
        const student = await Students.findOne({ where: { phone } });
        if (!student) {
            throw ApiError.BadRquest("Студент с таким телефоном не существует");
        }

        const isPassword = await bcrypt.compare(password, student.password);
        if (!isPassword) {
            throw ApiError.BadRquest("Не верный пароль");
        }
        const studentDto = new StudentDto(student);
        const tokens = tokensLogic.generateTokens({ ...studentDto });
        await tokensLogic.saveTokens(studentDto.id, tokens.refreshToken);
        return {
            ...tokens,
            user: studentDto,
        };
    }
    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const studentData = tokensLogic.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokensLogic.findToken(refreshToken);
        if (!studentData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }

        const student = await Students.findOne({
            where: { id: studentData.id },
        });
        const studentDto = new StudentDto(student);
        const tokens = tokensLogic.generateTokens({ ...studentDto });
        await tokensLogic.saveTokens(studentDto.id, tokens.refreshToken);
        return {
            ...tokens,
            user: studentDto,
        };
    }

    async getStudent(id) {
        const studentData = await Students.findOne({ where: { id } });
        return studentData;
    }
}

module.exports = new StudentsLogic();
