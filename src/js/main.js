/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sliders_landSlider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sliders/landSlider */ \"./sliders/landSlider.js\");\n/* harmony import */ var _sliders_verticalSlider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sliders/verticalSlider */ \"./sliders/verticalSlider.js\");\n\n\nwindow.addEventListener('load', function () {\n  var thumb = document.querySelector('.range__thumb');\n  var btndown = document.querySelector('.sliderV__sun-text');\n  Object(_sliders_verticalSlider__WEBPACK_IMPORTED_MODULE_1__[\"vSlider\"])(document.querySelectorAll('.sliderV__slide'), thumb, 300);\n  Object(_sliders_landSlider__WEBPACK_IMPORTED_MODULE_0__[\"landSlider\"])(thumb, 1500);\n  btndown.addEventListener('click', function () {\n    var event = new WheelEvent('wheel', {\n      deltaY: 100\n    });\n    window.dispatchEvent(event);\n  });\n});\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./sliders/landSlider.js":
/*!*******************************!*\
  !*** ./sliders/landSlider.js ***!
  \*******************************/
/*! exports provided: landSlider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"landSlider\", function() { return landSlider; });\n/* harmony import */ var _range__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./range */ \"./sliders/range.js\");\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\n\nfunction landSlider(thumb) {\n  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;\n  var scale = document.querySelector('.range');\n  var fillScale = scale.querySelector('.range__fill_scale');\n  var max = _toConsumableArray(document.querySelectorAll('.sliderH__slide')).length - 1;\n  var slideH = document.querySelector('.sliderH');\n  var borderScale = \"1px solid #98acc0\";\n  var range = {\n    maxX: scale.offsetWidth - thumb.offsetWidth / 2\n  };\n  var sectionLength = range.maxX / max;\n  var timerId = null;\n  var startLeft = 0;\n  var direction = 'left';\n  $(thumb).draggable({\n    start: function start(e, ui) {\n      startLeft = ui.position.left;\n    },\n    drag: function drag(e, ui) {\n      ui.position.top = -20;\n\n      if (ui.position.left < 0) {\n        ui.position.left = -6;\n      } else if (ui.position.left > range.maxX) {\n        ui.position.left = range.maxX;\n      }\n\n      if (ui.position.left > 0) {\n        fillScale.style.width = ui.position.left + 'px';\n        fillScale.style.border = borderScale;\n      }\n\n      direction = startLeft - ui.position.left > 0 ? 'left' : 'right';\n    },\n    stop: function stop(e, ui) {\n      var fault = ui.position.left - startLeft;\n      if (fault < 0) fault = -fault;\n      if (fault < 10) return;\n      var k = 0;\n\n      if (direction === 'left') {\n        k = Math.floor(ui.position.left / sectionLength);\n        if (k < 0) k = 0;\n        change('left', ui.position.left, k);\n        if (timerId) clearTimeout(timerId);\n        timerId = setTimeout(function () {\n          var left = ui.position.left;\n\n          if (left % sectionLength !== 0) {\n            var total = left % sectionLength;\n            var step = 1500 / total;\n\n            if (left < sectionLength && sectionLength % left < 20) {\n              if (left > 10) {\n                thumb.style.left = left + sectionLength % left + 'px';\n                fillScale.style.width = thumb.style.left;\n                return;\n              } else {\n                thumb.style.left = '-6px';\n                fillScale.style.width = 0;\n                return;\n              }\n            }\n\n            var start = Date.now();\n            var timer = setInterval(function () {\n              var timePassed = Date.now() - start;\n\n              if (timePassed >= 1500) {\n                clearInterval(timer);\n                return;\n              }\n\n              thumb.style.left = left - timePassed / step + 'px';\n\n              if (parseFloat(thumb.style.left) < 2) {\n                thumb.style.left = '-6px';\n              }\n\n              fillScale.style.width = thumb.style.left;\n            }, 10);\n          }\n        }, 1000);\n      } else {\n        k = Math.ceil(ui.position.left / sectionLength);\n        change('right', ui.position.left, k);\n        if (timerId) clearTimeout(timerId);\n        timerId = setTimeout(function () {\n          var left = parseFloat(thumb.style.left);\n\n          if (left % sectionLength !== 0) {\n            var total = sectionLength - left % sectionLength;\n            var step = 1500 / total;\n\n            if (left > sectionLength && left % sectionLength < 20) {\n              thumb.style.left = left - left % sectionLength + 'px';\n              fillScale.style.width = thumb.style.left;\n              return;\n            }\n\n            var start = Date.now();\n            var timer = setInterval(function () {\n              var timePassed = Date.now() - start;\n\n              if (timePassed >= 1500) {\n                clearInterval(timer);\n                return;\n              }\n\n              thumb.style.left = left + timePassed / step + 'px';\n              fillScale.style.width = thumb.style.left;\n            }, 10);\n          }\n        }, 1000);\n      }\n    }\n  });\n\n  function change(direction, left, k) {\n    var step = delay / 100;\n    var start = Date.now();\n    var timer = null;\n    if (timer) return;\n    timer = setInterval(function () {\n      var timePassed = Date.now() - start;\n\n      if (timePassed > delay + 20) {\n        return clearInterval(timer);\n      }\n\n      Object(_range__WEBPACK_IMPORTED_MODULE_0__[\"changeXSlide\"])(slideH, timePassed, k, direction, step, max);\n    }, 20);\n  }\n}\n\n//# sourceURL=webpack:///./sliders/landSlider.js?");

/***/ }),

/***/ "./sliders/range.js":
/*!**************************!*\
  !*** ./sliders/range.js ***!
  \**************************/
