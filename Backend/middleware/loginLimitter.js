const rateLimit = require("express-rate-limit");

const rateLimitter = rateLimit({
  windowMs: 60 * 1000,
  limit: 5,
  message: {
    message:
      "Too many login attempts from this IP, please try again after a 60 second pause",
  },
  handler: (req, res, next, options) => {
    logEvents(
      `Too Many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
      "errLog.log"
    );
    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

module.exports = rateLimitter;
