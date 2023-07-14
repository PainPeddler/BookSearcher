const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

const secret = 'mysecretsshhhhh';
const expiration = '2h';

const authMiddleware = (context) => {
  // Get the authorization token from the context
  const token = context.req.headers.authorization;

  if (token) {
    try {
      // Verify the token and get the user data
      const { data } = jwt.verify(token, secret);
      // Add the user data to the context
      context.user = data;
    } catch (err) {
      throw new AuthenticationError('Invalid token');
    }
  } else {
    throw new AuthenticationError('You must be logged in');
  }
};

const signToken = ({ username, email, _id }) => {
  const payload = { username, email, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

module.exports = { authMiddleware, signToken };


