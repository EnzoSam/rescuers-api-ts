import express from 'express';
import CaregiverController from '../controllers/caregiver.controller';

const router = express.Router();

router.get('/', CaregiverController.getAllCaregivers);
router.post('/', CaregiverController.createCaregiver);
router.post('/publish-availability', CaregiverController.publishAvailability);
router.get('/:caregiverId/ratings', CaregiverController.getRatings);

export default router;
