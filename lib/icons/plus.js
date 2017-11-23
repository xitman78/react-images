"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var PlusIcon = function PlusIcon(props) {
	return _react2["default"].createElement(
		"svg",
		{
			style: props.style,
			onClick: function (e) {
				props.onClick(e);
			},
			version: "1.1",
			xmlns: "http://www.w3.org/2000/svg",
			xmlnsXlink: "http://www.w3.org/1999/xlink", x: "0px", y: "0px", width: "100%", height: "100%", viewBox: "0 0 22 22", xmlSpace: "preserve" },
		_react2["default"].createElement(
			"title",
			null,
			props.title
		),
		_react2["default"].createElement(
			"g",
			null,
			_react2["default"].createElement("line", { strokeLinecap: "square", y2: "10", x2: "3", y1: "10", x1: "20", strokeWidth: "4", stroke: props.color, fill: "none" }),
			_react2["default"].createElement("line", { strokeLinecap: "square", y2: "0", x2: "11.5", y1: "18", x1: "11.5", strokeWidth: "4", stroke: props.color, fill: "none" })
		)
	);
};

PlusIcon.propTypes = {
	color: _react.PropTypes.string.isRequired,
	onClick: _react.PropTypes.func.isRequired,
	style: _react.PropTypes.object.isRequired,
	title: _react.PropTypes.string.isRequired
};

exports["default"] = PlusIcon;
module.exports = exports["default"];