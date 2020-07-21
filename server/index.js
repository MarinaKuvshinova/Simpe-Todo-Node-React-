const express = require('express');
const routes = require("./routes/index");
// const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();
const PORT =  process.env.PORT || 4000;


app.set('port', PORT);

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
// app.use(cors());
app.use(routes);

app.listen(app.get('port'), () => {
    console.log('Server has been started...')
});