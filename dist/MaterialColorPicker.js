'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _doneBlack = require('./done-black');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _colors = require('./colors');

var propTypes = {
    initColor: _propTypes2.default.string,
    onSubmit: _propTypes2.default.func,
    onSelect: _propTypes2.default.func,
    onHover: _propTypes2.default.func,
    onReset: _propTypes2.default.func,
    style: _propTypes2.default.object,
    submitLabel: _propTypes2.default.string,
    resetLabel: _propTypes2.default.string
};

var defaultProps = {
    initColor: '#40c4ff',
    onSubmit: function onSubmit() {},
    onSelect: function onSelect() {},
    onHover: function onHover() {},
    onReset: function onReset() {},
    submitLabel: 'Submit',
    resetLabel: 'Reset'
};

var MaterialColorPicker = function (_React$Component) {
    (0, _inherits3.default)(MaterialColorPicker, _React$Component);

    function MaterialColorPicker(props) {
        (0, _classCallCheck3.default)(this, MaterialColorPicker);

        var _this = (0, _possibleConstructorReturn3.default)(this, (MaterialColorPicker.__proto__ || (0, _getPrototypeOf2.default)(MaterialColorPicker)).call(this, props));

        _this.colorNames = _this.colorNameList(_colors);
        _this.toneNames = (0, _keys2.default)(_this.colorNames);
        _this.rootDivRef = null;
        _this.hoveredColor = '';

        _this.toneColorByName = _this.toneColorByName.bind(_this);
        _this.satColorByName = _this.satColorByName.bind(_this);
        _this.resetColor = _this.resetColor.bind(_this);
        _this.resetHover = _this.resetHover.bind(_this);
        _this.submitHover = _this.submitHover.bind(_this);
        _this.makeToneSwatches = _this.makeToneSwatches.bind(_this);
        _this.makeGradeSwatches = _this.makeGradeSwatches.bind(_this);

        _this.initState = _this.resetColor();
        _this.state = (0, _extends3.default)({}, _this.initState, {
            hoveredTone: '',
            hoveredSat: '',
            hoveredSubmit: false
        });

        _this.selectTone = _this.selectTone.bind(_this);
        _this.selectSat = _this.selectSat.bind(_this);
        _this.hoverTone = _this.hoverTone.bind(_this);
        _this.hoverSat = _this.hoverSat.bind(_this);
        _this.hoverReset = _this.hoverReset.bind(_this);

        _this.titleName = _this.titleName.bind(_this);
        _this.fullNameString = _this.fullNameString.bind(_this);
        _this.createEvent = _this.createEvent.bind(_this);

        _this.onSubmit = _this.onSubmit.bind(_this);
        _this.onReset = _this.onReset.bind(_this);
        _this.onHover = _this.onHover.bind(_this);

        _this.rootDiv = _this.rootDiv.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(MaterialColorPicker, [{
        key: 'onSubmit',
        value: function onSubmit() {
            var _this2 = this;

            return function (e) {
                var event = {
                    type: 'submit',
                    timeStamp: e.nativeEvent.timeStamp,
                    eventPhase: 3,
                    target: (0, _extends3.default)({
                        value: _colors[_this2.fullNameString()],
                        nativeEvent: e.nativeEvent,
                        name: 'MaterialColorPicker',
                        node: _this2.rootDivRef
                    }, _this2.props),
                    persist: function persist() {
                        e.persist();
                    }
                };
                _this2.props.onSubmit(event);
            };
        }
    }, {
        key: 'onReset',
        value: function onReset() {
            var _this3 = this;

            return function (e) {
                var timeStamp = e.nativeEvent.timeStamp;
                var nativeEvent = e.nativeEvent;
                _this3.setState(_this3.initState, function () {
                    var event = {
                        type: 'reset',
                        timeStamp: timeStamp,
                        eventPhase: 3,
                        target: (0, _extends3.default)({
                            value: _colors[_this3.fullNameString()],
                            nativeEvent: nativeEvent,
                            name: 'MaterialColorPicker',
                            node: _this3.rootDivRef
                        }, _this3.props),
                        persist: function persist() {
                            e.persist();
                        }
                    };
                    _this3.props.onReset(event);
                });
            };
        }
    }, {
        key: 'onHover',
        value: function onHover(event) {
            if (event.target.value !== this.hoveredColor) {
                this.hoveredColor = event.target.value;
                this.props.onHover(event);
            }
        }
    }, {
        key: 'findColorName',
        value: function findColorName(colObj, colString) {
            var nameList = (0, _keys2.default)(colObj);
            var name = nameList.find(function (val) {
                return colObj[val] === colString;
            });
            return name;
        }
    }, {
        key: 'resetColor',
        value: function resetColor() {
            var initName = this.findColorName(_colors, this.props.initColor) || '';
            var initTone = this.toneColorByName(initName);
            var initSat = this.satColorByName(initName);
            var state = {
                selectedTone: initTone || this.toneNames[0],
                selectedSat: initSat || '500'
            };
            return state;
        }
    }, {
        key: 'resetHover',
        value: function resetHover() {
            var initColor = this.resetColor();
            this.setState({
                hoveredTone: initColor.selectedTone,
                hoveredSat: initColor.selectedSat
            });
        }
    }, {
        key: 'submitHover',
        value: function submitHover(flag) {
            var _this4 = this;

            return function () {
                _this4.setState({ hoveredSubmit: flag });
            };
        }
    }, {
        key: 'colorNameList',
        value: function colorNameList(colObj) {
            var nameList = (0, _keys2.default)(colObj);
            var toneList = {
                red: nameList.filter(function (val) {
                    return (/^red/.test(val)
                    );
                }),
                pink: nameList.filter(function (val) {
                    return (/^pink/.test(val)
                    );
                }),
                purple: nameList.filter(function (val) {
                    return (/^purple/.test(val)
                    );
                }),
                deepPurple: nameList.filter(function (val) {
                    return (/^deepPurple/.test(val)
                    );
                }),
                indigo: nameList.filter(function (val) {
                    return (/^indigo/.test(val)
                    );
                }),
                blue: nameList.filter(function (val) {
                    return (/^blue[A1-9]/.test(val)
                    );
                }),
                lightBlue: nameList.filter(function (val) {
                    return (/^lightBlue/.test(val)
                    );
                }),
                cyan: nameList.filter(function (val) {
                    return (/^cyan/.test(val)
                    );
                }),
                teal: nameList.filter(function (val) {
                    return (/^teal/.test(val)
                    );
                }),
                green: nameList.filter(function (val) {
                    return (/^green/.test(val)
                    );
                }),
                lightGreen: nameList.filter(function (val) {
                    return (/^lightGreen/.test(val)
                    );
                }),
                lime: nameList.filter(function (val) {
                    return (/^lime/.test(val)
                    );
                }),
                yellow: nameList.filter(function (val) {
                    return (/^yellow/.test(val)
                    );
                }),
                amber: nameList.filter(function (val) {
                    return (/^amber/.test(val)
                    );
                }),
                orange: nameList.filter(function (val) {
                    return (/^orange/.test(val)
                    );
                }),
                deepOrange: nameList.filter(function (val) {
                    return (/^deepOrange/.test(val)
                    );
                }),
                brown: nameList.filter(function (val) {
                    return (/^brown/.test(val)
                    );
                }),
                blueGrey: nameList.filter(function (val) {
                    return (/^blueGrey/.test(val)
                    );
                }),
                grey: nameList.filter(function (val) {
                    return (/^grey/.test(val)
                    );
                }),
                black: nameList.filter(function (val) {
                    return (/black|white|Black|White/.test(val)
                    );
                })
            };

            return toneList;
        }
    }, {
        key: 'makeToneSwatches',
        value: function makeToneSwatches(toneNames) {
            var _this5 = this;

            return toneNames.map(function (val) {
                var toneBaseName = _this5.baseToneByName(val);
                var baseColor = _colors[toneBaseName];
                return _react2.default.createElement('div', {
                    key: toneBaseName,
                    title: val,
                    onClick: _this5.selectTone(val),
                    onMouseOver: _this5.hoverTone(val),
                    onMouseOut: _this5.hoverReset(),
                    style: (0, _extends3.default)({
                        backgroundColor: baseColor,
                        flexGrow: 1,
                        height: 18,
                        cursor: 'pointer'
                    }, _this5.borderSelTone(val, _this5.state.selectedTone, _this5.state.hoveredTone))
                });
            });
        }
    }, {
        key: 'makeGradeSwatches',
        value: function makeGradeSwatches(toneName) {
            var _this6 = this;

            var gradeNameList = this.colorNames[toneName];
            var gradeSwatches = gradeNameList.map(function (val) {
                return _react2.default.createElement(
                    'div',
                    {
                        key: val,
                        style: (0, _extends3.default)({
                            backgroundColor: _colors[val],
                            flexGrow: 1,
                            width: '100%',
                            cursor: 'pointer'
                        }, _this6.borderSelGrade(_this6.satColorByName(val), _this6.state.selectedSat, _this6.state.hoveredSat)),
                        onClick: _this6.selectSat(_this6.satColorByName(val)),
                        onMouseEnter: _this6.hoverSat(_this6.satColorByName(val)),
                        onMouseLeave: _this6.hoverReset()
                    },
                    _react2.default.createElement(
                        'div',
                        { style: { display: 'flex', alignItems: 'center', height: '100%' } },
                        _react2.default.createElement(
                            'div',
                            {
                                style: {
                                    width: 2,
                                    height: 2,
                                    top: 20,
                                    position: 'relative',
                                    margin: 'auto',
                                    transform: 'rotate(-90deg)'
                                }
                            },
                            _react2.default.createElement(
                                'div',
                                {
                                    style: {
                                        textAlign: 'center',
                                        display: 'inline-block',
                                        left: '-50%',
                                        top: -6,
                                        position: 'relative',
                                        color: _this6.bwColorByName(val)
                                    }
                                },
                                _this6.blackShortName(_this6.satColorByName(val))
                            )
                        )
                    )
                );
            });
            return gradeSwatches;
        }
    }, {
        key: 'borderSelTone',
        value: function borderSelTone(val, selName, hovName) {
            if (val === selName) {
                return {
                    borderTop: '2px #ffffff solid',
                    borderBottom: '2px #383838 solid'
                };
            }
            if (val === hovName) {
                return {
                    borderTop: '2px rgba(255, 255, 255, 0.46) solid',
                    borderBottom: '2px rgba(56, 56, 56, 0.44) solid'
                };
            }
            return {
                borderTop: '2px rgba(209, 209, 209, 0) solid',
                borderBottom: '2px rgba(56, 56, 56, 0) solid'
            };
        }
    }, {
        key: 'borderSelGrade',
        value: function borderSelGrade(val, selName, hovName) {
            if (val === selName) {
                return {
                    borderTop: '3px #d1d1d1 solid',
                    borderBottom: '3px #383838 solid'
                };
            }
            if (val === hovName) {
                return {
                    borderTop: '3px rgba(255, 255, 255, 0.61) solid',
                    borderBottom: '3px rgba(56, 56, 56, 0.5) solid'
                };
            }
            return {};
        }
    }, {
        key: 'selectTone',
        value: function selectTone(toneName) {
            var _this7 = this;

            return function (e) {
                var event = _this7.createEvent(e, 'select');
                _this7.setState({ selectedTone: toneName }, _this7.props.onSelect(event));
            };
        }
    }, {
        key: 'selectSat',
        value: function selectSat(satName) {
            var _this8 = this;

            return function (e) {
                var event = _this8.createEvent(e, 'select');
                _this8.setState({ selectedSat: satName }, _this8.props.onSelect(event));
            };
        }
    }, {
        key: 'hoverTone',
        value: function hoverTone(toneName) {
            var _this9 = this;

            return function (e) {
                var nativeEvent = e.nativeEvent,
                    persist = e.persist;

                _this9.setState({ hoveredTone: toneName }, function () {
                    var event = _this9.createEvent({ nativeEvent: nativeEvent, persist: persist }, 'hover');
                    _this9.onHover(event);
                });
            };
        }
    }, {
        key: 'hoverSat',
        value: function hoverSat(satName) {
            var _this10 = this;

            return function (e) {
                var nativeEvent = e.nativeEvent,
                    persist = e.persist;

                _this10.setState({ hoveredSat: satName }, function () {
                    var event = _this10.createEvent({ nativeEvent: nativeEvent, persist: persist }, 'hover');
                    _this10.onHover(event);
                });
            };
        }
    }, {
        key: 'hoverReset',
        value: function hoverReset() {
            var _this11 = this;

            return function (e) {
                var nativeEvent = e.nativeEvent,
                    persist = e.persist;

                _this11.setState({ hoveredTone: '', hoveredSat: '' }, function () {
                    var event = _this11.createEvent({ nativeEvent: nativeEvent, persist: persist }, 'hover');
                    _this11.onHover(event);
                });
            };
        }
    }, {
        key: 'baseToneByName',
        value: function baseToneByName(toneName) {
            var toneBaseName = toneName + '500';
            if (toneName === 'black') {
                toneBaseName = 'lightBlack';
            }
            return toneBaseName;
        }
    }, {
        key: 'toneColorByName',
        value: function toneColorByName(colorName) {
            var satName = this.satColorByName(colorName);
            var toneName = /black|white|Black|White/.test(satName) ? 'black' : colorName.replace(satName, '');
            return toneName;
        }
    }, {
        key: 'satColorByName',
        value: function satColorByName(colorName) {
            var satName = colorName.replace(/\D*/, '');
            if (/A\d/.test(colorName)) {
                satName = 'A' + satName;
            }
            return satName || colorName;
        }
    }, {
        key: 'blackShortName',
        value: function blackShortName(satName) {
            var newName = satName;
            if (/Black/.test(newName)) {
                newName = newName.replace(/Black/, '.B');
            }
            if (/White/.test(newName)) {
                newName = newName.replace(/White/, '.W');
            }
            return newName;
        }
    }, {
        key: 'numColorByName',
        value: function numColorByName(colorName) {
            var satName = colorName.replace(/\D*/, '');
            return satName || colorName;
        }
    }, {
        key: 'bwColorByName',
        value: function bwColorByName(colorName) {
            var contrColor = parseInt(this.numColorByName(colorName), 10);
            if (contrColor) {
                return contrColor <= 200 ? 'black' : 'white';
            }
            if (/black|Black/.test(colorName)) {
                return 'white';
            }
            return 'black';
        }
    }, {
        key: 'fullNameString',
        value: function fullNameString() {
            var toneString = this.state.hoveredTone || this.state.selectedTone;
            var satString = this.state.hoveredSat || this.state.selectedSat;
            if (toneString === 'black') {
                toneString = '';
            }
            return '' + toneString + satString;
        }
    }, {
        key: 'titleName',
        value: function titleName(isBlack) {
            var baseColor = isBlack ? 'black' : 'white';
            var greyColor = isBlack ? '#505050' : '#c1c1c1';
            var toneString = this.state.hoveredTone || this.state.selectedTone;
            var satString = this.state.hoveredSat || this.state.selectedSat;
            if (toneString === 'black') {
                toneString = '';
            }
            var isHovTone = !(this.state.hoveredTone === this.state.selectedTone) && this.state.hoveredTone;
            var isHovSat = !(this.state.hoveredSat === this.state.selectedSat) && this.state.hoveredSat;
            var toneColor = isHovTone ? greyColor : baseColor;
            var satColor = isHovSat ? greyColor : baseColor;
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'span',
                    { style: { color: toneColor, fontWeight: isHovTone ? '' : 'bold' } },
                    toneString
                ),
                _react2.default.createElement(
                    'span',
                    { style: { color: satColor, fontWeight: isHovSat ? '' : 'bold' } },
                    satString
                )
            );
        }
    }, {
        key: 'createEvent',
        value: function createEvent(e, type) {
            var event = {
                type: type,
                timeStamp: e.nativeEvent.timeStamp,
                eventPhase: 3,
                target: (0, _extends3.default)({
                    value: _colors[this.fullNameString()],
                    nativeEvent: e.nativeEvent,
                    name: 'MaterialColorPicker',
                    node: this.rootDivRef
                }, this.props),
                persist: function persist() {
                    e.persist();
                }
            };
            return event;
        }
    }, {
        key: 'rootDiv',
        value: function rootDiv(div) {
            this.rootDivRef = div;
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                {
                    className: 'material-color-picker',
                    style: (0, _extends3.default)({
                        fontFamily: 'sans-serif',
                        fontSize: 12
                    }, this.props.style, {
                        padding: 5
                    }),
                    ref: this.rootDiv
                },
                _react2.default.createElement(
                    'div',
                    {
                        className: 'material-color-picker-tone-swatches',
                        style: {
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }
                    },
                    this.makeToneSwatches(this.toneNames)
                ),
                _react2.default.createElement(
                    'div',
                    {
                        className: 'material-color-picker-title',
                        style: {
                            marginTop: 5,
                            padding: 5,
                            paddingLeft: 25,
                            paddingRight: 25,
                            backgroundColor: _colors[this.baseToneByName(this.state.selectedTone)],
                            display: 'flex',
                            justifyContent: 'space-between'
                        }
                    },
                    this.titleName(false),
                    this.titleName(true)
                ),
                _react2.default.createElement(
                    'div',
                    {
                        style: {
                            marginTop: 5,
                            display: 'flex'
                        }
                    },
                    _react2.default.createElement(
                        'div',
                        {
                            className: 'material-color-picker-preview',
                            style: {
                                height: 64,
                                width: 64,
                                backgroundColor: _colors[this.fullNameString()]
                            }
                        },
                        this.state.hoveredSubmit ? _react2.default.createElement(_doneBlack.Done, { color: this.bwColorByName(this.fullNameString()) }) : null
                    ),
                    _react2.default.createElement(
                        'div',
                        {
                            className: 'material-color-picker-sat-swatches',
                            style: {
                                flexGrow: 1,
                                width: 278,
                                marginLeft: 5,
                                display: 'flex'
                            }
                        },
                        this.makeGradeSwatches(this.state.selectedTone)
                    )
                ),
                _react2.default.createElement(
                    'div',
                    {
                        style: {
                            marginTop: 5,
                            padding: 5,
                            paddingLeft: 16,
                            paddingRight: 16,
                            border: '1px solid red',
                            borderColor: _colors[this.baseToneByName(this.state.selectedTone)],
                            display: 'flex',
                            justifyContent: 'space-between',
                            backgroundColor: '#f2f2f2',
                            color: '#404040'
                        }
                    },
                    _react2.default.createElement(
                        'div',
                        {
                            style: {
                                width: 'auto'
                            }
                        },
                        _react2.default.createElement(
                            'b',
                            null,
                            _react2.default.createElement(
                                'nobr',
                                null,
                                _colors[this.fullNameString()]
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        {
                            style: {
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'flex-end',
                                fontSize: 'larger'
                            }
                        },
                        _react2.default.createElement(
                            'div',
                            {
                                className: 'material-color-picker-reset',
                                title: 'reset to ' + this.props.initColor,
                                style: {
                                    cursor: 'pointer',
                                    paddingLeft: 16
                                },
                                onClick: this.onReset(),
                                onMouseOver: this.resetHover,
                                onMouseOut: this.hoverReset()
                            },
                            this.props.resetLabel
                        ),
                        _react2.default.createElement(
                            'div',
                            {
                                className: 'material-color-picker-submit',
                                title: 'submit ' + this.fullNameString() + ' color',
                                style: {
                                    cursor: 'pointer',
                                    paddingLeft: 16
                                },
                                onClick: this.onSubmit(),
                                onMouseOver: this.submitHover(true),
                                onMouseOut: this.submitHover(false)
                            },
                            this.props.submitLabel
                        )
                    )
                )
            );
        }
    }]);
    return MaterialColorPicker;
}(_react2.default.Component);

exports.default = MaterialColorPicker;


MaterialColorPicker.propTypes = propTypes;
MaterialColorPicker.defaultProps = defaultProps;
MaterialColorPicker.displayName = 'MaterialColorPicker';