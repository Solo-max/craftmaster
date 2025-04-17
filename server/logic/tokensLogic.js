const jwt = require("jsonwebtoken");
const { Tokens } = require("../models/models");

class TokensLogic {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {
            expiresIn: "15s",
        });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {
            expiresIn: "30d",
        });

        return {
            accessToken,
            refreshToken,
        };
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_KEY);
            return userData;
        } catch (err) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_KEY);
            return userData;
        } catch (err) {
            return null;
        }
    }

    async findToken(refreshToken) {
        const tokenData = await Tokens.findOne({ where: { refreshToken } });
        return tokenData;
    }

    async saveTokens(user_id, refreshToken) {
        const tokenData = await Tokens.findOne({ where: { user_id } });
        if (tokenData) {
            const newToken = await Tokens.update(
                { refreshToken: refreshToken },
                { where: { user_id } }
            );
            return newToken;
        }
        const token = await Tokens.create({ user_id, refreshToken });
        return token;
    }
}

module.exports = new TokensLogic();
