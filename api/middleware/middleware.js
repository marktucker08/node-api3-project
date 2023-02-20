const Post = require('../posts/posts-model')
const User = require('../users/users-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(`
    request method: ${req.method}
    request url: ${req.url}
    timestamp: [${new Date().toISOString()}]`);
  next();
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  try {
    const user = await User.getById(req.params.id)
    if (user) {
      req.user = user;
      next();
    } else {
        res.status(404).json({ message: "user not found" })
    }
  }
  catch(err) {
    res.status(500).json({ message: "something bad happened" })
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const { name } = req.body
  if ( name !== undefined && typeof name === 'string' && name.length && name.trim().length > 0 ) {
    next()
  } else {
    res.status(400).json({ message: "missing required name field" })
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
}