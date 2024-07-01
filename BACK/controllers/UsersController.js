const prisma = require("../config/prisma");
const { hashPassword } = require("../utils/bcrypt");

class UsersController {
  async getMyProfile(req, res) {
    const user = req.user;
    const id = user.id;
    const cards = await prisma.userCard.findMany({
      where: {
        id: parseInt(id),
      },
    });
    // console.log("Cartes de l'utilisateur:", cards);
    // console.log("Id de l'utilisateur:", id);
    return res.status(200).send({ user, cards });
  }

  async index(req, res) {
    try {
      const user = await prisma.user.findMany(); //recuperer la liste de tous les users et attendre la reponse
      return res.status(200).send(user);
    } catch (err) {
      return res.status(500).send({
        message: err.message,
      });
    }
  }

  async store(req, res) {
    try {
      const body = req.body;
      const user = await prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: await hashPassword(body.password),
        },
      });
      return res.status(201).send(user);
    } catch (err) {
      return res.status(500).send({
        message: err.message,
      });
    }
  }

  async storeCards(req, res) {
    try {
      const body = req.body;
      const userId = body.id;
      // console.log(userId);
      const cardIds = body.idCards;
      // console.log(cardIds);

      // Récupérer les identifiants des cartes que l'utilisateur possède déjà
      const existingUserCards = await prisma.userCard.findMany({
        where: {
          id: userId,
          cardId: {
            in: cardIds,
          },
        },
      });

      //filtrer
      const newCardIds = cardIds.filter(
        (cardId) =>
          !existingUserCards.some((userCard) => userCard.cardId === cardId)
      );

      const createdUserCards = await Promise.all(
        newCardIds.map(async (cardId) => {
          return await prisma.userCard.create({
            data: {
              cardId: cardId,
              id: userId,
            },
          });
        })
      );

      // console.log(createdUserCards);

      return res.status(201).json(createdUserCards);
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Internal server error", error: err });
    }
  }

  async show(req, res) {
    try {
      const id = req.params.idUser;

      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
      });

      if (!user) {
        return res.status(404).send("User not found");
      }

      return res.status(200).send(user);
    } catch (err) {
      console.error("Erreur:", err);
      return res.status(500).send({
        message: err.message,
      });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.idUser;
      const body = req.body;
      let user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
      });

      if (user === null) {
        return res.status(404).send("User not found");
      }

      user = await prisma.user.update({
        where: { id: parseInt(id) },
        data: body,
      });

      return res.status(200).send(user);
    } catch (err) {
      return res.status(500).send({
        message: err.message,
      });
    }
  }

  async destroy(req, res) {
    try {
      const id = req.params.idUser;
      let user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
      });

      if (user === null) {
        return res.status(404).send("User not found");
      }

      user = await prisma.user.delete({
        where: { id: parseInt(id) },
      });

      return res.status(204).send("User deleted");
    } catch (err) {
      return res.status(500).send({
        message: err.message,
      });
    }
  }
}

module.exports = new UsersController();
