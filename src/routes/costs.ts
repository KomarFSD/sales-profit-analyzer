import { Router, Request , Response} from 'express';
import {errorCatcher} from "../middlewares";
import {costsController} from "../controllers";

const router = Router();
router.get('/:product_id', errorCatcher(costsController.getCosts))

export default router;