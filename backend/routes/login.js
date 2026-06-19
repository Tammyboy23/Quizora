const signInWithEmailAndPassword = require('firebase/auth');
const express = require('express');
const router = express.Router();

router.post(('/'),async (req, res) => {
    const {email, password} = req.body;
  const user = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

  console.log(user.user);
});

module.exports = router;