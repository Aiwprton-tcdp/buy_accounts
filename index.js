import express from 'express';
import dotenv from 'dotenv';
import LZTApi from './src/routes/APIRoute.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use('/lztapi', LZTApi);
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
      message: err.message,
      error: {}
  });
});

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`Listening to port http://localhost:${port}`);
});