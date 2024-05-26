import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { sequelize } from './models';
import router from "./routes";
import { port } from './config'

const app = express();

app.use(express.json());
app.use(cors());
app.use(router)

app.use((req: Request, res: Response) => {
    res.status(404).json({ message: 'Not found' });
})
app.use((error: { message: any, status?: any }, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    const { status = 500, message = 'Server error' } = error;
    res.status(status).json({ message });
});

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(err => console.log(err));
