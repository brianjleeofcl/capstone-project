const path = require('path');
const express = require('express');
const app = express()

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}

app.disable('x-powered-by')

app.use(
  require('morgan')('dev'),
  require('body-parser').json(),
  require('cookie-parser')()
);

app.use('/api',require('./api/api'));
app.use('/device-api' ,require('./device-api/device-api'));
app.use('/tools', require('./tools/tools'));

app.use(express.static(path.resolve(__dirname, '..', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'));
});

app.use((err, req, res, next) => {
  console.error(err)
  res.sendStatus(err.output.statusCode || err.status).end(err.output)
})

module.exports = app;
