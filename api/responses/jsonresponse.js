/**
 * jsonresponse.js
 *
 * A custom response.
 *
 * Example usage:
 * ```
 *     return res.jsonresponse();
 *     // -or-
 *     return res.jsonresponse(optionalData);
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       somethingHappened: {
 *         responseType: 'jsonresponse'
 *       }
 *     }
 * ```
 *
 * ```
 *     throw 'somethingHappened';
 *     // -or-
 *     throw { somethingHappened: optionalData }
 * ```
 */

module.exports = function jsonresponse(optionalData) {
  var res = this.res;

  // Define the status code to send in the response.
  var statusCodeToSet = 400;
  var responseData = {
    meta: {
      code: 200,
      count: 0,
      total: 0,
      type: typeof optionalData,
    },
    data: {},
  };

  // If no data was provided, use res.sendStatus().
  if (optionalData === undefined) {
    sails.log.info("Ran custom response: res.jsonresponse()");
    return res.sendStatus(statusCodeToSet);
  }
  // If error, send it as is.
  if (_.isError(optionalData)) {
    sails.log.info(
      "Custom response `res.jsonresponse()` called with an Error:",
      optionalData
    );
    if (!_.isFunction(optionalData.toJSON)) {
      if (process.env.NODE_ENV === "production") {
        return res.sendStatus(statusCodeToSet);
      }
      return res.status(statusCodeToSet).send(optionalData.stack);
    }
  }

  // Send array or scalar response.
  responseData.meta.count = 1;
  responseData.data = optionalData.items;
  if (_.isObject(optionalData)) {
    sails.log.debug(optionalData);
    let itemCount = optionalData.items.length;
    responseData.meta.type = itemCount === 0 ? "error" : "array";
    responseData.meta.code = itemCount === 0 ? 404 : 200;
    responseData.meta.count = itemCount;
    responseData.meta.total = optionalData.total;
  }

  return res.status(responseData.meta.code).send(responseData);
};
