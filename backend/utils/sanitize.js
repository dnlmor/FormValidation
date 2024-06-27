const he = require('he');
const querystring = require('querystring');

exports.htmlEntityEncode = (input) => {
    return he.encode(input);
};

exports.jsStringEscape = (input) => {
    return input.replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
};

exports.urlEncode = (input) => {
    return querystring.escape(input);
};
