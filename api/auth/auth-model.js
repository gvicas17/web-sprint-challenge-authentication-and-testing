const db = require('../../data/dbConfig')

module.exports = {
    find, 
    add,
    findById, 
    findBy
}

function find(){
    return db('users')
    .select('id', 'username')
    .orderBy('id')
}

async function add(user){
    const [id] = await db('users')
    .insert(user, 'id')
    return findById(id)
}

function findById(id){
    return db('users')
    .where({id})
    .first()
}

function findBy(filter){
    return db('users')
    .where(filter)
    .orderBy('id')
}