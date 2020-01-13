const app = require('./server');
const config = require('./config');

const port = config.get('PORT');

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`user management API is listening on port ${port}`);
});
