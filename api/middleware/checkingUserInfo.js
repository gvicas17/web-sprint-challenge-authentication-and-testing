const jwt = require('jsonwebtoken')
const {jwtSecret} = require('../../config/secretes')

function checkingNewUser(req, res, next){
    const {username, password} = req.body
    if(username && password){
       next()
    }else{
        res.status(400).json({message: 'username and password required'})
    }
}

// function validation(user){
//     return Boolean(user.username && user.password && typeof user.password === 'string')
// }

function generateToken(user) {
    const payload = {
      subject: user.id,
      username: user.username
    }
    const options = {
      expiresIn: 2000,
    }
  
    return jwt.sign(payload, jwtSecret, options)
  }


module.exports = {checkingNewUser, generateToken}