/* eslint-disable no-console */
const app = require('./app')();

const server = app.listen(3000);
server.on('listening', onListening);

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.info(
    `Listening on ${bind} in ${process.env.NODE_ENV} environment...`,
  );
}
