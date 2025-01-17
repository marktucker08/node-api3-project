const express = require('express');
const { validateUserId, validateUser, validatePost } = require('../middleware/middleware');
const Post = require('../posts/posts-model')
const User = require('../users/users-model')

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  User.get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json({ message: "something bad happened" })
    })
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.json(req.user);
});

router.post('/', validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  User.insert(req.body)
  .then(newUser => {
    res.status(201).json(newUser)
  })
  .catch(err => {
    res.status(500).json({ message: "something bad happened" })
  })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  User.update(req.params.id, req.body)
  .then(updated => {
    res.status(200).json(updated)
  })
  .catch(err => {
    res.status(500).json({ message: "something bad happened" })
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  User.remove(req.params.id)
  .then(deleted => {
    res.status(200).json(req.user)
  })
  .catch(err => {
    res.status(500).json({ message: "something bad happened" })
  })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  User.getUserPosts(req.params.id)
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(err => {
    res.status(500).json({ message: "something bad happened" })
  })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Post.insert({ user_id: req.params.id, text: req.text })
  .then(post => {
    res.status(201).json(post)
  })
  .catch(err => {
    res.status(500).json({ message: "something bad happened" })
  })
});

// do not forget to export the router
module.exports = router;