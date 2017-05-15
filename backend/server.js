const express = require('express');
const path = require('path');
const db = require('./models');
const router = require('./routes');
const applyExpressMiddleware = require('./middleware');
const authRouter = require('./routes/auth-router');
const deadlineChecker = require('./utilities/deadline-checker');

const app = express();

// Adds middleware to express
applyExpressMiddleware(app);

// API route
app.use('/api', router);

// Authentication Route
app.use('/auth', authRouter);

// Front-End Route
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'frontend/index.html'));
});


db.sequelize.sync().then(() => {
  const port = process.env.PORT || 5555;

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

  // Checks for documents that have reached their deadline and sets their active
  // column to false
  deadlineChecker('00 00 00 * * 0-6');
});

module.exports = app;
