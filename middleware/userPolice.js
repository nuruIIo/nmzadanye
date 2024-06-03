const { to } = require("../helpers/to_promise");
const myJwt = require("../services/jwtService");

module.exports = async function (request, response, next) {
  try {
    const authorization = request.headers.authorization;
    if (!authorization) {
      return response.status(403).json({ message: `user isn't registered` });
    }

    const bearer = authorization.split(" ")[0];
    const token = authorization.split(" ")[1];

    if (bearer != "Bearer" || !token) {
      return response.status(403).json({ message: "user isn't registered" });
    }

    const [error, decodedToken] = await to(myJwt.verifyAccessToken(token));
    if (error) {
      return response.status(403).json({ message: error.message });
    }

    request.user = decodedToken;

    next();
  } catch (error) {
    console.log(error);
    return response.status(403).send({ message: `user isn't registered` });
  }
};
