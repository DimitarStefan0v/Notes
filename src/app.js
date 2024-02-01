const path = require('path');

const express = require('express');

const expressConfig = require('./config/expressConfig');
const ejsConfig = require('./config/ejsConfig');
const dbConnect = require('./config/dbConfig');
const routes = require('./routes');

const app = express();
const PORT = 5000;

ejsConfig(app);
expressConfig(app);

dbConnect()
	.then(() => console.log('DB connected successfully'))
	.catch((err) => console.log('DB error ', err));

app.use(routes);

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
