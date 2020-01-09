const express = require("express")
const router = new express.Router()
const database = require("../database")

router.get("/skins", async (_, response) => {
    try {
        const query = await database.query(`
            SELECT
                model,
                name,
                "imageURL"
            FROM public.skins
            ORDER BY id;
        `)
        response.json(query.rows)
    }

    catch(error) {
        console.error(error)
    }
})

module.exports = router