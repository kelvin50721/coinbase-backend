const Crypto = require("../models/Crypto");

// @desc   Get all cryptocurrencies
// @route  GET /crypto
const getAllCrypto = async (req, res) => {
  try {
    const cryptos = await Crypto.find().sort({ createdAt: -1 });
    return res.status(200).json({
      message: "Cryptocurrencies fetched successfully.",
      count: cryptos.length,
      data: cryptos,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error.", error: error.message });
  }
};

// @desc   Get top gainers (highest 24h change)
// @route  GET /crypto/gainers
const getTopGainers = async (req, res) => {
  try {
    const gainers = await Crypto.find({ change24h: { $gt: 0 } }).sort({ change24h: -1 });
    return res.status(200).json({
      message: "Top gainers fetched successfully.",
      count: gainers.length,
      data: gainers,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error.", error: error.message });
  }
};

// @desc   Get new listings (most recently added)
// @route  GET /crypto/new
const getNewListings = async (req, res) => {
  try {
    const newListings = await Crypto.find().sort({ createdAt: -1 });
    return res.status(200).json({
      message: "New listings fetched successfully.",
      count: newListings.length,
      data: newListings,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error.", error: error.message });
  }
};

// @desc   Add a new cryptocurrency
// @route  POST /crypto
const addCrypto = async (req, res) => {
  try {
    const { name, symbol, price, image, change24h } = req.body;

    // Validate required fields
    if (!name || !symbol || !price || !image || change24h === undefined) {
      return res.status(400).json({ message: "All fields are required: name, symbol, price, image, change24h." });
    }

    // Check if crypto with same symbol already exists
    const existing = await Crypto.findOne({ symbol: symbol.toUpperCase() });
    if (existing) {
      return res.status(400).json({ message: `A cryptocurrency with symbol "${symbol.toUpperCase()}" already exists.` });
    }

    const crypto = await Crypto.create({ name, symbol, price, image, change24h });

    return res.status(201).json({
      message: "Cryptocurrency added successfully.",
      data: crypto,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error.", error: error.message });
  }
};

module.exports = { getAllCrypto, getTopGainers, getNewListings, addCrypto };