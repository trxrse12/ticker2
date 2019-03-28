function retrieveMoversHandler(req, res, db, retrieve, ValidationError) {
  retrieve(req, db)
    .then((result) => {
      console.log(result)
      res.status(200);
      res.set('Content-Type', 'application/json');
      res.json(result);
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        res.status(400);
        res.set('Content-Type', 'application/json');
        res.json({ message: err.message });
      }
      return undefined;
    })
    .catch(() => {
      res.status(500);
      res.set('Content-Type', 'application/json');
      res.json({ message: 'Internal Server Error'});
    });
}

module.exports = retrieveMoversHandler;
