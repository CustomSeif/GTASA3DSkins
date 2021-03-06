const express = require("express")
const router = new express.Router()
const database = require("../database")

router.get("/skin/:model", async (request, response) => {
    try {
        const query = await database.query(
            `
                SELECT id,
                model,
                name,
                gender,
                "modelURL",
                "lightingIntensity"
                FROM public.skins
                WHERE model = $1;
            `,
            [request.params.model]
        )

        response.json(query.rows)
    }

    catch(error) {
        console.error(error)
    }
})

router.get("/skin-id/:id", async (request, response) => {
    try {
        const query = await database.query(
            `
                SELECT id,
                model,
                name,
                gender,
                "modelURL",
                "lightingIntensity"
                FROM public.skins
                WHERE id = $1;
            `,
            [request.params.id]
        )

        response.json(query.rows)
    }

    catch(error) {
        console.error(error)
    }
})

module.exports = router