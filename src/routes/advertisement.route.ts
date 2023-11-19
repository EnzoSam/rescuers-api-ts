import express from 'express';
import AdvertisementController from '../controllers/advertisementcontroller';
import authenticateToken from '../middlewares/auth.middleware';

const router = express.Router();

router.use(authenticateToken);
router.get('/', AdvertisementController.getAllAdvertisements);
router.post('/', AdvertisementController.createAdvertisement);
router.put('/:advertisementId', AdvertisementController.editAdvertisement);
router.delete('/:advertisementId', AdvertisementController.deleteAdvertisement);
router.get('/:advertisementId', AdvertisementController.getAdvertisementDetails);

export default router;
