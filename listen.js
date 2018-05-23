const app = require('./app');

const {PORT=3000} = process.env;

app.listen(3000, (err) => {
  if (err) throw err;
  console.log(`listening on port ${PORT}`);
});