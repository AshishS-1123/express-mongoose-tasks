function notFound(req, res) {
  res.status(404).end("404 | Not Found");
}

module.exports = notFound;
