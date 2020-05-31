const fs = require('fs');
const path = require('path');

const getCubes = () => {

    const databseFile = path.join(__dirname, '..', '/config/database.json');

    const cubes = fs.readFileSync(databseFile);

    return JSON.parse(cubes);
}

module.exports = {
    getCubes
}