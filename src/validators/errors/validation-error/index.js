class ValidationError extends Error {
  constructor(message, ...params) {
    super(message, ...params);

    // patch to avoid getting "new ValidationError instanceof ValidationError" = false
    // see the https://github.com/babel/babel/issues/4485
    // and you need to add to the .babelrc
    //      ["babel-plugin-transform-builtin-extend", {
    //       globals: ["Error", "Array"]
    //     }]
    this.constructor = ValidationError;
    // this.__proto__ = ValidationError.prototype;

    this.name = this.constructor.name;
    if (Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error(message)).stack;
    }
  }
}

module.exports = ValidationError;
