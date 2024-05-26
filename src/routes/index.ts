import { Router } from 'express';
import productsRouter from './products'
import arrivalsRouter from "./arrivals";
import ordersRouter from "./orders";
import costsRouter from "./costs";

const router = Router();

router.use('/products', productsRouter );
router.use('/arrivals', arrivalsRouter)
router.use('/cost', costsRouter)
router.use('/', ordersRouter)

export default router;