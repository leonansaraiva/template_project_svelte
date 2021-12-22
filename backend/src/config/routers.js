const user = require('../api/user')
const express = require('express')
const router = express.Router()
const auth = require('../api/auth')
const passport = require('../config/passport')
const admin = require('../config/admin')


router.route('/')
  .get((req, res) => {
    console.log("GET")
    const msg = `Server is running`
    res.status(200).send(msg);
})


router.route('/signup')
  .post(user.save)

router.route('/signin')
  .post(auth.signin)

router.route('/validateToken')
  .post(auth.validateToken)

router.route('/users')
  .all(passport.authenticate())
  .get(user.get)
  .post(user.save);

router.route('/users/:id')
  .all(passport.authenticate())
  .get(admin(user.getById))
  .put(user.save)
  .delete(admin(user.remove))



module.exports = router;