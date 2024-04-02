const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');

const adsController = require('../controllers/ads.controller');
const imageUpload = require('../utils/imageUpload');

router.get('/', adsController.getAllAds);
router.get('/:id', adsController.getAdById);
router.get('/search/:searchPhrase', adsController.searchAds);
router.post('/', authMiddleware, imageUpload.single('image'), adsController.createAd);
router.put('/:id', authMiddleware, imageUpload.single('image'), adsController.updateAd);
router.delete('/:id', authMiddleware, adsController.deleteAd);


module.exports = router;