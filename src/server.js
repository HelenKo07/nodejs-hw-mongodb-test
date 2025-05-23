import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import getEnvVar from './utils/getEnvVar.js';

const PORT = Number(getEnvVar('PORT', '3000'));

export default function setupServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(pino({
    transport: {target: 'pino-pretty',},
  }),
);

app.get('/', (req, res) => {
  res.json({ message: 'Hello, World!',});
});

app.use('*', (req, res, next) => {
    res.status(404).json({message: 'Not found',});
  });


  app.use((err, req, res, next) => {
    res.status(500).json({message: 'Something went wrong', error: err.message,});
  });

  app.listen(PORT, (err) => {
    if (err) {
      throw err;
    }
    console.log(`Server is running on port ${PORT}`);
  });

}
