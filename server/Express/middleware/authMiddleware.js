const authMiddleware = (req, res, next) => {
  // Logic to check token / credentials;
  const isAuthorized = false;
  if (!isAuthorized) res.status(401).send("Unauthorized access.");
  next();
};

module.exports = {
  authMiddleware,
};
