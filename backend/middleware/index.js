const bodyParser = require('body-parser');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const PgSimpleSessionStore = require('connect-pg-simple')(session);
const passportConfig = require('../passport/passport');
const path = require('path');

// Function for adding middleware
const applyExpressMiddleware = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname, '../../frontend/bundle')));
  app.use(cookieParser());
  app.use(session({
    store: new PgSimpleSessionStore({
      conString: 'postgres://ruben@localhost:5432/critiq'
    }),
    secret: 'English Master Manipulator',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 90 // 90 days
    },
    ephemeral: true
  }));

  passportConfig(app);
};

module.exports = applyExpressMiddleware;
