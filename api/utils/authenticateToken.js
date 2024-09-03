const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const accessToken = req.header["Authorization"].split(" ")[1];
  if (!accessToken) return res.sendStatus(401);
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(401);
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
