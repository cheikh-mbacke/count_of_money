const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const adminMiddleware = require("../middlewares/admin");
const { getCryptoList, getExchangeRates, getCryptoDetails, getCryptoHistory, addCrypto, deleteCrypto } = require("../controllers/crypto/cryptoAPI");

router.get("/", getCryptoList);
router.get("/rates", getExchangeRates);
router.get('/:id', getCryptoDetails);
router.get('/:id/history/:period', getCryptoHistory);

router.post('/', auth, adminMiddleware, addCrypto);
router.delete('/:id', auth, adminMiddleware, deleteCrypto);

module.exports = router;