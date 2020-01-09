const express = require("express")
const APP = express()

APP.use(require("./controllers/skins"))
APP.use(require("./controllers/production"))

APP.listen(process.env.PORT || 5000, () => console.log("Listening..."))