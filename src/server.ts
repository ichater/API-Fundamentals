import app from './app.js';
import config from './configs/config.js';

app.listen(config.port, () => {
  console.log(`Server is running on port http://localhost:${config.port}/`);
});
