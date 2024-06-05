const { logEvents } = require("./logger");

const errorHandler = (err, req, res, next) => {
  logEvents(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers}`,
    "errLog.log"
  );
  console.log(err?.stack);

  const status = err.status ? err.status : 500;

  res.status(status);
  res.json({
    message: err.message,
  });
};

module.exports = errorHandler;
