const errorHandler = (err, req, res, next) => {
  const errStatus = res.statusCode || 500;
  const errMsg = err.message || "something went wrong";
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
  });
  };
  
  module.exports = { errorHandler };
  