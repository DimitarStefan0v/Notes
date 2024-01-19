const path = require('path');

const express = require('express');

const expressConfig = require('./config/expressConfig');
const dbConnect = require('./config/dbConfig');

const app = express();
const PORT = 5000;

// ejs config
app.set('view engine', 'ejs');
app.set('views', 'src/views');

// express config
expressConfig(app);

dbConnect()
	.then(() => console.log('DB connected successfully'))
	.catch((err) => console.log('DB error ', err));

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
