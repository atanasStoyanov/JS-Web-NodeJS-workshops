const fs = require('fs');
const path = require('path');

const databseFile = path.join(__dirname, '..', '/config/database.json');


const saveCube = (cube) => {
    const cubes = getCubes();

    cubes.push(cube);

    fs.writeFile(databseFile, JSON.stringify(cubes), err => {
        if (err) {
            throw err;
        }

        console.log('New cube is successfully stored');
    });
}

const getCube = id => {
    const cubes = getCubes();

    const cube = cubes.find(c => c.id === id);

    return cube;
}

const getCubes = () => {

    const cubes = fs.readFileSync(databseFile);

    return JSON.parse(cubes);
}

module.exports = {
    saveCube,
    getCube,
    getCubes
}