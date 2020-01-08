const { Pool } = require("pg")

if (process.env.NODE_ENV !== "production") {
    const dotenv = require("dotenv")
    dotenv.config()
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

const query = (query, parameters) => {
    return new Promise((resolve, reject) => {
        try {
            resolve(pool.query(query, parameters))
        }
        catch(error) {
            reject(error)
        }
    })
}

module.exports = { query }