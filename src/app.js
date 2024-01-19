const path = require('path');

const express = require('express');
const dbConnect = require('./config/dbConfig');

const routes = require('./routes');

const app = express();
const PORT = 5000;

// ejs config
app.set('view engine', 'ejs');
app.set('views', 'src/views');

// express config
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(routes);

dbConnect()
	.then(() => console.log('DB connected successfully'))
	.catch(err => console.log('DB error ', err));

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
