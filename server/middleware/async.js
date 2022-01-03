const CustomError = require("../utils/customError");

function asyncWrapper(callback) {
  return async (req, res, next) => {
    try {
      await callback(req, res, next);
    } catch (error) {
      next(new CustomError(500, "Operation Failed"));
    }
  }
}

module.exports = asyncWrapper;
