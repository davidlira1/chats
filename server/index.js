const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

app.post('/message', (req, res) => {
    console.log(req.body);
})

app.listen(port, (err) => {
    if(err) console.error(err);

    console.log(`Listening on ${port}`);
})