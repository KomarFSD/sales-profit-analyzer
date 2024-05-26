import { Router } from 'express';
import {errorCatcher, validation} from "../middlewares";
import {productsController} from "../controllers";
import {arrayOfProducts} from "../schemas";

const router = Router();
router.post('/', validation(arrayOfProducts),errorCatcher(productsController.create))

export default router;