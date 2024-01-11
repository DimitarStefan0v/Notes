const express = require('express');

const routes = require('./routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'src/views');

const PORT = 5000;

app.use(routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));