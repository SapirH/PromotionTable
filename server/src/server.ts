import express, { Request, Response, NextFunction, Express } from 'express';
import cors from 'cors';
    
import router from './routes';
import config from './config';

const PORT = config.port;

const app: Express = express();
app.use(cors());
app.use(express.json())

app.use('/', router);

app.use((req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(404).send('<h1>404- Page not found</h1>');
    } catch (err) {
        next(err);
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});