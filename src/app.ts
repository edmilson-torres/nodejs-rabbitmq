import express from 'express';

import routes from './routers';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', routes);

export default app;
