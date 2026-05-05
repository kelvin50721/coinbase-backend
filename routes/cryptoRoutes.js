const express = require("express");
const router = express.Router();
const { getAllCrypto, getTopGainers, getNewListings, addCrypto } = require("../controllers/cryptoController");

// IMPORTANT: specific routes must come before dynamic routes
router.get("/gainers", getTopGainers);
router.get("/new", getNewListings);
router.get("/", getAllCrypto);
router.post("/", addCrypto);

module.exports = router;