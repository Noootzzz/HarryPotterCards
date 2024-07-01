const express = require("express");
const UsersController = require("../controllers/UsersController");
const AuthentificationController = require("../controllers/AuthentificationController");

const AuthMiddleware = require("../middlewares/auth");

const router = express.Router();

// /users en GET : recuperer tous les utilisateurs
// /users en POST : creer un utilisateur
// /users/:idUser en GET : recuperer les informations de l'utilisateur
// /users/:idUser en PUT : modifier les informations de l'utilisateur
// /users/:idUser en DELETE : supprimer l'utilisateur

// /login en POST : se connecter à son compte

router.get("/users", UsersController.index); //on utilise la fonction index de la classe UserController du fichier UserController pour l'URL /users
router.post("/users", UsersController.store);
router.post("/cards", UsersController.storeCards);
router.get("/users/:idUser", UsersController.show);
router.put("/users/:idUser", UsersController.update);
router.delete("/users/:idUser", UsersController.destroy);

router.post("/login", AuthentificationController.login);

router.get(
  "/getMyProfile",
  AuthMiddleware.authenticate,
  UsersController.getMyProfile
);

module.exports = router;
