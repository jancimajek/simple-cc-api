import express from 'express';
import debug from './utils/debug';

const port = process.env.PORT || 3000;
process.env.APP_NAME = process.env.APP_NAME || 'simple-cc-api';

const app = express();

app.listen(port, () => {
  debug('server')('Listening on port', port);
});
