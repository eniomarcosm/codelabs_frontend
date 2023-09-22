const express = require("express");
const router = express.Router();
const danos = require("../controller/danosController");

router.get("/", danos.getAll);
router.get("/:id", danos.getById);
router.post("/", danos.save);
router.put("/:id", danos.update);


module.exports = router;