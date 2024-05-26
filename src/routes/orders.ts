import { Router } from 'express';
import {errorCatcher, validation} from "../middlewares";
import {ordersController} from "../controllers";
import {trade} from "../schemas";

const router = Router();
router.post('/orders', validation(trade),errorCatcher(ordersController.sale))
router.get('/report',errorCatcher(ordersController.report))

export default router;