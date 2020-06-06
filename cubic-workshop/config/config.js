module.exports = {
    development: {
        port: process.env.PORT || 3000,
        databaseUrl: `mongodb+srv://pesho:${process.env.DB_PASSWORD}@cluster0-xefwn.mongodb.net/cubicle?retryWrites=true&w=majority`
    },
    production: {}
};