/*! exports provided: changeXSlide */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"changeXSlide\", function() { return changeXSlide; });\nfunction changeXSlide(slide, timePassed, k, direction, step, max) {\n  var temp = Math.ceil(timePassed / step);\n  var value = temp >= 100 ? 100 : temp;\n\n  if (direction === 'left') {\n    slide.style.transform = \"translateX(\".concat((max - k - 1) * 100 + value, \"%)\");\n  } else if (direction === 'right') {\n    slide.style.transform = \"translateX(\".concat((max - k + 1) * 100 - value, \"%)\");\n  }\n}\n\n//# sourceURL=webpack:///./sliders/range.js?");

/***/ }),

/***/ "./sliders/verticalSlider.js":
/*!***********************************!*\
  !*** ./sliders/verticalSlider.js ***!
  \***********************************/
/*! exports provided: vSlider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"vSlider\", function() { return vSlider; });\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\nfunction vSlider(slides, thumb) {\n  var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 300;\n  // vSlider: slides required numeration first parameter of function,double underscore,number\n  // like that : slide__1, slide__2\n  var nameActiveClass = 'sliderV__slide--active';\n  var nameActiveControl = 'sliderV__control--active';\n  var nameLeaveDownClass = 'sliderV__slide--leave_down';\n  var nameEnterDownClass = 'sliderV__slide--enter_down';\n  var nameEnterUpClass = 'sliderV__slide--enter_up';\n  var nameLeaveUpClass = 'sliderV__slide--leave_up';\n  var panel = document.querySelector('.sliderV__controls');\n  var controls = panel.querySelectorAll('.sliderV__control');\n  var currentSlide = 0;\n  slides.forEach(function (slide, index) {\n    if (slide.classList.contains(nameActiveClass)) {\n      currentSlide = index;\n    }\n  });\n  controls[currentSlide].classList.add(nameActiveControl);\n  var temp = null;\n  var timerId = null;\n  window.addEventListener('touchstart', defineDirection);\n  window.addEventListener('touchmove', changeYSlide.bind(slides));\n  window.addEventListener('wheel', changeYSlide.bind(slides));\n  panel.addEventListener('click', togglePanel);\n\n  function defineDirection(e) {\n    temp = e.touches[0].clientY;\n  }\n\n  function changeYSlide(e) {\n    var _this = this;\n\n    if (e.target === thumb) return;\n\n    if (timerId) {\n      clearTimeout(timerId);\n    }\n\n    timerId = setTimeout(function () {\n      if (!_this) return; // context it's array of slides\n\n      var arrSlides = _toConsumableArray(_this);\n\n      var maxL = arrSlides.length - 1;\n      var activeNum = 0;\n      var current = 0;\n      var i = 0;\n\n      while (i <= maxL) {\n        if (!!~_toConsumableArray(arrSlides[i].classList).indexOf(nameActiveClass)) {\n          activeNum = i;\n          break;\n        }\n\n        i++;\n      }\n\n      if (e.deltaY < 0 || e.touches && e.touches[0].clientY > temp) {\n        if (activeNum - 1 < 0) return;\n        current = activeNum - 1 === 0 ? 0 : activeNum - 1;\n        arrSlides[activeNum].classList.toggle(nameActiveClass);\n        arrSlides[activeNum].classList.toggle(nameLeaveUpClass);\n        arrSlides[current].classList.toggle(nameEnterUpClass);\n        setTimeout(function () {\n          arrSlides[activeNum].classList.toggle(nameLeaveUpClass);\n          arrSlides[current].classList.toggle(nameActiveClass);\n          arrSlides[current].classList.toggle(nameEnterUpClass);\n          controls[activeNum].classList.toggle(nameActiveControl);\n          controls[current].classList.toggle(nameActiveControl);\n        }, delay);\n      }\n\n      if (e.deltaY > 0 || e.touches && e.touches[0].clientY < temp) {\n        if (activeNum + 1 > maxL) return;\n        current = activeNum + 1 > maxL ? maxL : activeNum + 1;\n        arrSlides[activeNum].classList.toggle(nameActiveClass);\n        arrSlides[current].classList.toggle(nameEnterDownClass);\n        arrSlides[activeNum].classList.toggle(nameLeaveDownClass);\n        arrSlides[current].classList.toggle(nameActiveClass);\n        setTimeout(function () {\n          arrSlides[activeNum].classList.toggle(nameLeaveDownClass);\n          arrSlides[current].classList.toggle(nameEnterDownClass);\n          controls[activeNum].classList.toggle(nameActiveControl);\n          controls[current].classList.toggle(nameActiveControl);\n        }, delay);\n      }\n    }, 100);\n  }\n\n  function togglePanel(e) {\n    if (e.target === this) return;\n    var names = e.target.className;\n\n    if (~names.indexOf(nameActiveControl)) {\n      return;\n    }\n\n    var oldValue = panel.querySelector(\".\".concat(nameActiveControl)).className.replace(/\\D/g, '') - 1;\n    var value = names.replace(/\\D/g, '') - 1;\n    var delta = value - oldValue;\n    var count = delta < 0 ? -delta : delta;\n    var event = new WheelEvent('wheel', {\n      deltaY: value > oldValue ? 100 : -100\n    });\n\n    for (var i = 0; i < count; i++) {\n      if (i === 0) {\n        window.dispatchEvent(event);\n        continue;\n      }\n\n      setTimeout(function () {\n        window.dispatchEvent(event);\n      }, delay);\n    }\n  }\n}\n\n//# sourceURL=webpack:///./sliders/verticalSlider.js?");

/***/ })

/******/ });