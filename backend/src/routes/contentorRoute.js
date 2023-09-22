const express = require("express");
const router = express.Router();
const contentor = require("../controller/contentorController");

router.get("/", contentor.getAll);
router.get("/:id", contentor.getById);
// router.delete("/:id", contentor.delete);
router.post("/", contentor.save);
// router.post("/adduserfuncionario", user.addUserFuncionario);
// router.post("/adduserestudante", user.addUserEstudante);
// router.put("/:id", user.update);


module.exports = router;