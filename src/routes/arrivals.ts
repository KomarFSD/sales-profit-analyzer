import { Router } from 'express';
import {errorCatcher, validation} from "../middlewares";
import {arrivalsController} from "../controllers";
import {trade} from '../schemas'

const router = Router();
router.post('/', validation(trade),errorCatcher(arrivalsController.arrival))

export default router;