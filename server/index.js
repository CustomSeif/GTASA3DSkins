const express = require("express")
const APP = express()

APP.use(require("./controllers/production"))

app.listen(process.env.PORT || 5000, () => console.log("Listening..."))