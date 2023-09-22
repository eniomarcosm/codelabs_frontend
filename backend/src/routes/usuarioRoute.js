const express = require("express");
const router = express.Router();
const user = require("../controller/usuarioController");

router.get("/", user.getAll);
router.get("/:id", user.getById);
// router.delete("/:id", user.delete);
router.post("/", user.save);
// router.post("/adduserfuncionario", user.addUserFuncionario);
// router.post("/adduserestudante", user.addUserEstudante);
// router.put("/:id", user.update);


module.exports = router;