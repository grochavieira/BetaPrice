const jwt = require("jsonwebtoken");
const ClientModel = require("../models/ClientModel");
require("dotenv").config();

module.exports = async (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(400).json({
      errors: ["É preciso fazer login"],
    });
  }

  const [, token] = authorization.split(" ");

  try {
    const data = jwt.verify(token, process.env.SECRET_KEY);
    const {
      id,
      name,
      email,
      username,
      avatar_url,
      telephone,
      user_type,
    } = data;

    const client = await ClientModel.findByPk(id);

    if (!client) {
      return response.status(401).json({
        errors: ["Usuário inválido"],
      });
    }

    request.id = id;
    request.name = name;
    request.email = email;
    request.username = username;
    request.avatar_url = avatar_url;
    request.telephone = telephone;
    request.user_type = user_type;
    return next();
  } catch (err) {
    return response.status(401).json({
      errors: {
        general: "Token expirado ou inválido",
      },
    });
  }
};
