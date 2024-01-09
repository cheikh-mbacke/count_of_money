const express = require("express");
const router = express.Router();
const adminMiddleware = require("../middlewares/admin");
const { getCryptoList, getExchangeRates, getCryptoDetails, getCryptoHistory, addCrypto, deleteCrypto } = require("../controllers/crypto/cryptoAPI");

router.get("/", getCryptoList);
router.get("/rates", getExchangeRates);
router.get('/:id', getCryptoDetails);
router.get('/:id/history', getCryptoHistory);

router.post('/', adminMiddleware, addCrypto);
router.delete('/:id', adminMiddleware, deleteCrypto);


module.exports = router;