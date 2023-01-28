import express from 'express';
import { checkout,paymentVerification,getKey } from '../controllers/payment.js';
const router = express.Router();


router.post('/checkout',checkout)
router.post('/paymentverification',paymentVerification);
router.get('/getKey',getKey);

export default router;