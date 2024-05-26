import { Request, Response, NextFunction } from 'express';

type ControllerFunction = (res: Request, req: Response) => Promise<any|void>;

export const errorCatcher = (controller: ControllerFunction) => {
    return async (res: Request, req: Response, next: NextFunction) => {
        try {
            await controller(res, req);
        } catch (error) {
            next(error)
        }
    }
}