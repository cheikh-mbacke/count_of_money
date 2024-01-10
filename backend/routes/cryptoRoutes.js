const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const adminMiddleware = require("../middlewares/admin");
const { getCryptoList, getCryptoDetails, getCryptoHistory, addCrypto, deleteCrypto } = require("../controllers/crypto/cryptoAPI");

router.get("/", getCryptoList);
router.get('/:id', auth, getCryptoDetails);
router.get('/:id/history/:period', auth, getCryptoHistory);

router.post('/', auth, adminMiddleware, addCrypto);
router.delete('/:id', auth, adminMiddleware, deleteCrypto);

module.exports = router;