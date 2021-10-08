const express = require("express");
const router = express.Router();
const path = require("path");
const isLogin = require('./middlewares/isLogin')
const upload = require('./middlewares/upload')

const authController = require("./controllers/Auth");
const mainController = require("./controllers/Main");

router.get("/", authController.showLogin);
router.get("/login", authController.showLogin);
router.get("/registro", authController.showRegister);
router.post("/registro", authController.register);

//isLogin tem que vim antes do controller
router.get("/home", isLogin, mainController.showHome);
router.get("/publicar", isLogin, mainController.showCreatePublication);

router.post("/login", authController.login);

//ROTA POST PARA PUBLICACAO FUNCIONAR 
router.post("/publicar", isLogin, upload.single("photo"), mainController.createPublication);

router.post('/comentario', isLogin, mainController.createComment)


module.exports = router;