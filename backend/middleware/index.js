const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const PgSimpleSessionStore = require('connect-pg-simple')(session);
const passportConfig = require('../passport/passport');
const path = require('path');
const dbConfig = require('../config/config');


// Function for adding middleware
const applyExpressMiddleware = (app) => {
  const { username, database, host } = dbConfig.development;

  const dbString = `postgres://${username}@${host}:5432/${database}`;
  const conString = process.env.DATABASE_URL || dbString;
  const secret = process.env.SECRET || 'English Master Manipulator';

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname, '../../frontend/bundle')));
  app.use(session({
    store: new PgSimpleSessionStore({
      conString
    }),
    secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 90 // 90 days
    },
    ephemeral: true  // session expires when the browser closes
  }));

  passportConfig(app);
};

module.exports = applyExpressMiddleware;
