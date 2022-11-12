const express = require('express')

const { signIn, logIn} = require('../controllers/authHandle')

const router = express.Router()


router.post('/signin',signIn)

router.post('/login',logIn)


module.exports = router