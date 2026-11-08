import server from './server.js';
import config from './configs/config.js';

// Start the server from your entry point
server.listen(config.port, () => {
  console.log(`Server is running on port http://localhost:${config.port}/`);
});
