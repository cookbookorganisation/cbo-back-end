const dB = require('../database/dbConfig.js');

module.exports = {
    // names of functions
    find,
};

// Functions

function find(){
    return dB('users')
}

function findBy(filter){
    return dB('users').where(filter)
}