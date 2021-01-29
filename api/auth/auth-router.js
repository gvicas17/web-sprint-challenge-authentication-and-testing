const router = require('express').Router();
const Auth = require('./auth-model')
const bcrypt = require('bcrypt')
const {checkingNewUser, generateToken} = require('../middleware/checkingUserInfo')


router.post('/register', checkingNewUser, (req, res) => {
  const {username, password} = req.body
  const hash = bcrypt.hashSync(password, 10)

  Auth.add({username, password: hash})
  .then(user => {
    if(user){
    res.status(201).json(user)
    }else{
      res.end('implement register, please!')
    }
    })
  .catch(() => {
    res.status(500).json({message: 'username taken'})
  })
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to register a new account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel", // must not exist already in the `users` table
        "password": "foobar"          // needs to be hashed before it's saved
      }

    2- On SUCCESSFUL registration,
      the response body should have `id`, `username` and `password`:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }

    3- On FAILED registration due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED registration due to the `username` being taken,
      the response body should include a string exactly as follows: "username taken".
  */
});

router.post('/login', checkingNewUser, async (req, res) => {

  const {username, password} = req.body
  
  try{
    const userInfo = await Auth.findBy({username}).first()
    if(userInfo && bcrypt.compareSync(password, userInfo.password)){
      const token = generateToken(userInfo)
      res.status(200).json({message: 'welcome back!', token})
    }else{
      res.status(401).json('invalid credientals')
    }
  }catch(err){
    res.status(500).json(err.messsage)
  }
  
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
});

module.exports = router;
