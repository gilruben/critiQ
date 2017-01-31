const express = require('express');
const path = require('path');
const db = require('./models');
const router = require('./routes');
const applyExpressMiddleware = require('./middleware');

const app = express();

// Adds middleware to express
applyExpressMiddleware(app);


db.sequelize.sync().then(() => {
  // API route
  app.use('/api', router);

  // Front-End Route
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'frontend/index.html'));
  });

  const port = process.env.PORT || 5555;

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});
