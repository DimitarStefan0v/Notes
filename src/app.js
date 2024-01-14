const express = require('express');

const routes = require('./routes');

const app = express();

// ejs config
app.set('view engine', 'ejs');
app.set('views', 'src/views');

// express config
app.use(express.urlencoded({ extended: false }));
app.use(routes);

const port = 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
