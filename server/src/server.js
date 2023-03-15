const express = require('express')
const app = express()
const bodyParser = require('body-parser');
let initapi = require('./router/Api')
const cors = require('cors')
const port = 8080
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

initapi(app)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })