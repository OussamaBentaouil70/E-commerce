function errorHandler(err, req, res, next) {
  /*if (err.name === "UnauthorizedError") {
    //jwt authentification error
    return res.status(400).json({ message: "The user is not authorized" });
  }
  if (err.name === "ValidationError") {
    //jwt validation error
    return res.status(401).json({ message: err });
  }*/

  //jwt server error
  return res.json(err);
}
module.exports = errorHandler;
