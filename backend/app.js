const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const sign = require('./routes/auth');
const auth = require('./middlewares/auth');
const centralErrorsHandler = require('./middlewares/centralErrorsHandler');
const router = require('./routes');
const { NotFoundError } = require('./errors');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(sign);
app.use(auth);
app.use(router);

app.use(errors());

app.use((req, res, next) => {
  const err = new NotFoundError('Был запрошен несуществующий роут.');
  next(err);
});

app.use(centralErrorsHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
