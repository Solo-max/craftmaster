module.exports = class ApiError extends Error {
    constructor(status, message, errors = []) {
        super(message); // Вызываем конструктор родительского класса Error и передает ему сообщение об ошибке
        this.status = status;
        this.errors = errors;
    }

    static BadRquest(message, errors = []) {
        return new ApiError(400, message, errors);
    }
    static UnauthorizedUserError() {
        return new ApiError(401, "Неверный телефон или пароль");
    }
    static UnauthorizedAdminError() {
        return new ApiError(401, "Неверный пароль");
    }
};
