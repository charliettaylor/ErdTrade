import express, { Application } from 'express';
import cors from 'cors';
import logging from './utils/logging';
import router from './routes/routes';

const NAMESPACE = 'App';

const PORT = process.env.PORT || 8000;

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use(router);

const server = app.listen(PORT, () => {
  logging.info(NAMESPACE, `Port is running on ${PORT}`);
});

export default server;
