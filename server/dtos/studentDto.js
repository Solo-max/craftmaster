module.exports = class StudentDto {
    phone;
    id;
    full_name_student;

    constructor(model) {
        this.phone = model.phone;
        this.id = model.id;
        this.full_name_student = model.full_name_student;
    }
};
