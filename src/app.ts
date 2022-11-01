import express, { NextFunction, Request, Response } from 'express';
import routes from './routers';

const app = express();

app.use(express.json());

app.use('/api', routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (!err) {
        return next();
    }
    res.status(500);
    res.send({ error: 'Internal server error' });
});

export default app;
