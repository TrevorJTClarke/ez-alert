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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scss_main_scss__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scss_main_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__scss_main_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ezAlert__ = __webpack_require__(2);
 // Import layout CSS


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_raw_loader_sass_loader_styles_scss__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_raw_loader_sass_loader_styles_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_raw_loader_sass_loader_styles_scss__);


/**
 * ez-alert
 *
 * An avatar web component with multiple styles && options.
 *
 * @markup
 * <ez-alert id="uniqueId"></ez-alert>
 *
 * @use
 * - Requires reference to DOM element: document.querySelector('ez-alert')
 * - Methods:
 *    - el.success(Object)
 *    - el.error(Object)
 *    - el.warn(Object)
 *    - el.info(Object)
 *
 * @options:
 * - title - Any String
 * - message - Any String
 * - duration - 5000 Default, in milliseconds
 * - scheme - info, warn, success, error
 * - actions - Array of Objects
 *    - type - String, default "close"
 *    - callback - Any Function
 *
 * Expected Data:
 * {
 * 	title: 'Error Somewhere',
 * 	message: 'This is just terrible!',
 * 	duration: 8000,
 * 	scheme: 'warn',
 * 	actions: [{
 * 	  type: 'next',
 * 	  callback: (e, args) => { console.log('test! args:',args) }
 * 	}]
 * }
 */
(function () {

  /**
   * Cloning contents from a <template> element is more performant
   */
  const template = document.createElement('template');
  template.innerHTML = `
    <style>${__WEBPACK_IMPORTED_MODULE_0_raw_loader_sass_loader_styles_scss___default.a}</style>
  `;

  function getContent(options) {
    let indicator = options.icon ? `
      <div class="indicator">
        <i class="icon">${options.icon}</i>
      </div>
    ` : ``;

    let content = options.title || options.message ? `
      <div class="content">
        ${options.title ? '<h3>' + options.title + '</h3>' : ''}
        ${options.message ? '<p>' + options.message + '</p>' : ''}
      </div>
    ` : ``;

    // TODO: Add actions
    // <div class="actions">
    //   <div class="action" onclick="action.callback()">
    //     <i class="icon">&times;</i>
    //   </div>
    // </div>

    return `
      ${indicator}
      ${content}
    `;
  }

  class EzAlert extends HTMLElement {

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      // helpful stuffs
      this.fire = this._fire.bind(this);
      this.reset = this._reset.bind(this);
      this._removeInstances = this._removeInstances.bind(this);
      this.setOptions = this._setOptions.bind(this);
      this.options = {};
      this.instances = [];

      // helpful methods
      this.success = this._success.bind(this);
      this.warn = this._warn.bind(this);
      this.error = this._error.bind(this);
      this.info = this._info.bind(this);

      return this;
    }

    connectedCallback() {
      if (!this.hasAttribute('role')) this.setAttribute('role', 'alert');
    }

    disconnectedCallback() {
      // Placeholder
    }

    _removeInstances() {
      const _this = this;
      if (this.instances && this.instances.length > 0) {
        this.instances.forEach((i, idx) => {
          i.style.opacity = 0;
          _this.instances.splice(idx, 1);
          setTimeout(() => {
            _this.shadowRoot.removeChild(i);
          }, 220);
        });
      }
    }

    _reset() {
      this._removeInstances();
    }

    _fire() {
      var _this = this;

      // first, cleanup old instances
      this._removeInstances();

      // Start new instance
      const id = `${+new Date()}`;
      let instContainer = document.createElement('div');
      let inst = getContent(_this.options);
      instContainer.id = id;
      instContainer.setAttribute(_this.options.type, true);
      instContainer.classList = 'instance';
      instContainer.innerHTML = inst;
      this.shadowRoot.appendChild(instContainer);
      let newInst = this.shadowRoot.getElementById(`${id}`);

      // Add for later cleanup
      _this.instances.push(newInst);

      setTimeout(() => {
        newInst.style.marginTop = '0px';
        newInst.style.opacity = 1;
      }, 20);
    }

    _setOptions(options = {}) {
      this.options = options;
    }

    _success(options = {}) {
      const _this = this;
      options = Object.assign(_this.options, options, { type: 'success' });
      this.setOptions(options);
      this.fire();
    }

    _error(options = {}) {
      const _this = this;
      options = Object.assign(_this.options, options, { type: 'error' });
      this.setOptions(options);
      this.fire();
    }

    _warn(options = {}) {
      const _this = this;
      options = Object.assign(_this.options, options, { type: 'warn' });
      this.setOptions(options);
      this.fire();
    }

    _info(options = {}) {
      const _this = this;
      options = Object.assign(_this.options, options, { type: 'info' });
      this.setOptions(options);
      this.fire();
    }
  }

  // Dont allow multiple definitions
  let exists = window.customElements.get('ez-alert');
  if (!exists) window.customElements.define('ez-alert', EzAlert);
})();

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = ":host {\n  position: fixed;\n  font-family: Helvetica, Arial, sans-serif;\n  right: 0;\n  top: 0;\n  width: 100%;\n  z-index: 999; }\n  :host[hidden] {\n    display: none; }\n\n.indicator {\n  background: rgba(34, 34, 34, 0.1);\n  display: flex;\n  margin: 0;\n  padding: 0 5px;\n  position: relative;\n  width: 36px; }\n  .indicator .icon {\n    color: #fff;\n    display: block;\n    font-size: 24pt;\n    font-style: normal;\n    margin: auto;\n    text-align: center;\n    width: 100%; }\n\n.content {\n  color: #222;\n  flex: 1 1 0;\n  padding: 7px 10px;\n  position: relative;\n  vertical-align: top;\n  width: calc(100% - 120px); }\n  .content h3 {\n    font-size: 12pt;\n    font-weight: 500;\n    line-height: 17pt;\n    letter-spacing: 0.01em;\n    margin: 0; }\n  .content p {\n    line-height: 12pt;\n    font-size: 10pt;\n    font-weight: 300;\n    margin: 0;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    width: 100%;\n    word-wrap: break-word; }\n\n.instance {\n  background: #e1e8ec;\n  box-shadow: 0 2px 10px -2px rgba(34, 34, 34, 0.3);\n  border-radius: 3px;\n  display: flex;\n  margin-top: -100px;\n  opacity: 0;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  right: 10px;\n  top: 10px;\n  transition: all 220ms ease-in-out 40ms;\n  width: 25%; }\n  .instance[success] {\n    background: #3eb56e; }\n    .instance[success] .content {\n      color: #fff; }\n  .instance[warn] {\n    background: #67a4bf; }\n    .instance[warn] .content {\n      color: #fff; }\n  .instance[error] {\n    background: #c74444; }\n    .instance[error] .content {\n      color: #fff; }\n  .instance[info] {\n    background: #e1e8ec; }\n"

/***/ })
/******/ ]);