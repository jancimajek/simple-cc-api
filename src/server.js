import debug from './utils/debug';
import app from './app';

const port = process.env.PORT || 3000;
process.env.APP_NAME = process.env.APP_NAME || 'simple-cc-api';

app.listen(port, () => {
  debug('server')('Listening on port', port);
});
