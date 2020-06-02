const {getCubes, getCube} = require('../controllers/database');

const getAllCubes = () => {
    const allCubes = getCubes();
    return allCubes;
}

const getCubeById = (id) => {
    const cube = getCube(id); 
    return cube;
}

module.exports = {
    getAllCubes,
    getCubeById
}