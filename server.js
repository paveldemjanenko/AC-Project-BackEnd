import express from 'express';
import session from 'express-session';
import mongo from 'connect-mongo';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import './utils/dotenv';
import auth from './routes/authRoute';
import user from './routes/userRoute';
import products from './routes/productRoute';
import defaultErrorHandler from './middlewares/defaultErrorHandler';
import authenticate from './middlewares/authenticate';

const logger = require('./utils/logger')('server');

const app = express();

const MongoStore = mongo(session);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', () => {
    logger.log('error', 'MongoDB connection error. Please make sure MongoDB is running.');
    process.exit();
});
mongoose.connection.once('open', () => logger.log('info', 'MongoDB has been connected.'));

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
      resave: true,
      saveUninitialized: true,
      secret: process.env.SESSION_SECRET,
      store: new MongoStore({
        url: process.env.MONGODB_URI,
        autoReconnect: true
      }),
    }),
  );

app.use(`/api/v${process.env.API_VERSION}/auth`, auth);
app.use(`/api/v${process.env.API_VERSION}/users`, authenticate, user);
app.use(`/api/v${process.env.API_VERSION}/products`, products);

app.use('/data', express.static('data'));
app.use(defaultErrorHandler);

const host = process.env[`HOST_${process.platform.toUpperCase()}`];
const port = process.env.PORT || process.env.HOST_PORT;

app.listen(port, host, () => {
    logger.log('info', `App is running at http://${host}:${port} in ${app.get('env')} mode.`);
});