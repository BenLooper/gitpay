'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pure = require('recompose/pure');

var _pure2 = _interopRequireDefault(_pure);

var _SvgIcon = require('../../SvgIcon');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @ignore - internal component.
 */
var _ref = _react2.default.createElement('path', { d: 'M7 10l5 5 5-5z' });

var ArrowDropDown = function ArrowDropDown(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _ref
  );
};

ArrowDropDown = (0, _pure2.default)(ArrowDropDown);
ArrowDropDown.muiName = 'SvgIcon';

exports.default = ArrowDropDown;