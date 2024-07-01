const prisma = require("../config/prisma");
const { comparePassword } = require("../utils/bcrypt");
const { generateToken } = require("../utils/jwt");

class AuthentificationController {
  async login(req, res) {
    try {
      const body = req.body;
      const user = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });

      if (user === null) {
        return res.status(404).send("User not found");
      }

      const samePassword = await comparePassword(body.password, user.password);

      if (!samePassword) {
        return res.status(401).send("Unauthorized");
      }

      //generer un token
      const token = generateToken(user);

      return res.status(200).send({ token, user });
    } catch (err) {
      return res.status(500).send({
        message: err.message,
      });
    }
  }
}

module.exports = new AuthentificationController();
