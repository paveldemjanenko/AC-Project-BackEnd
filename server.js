import express from 'express';
import session from 'express-session';
import mongo from 'connect-mongo';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import './utils/dotenv';
import auth from './routes/authRoute';
import user from './routes/userRoute';

const app = express();

const MongoStore = mongo(session);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

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
  app.use(`/api/v${process.env.API_VERSION}/users`, user);