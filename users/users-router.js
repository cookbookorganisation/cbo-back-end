const router = require('express').Router();

const Users = require('./users-model.js')

// CRUDs Here! Start with /api/users

router.get('/', async (req, res) => {
    await Users.find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(error => {
        res.status(500).json({ message: "failed to pull users from server", error: error.message})
    })
})

module.exports = router;