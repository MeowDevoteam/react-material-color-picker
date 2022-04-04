'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Done = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Done = exports.Done = function Done(_ref) {
    var color = _ref.color;
    return _react2.default.createElement(
        'svg',
        {
            xmlns: 'http://www.w3.org/2000/svg',
            width: '24',
            height: '24',
            viewBox: '0 0 24 24',
            style: { width: '100%', height: '100%' }
        },
        _react2.default.createElement('path', { fill: 'none', d: 'M0 0h24v24H0z' }),
        _react2.default.createElement('path', { fill: color, d: 'M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z' })
    );
};

Done.propTypes = {
    color: _propTypes2.default.string.isRequired
};