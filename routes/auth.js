const express = require('express');
const router = express.Router();
// const auth  = require('../controllers/auth')
const { createuser, getusers, loginUser,resetPassword } = require('../controllers/auth')

router.put('/submit', resetPassword );
router.post('/submit', createuser );
router.get('/gget', getusers );
router.post('/login', loginUser);
// router.get('/getusers', getusers);
// router.get('/getusers/:id', getuserbyid);

module.exports = router;