const dB = require('../database/dbConfig.js');

module.exports = {
    // names of functions
    find,
    findBy,
    findById
};

// Functions

function find(){
    return dB('users')
}

function findBy(filter){
    return dB('users').where(filter)
}

function findById(id){
    return dB('users')
        .where({ id })
        .first()
}