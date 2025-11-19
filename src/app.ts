import express, { type Express } from 'express';
import cors from 'cors';
import linkRoutes from './routes/link.routes';

const app: Express = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/', linkRoutes);

export default app;
