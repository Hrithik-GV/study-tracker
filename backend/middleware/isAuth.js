module.exports = (req, res, next) => {
  if (!req.session || !req.session.isLoggedIn) {
    return res.status(401).json({ error: "Unauthorized. Please log in first." });
  }
  next();
};
