import logging from './utils/logging';
import express, { Application } from 'express';
import router from './routes/routes';
import cors from 'cors';

const NAMESPACE = 'App';

const PORT = process.env.PORT || 8000;

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use(router);

app.listen(PORT, () => {
    logging.info(NAMESPACE, `Port is running on ${PORT}`);
});