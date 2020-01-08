const path = require("path")
const express = require("express")
const router = new express.Router()

if (process.env.NODE_ENV === "production") {
    const reactBuildPath = path.join(__dirname, "..", "..", "client", "build")
    router.use(express.static(reactBuildPath))

    router.get("/*", (_, response) => response.sendFile(path.join(reactBuildPath, "index.html")))
}

module.exports = router