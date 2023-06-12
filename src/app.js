const express = require('express');

const app = express();

const middleware1 = (req, res, next) => {
  console.log('doing stuff in middleware1');
  next();
};
const middleware2 = (req, res, next) => {
  console.log('doing stuff in middleware 2');
  next();
};

// const items = [
//   { id: 1, name: 'item1' },
//   { id: 2, name: 'item2' },
// ];

// app.get('/things', (req, res) => {
//   console.log('handling GET /things');
//   res.send(items);
// });

// app.use([middleware1, middleware2]);
// app.use(middleware2);

// app.get('/myroute', (req, res) => {
//   console.log('handing/myroute');
//   res.send('content for /myroute');
// });

const extractUserName = (req, res, next) => {
  if (req.query.name) {
    req.userName = req.query.name;
    next();
  } else {
    res
      .status(400)
      .send('You have to specify a "name" query parameter to call this route');
  }
};
app.get('/hello', extractUserName, (req, res) => {
  console.log('handling /hello');
  res.send(`Hello ${req.userName} !`);
});

app.get('/myroute', middleware1, middleware2, (req, res) => {
  console.log('handling /myroute');
  res.send('content for /myroute');
});

module.exports.app = app;
