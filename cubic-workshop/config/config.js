module.exports = {
    development: {
        port: process.env.PORT ,
        privetKey: process.env.PRIVATE_KEY,
        databaseUrl: process.env.DATABASE_URL
    },
    production: {}
};