'use strict';

const fs = require('fs');
const path = require('path');
const streamifier = require('streamifier');

module.exports = function(options, fileUploadOptions = null) {
  return {
    name: options.name,
    file: options.file,
    encoding: options.encoding,
    truncated: options.truncated,
    mimetype: options.mimetype,
  };
};
