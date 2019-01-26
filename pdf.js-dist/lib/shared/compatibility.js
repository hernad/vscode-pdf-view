/**
 * @licstart The following is the entire license notice for the
 * Javascript code in this page
 *
 * Copyright 2018 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @licend The above is the entire license notice for the
 * Javascript code in this page
 */
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var globalScope = require('./global_scope');

if (!globalScope._pdfjsCompatibilityChecked) {
  globalScope._pdfjsCompatibilityChecked = true;

  var isNodeJS = require('./is_node');

  var hasDOM = (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && (typeof document === "undefined" ? "undefined" : _typeof(document)) === 'object';

  (function checkNodeBtoa() {
    if (globalScope.btoa || !isNodeJS()) {
      return;
    }

    globalScope.btoa = function (chars) {
      return Buffer.from(chars, 'binary').toString('base64');
    };
  })();

  (function checkNodeAtob() {
    if (globalScope.atob || !isNodeJS()) {
      return;
    }

    globalScope.atob = function (input) {
      return Buffer.from(input, 'base64').toString('binary');
    };
  })();

  (function checkCurrentScript() {
    if (!hasDOM) {
      return;
    }

    if ('currentScript' in document) {
      return;
    }

    Object.defineProperty(document, 'currentScript', {
      get: function get() {
        var scripts = document.getElementsByTagName('script');
        return scripts[scripts.length - 1];
      },
      enumerable: true,
      configurable: true
    });
  })();

  (function checkChildNodeRemove() {
    if (!hasDOM) {
      return;
    }

    if (typeof Element.prototype.remove !== 'undefined') {
      return;
    }

    Element.prototype.remove = function () {
      if (this.parentNode) {
        this.parentNode.removeChild(this);
      }
    };
  })();

  (function checkDOMTokenListToggle() {
    if (!hasDOM || isNodeJS()) {
      return;
    }

    var div = document.createElement('div');

    if (div.classList.toggle('test', 0) === false) {
      return;
    }

    DOMTokenList.prototype.toggle = function (token) {
      if (arguments.length > 1) {
        var force = !!arguments[1];
        return this[force ? 'add' : 'remove'](token), force;
      }

      if (this.contains(token)) {
        return this.remove(token), false;
      }

      return this.add(token), true;
    };
  })();

  (function checkStringStartsWith() {
    if (String.prototype.startsWith) {
      return;
    }

    require('core-js/fn/string/starts-with');
  })();

  (function checkStringEndsWith() {
    if (String.prototype.endsWith) {
      return;
    }

    require('core-js/fn/string/ends-with');
  })();

  (function checkStringIncludes() {
    if (String.prototype.includes) {
      return;
    }

    require('core-js/fn/string/includes');
  })();

  (function checkArrayIncludes() {
    if (Array.prototype.includes) {
      return;
    }

    require('core-js/fn/array/includes');
  })();

  (function checkArrayFrom() {
    if (Array.from) {
      return;
    }

    require('core-js/fn/array/from');
  })();

  (function checkObjectAssign() {
    if (Object.assign) {
      return;
    }

    require('core-js/fn/object/assign');
  })();

  (function checkMathLog2() {
    if (Math.log2) {
      return;
    }

    Math.log2 = require('core-js/fn/math/log2');
  })();

  (function checkNumberIsNaN() {
    if (Number.isNaN) {
      return;
    }

    Number.isNaN = require('core-js/fn/number/is-nan');
  })();

  (function checkNumberIsInteger() {
    if (Number.isInteger) {
      return;
    }

    Number.isInteger = require('core-js/fn/number/is-integer');
  })();

  (function checkPromise() {
    if (globalScope.Promise) {
      return;
    }

    globalScope.Promise = require('core-js/fn/promise');
  })();

  (function checkWeakMap() {
    if (globalScope.WeakMap) {
      return;
    }

    globalScope.WeakMap = require('core-js/fn/weak-map');
  })();

  (function checkWeakSet() {
    if (globalScope.WeakSet) {
      return;
    }

    globalScope.WeakSet = require('core-js/fn/weak-set');
  })();

  (function checkStringCodePointAt() {
    if (String.codePointAt) {
      return;
    }

    String.codePointAt = require('core-js/fn/string/code-point-at');
  })();

  (function checkStringFromCodePoint() {
    if (String.fromCodePoint) {
      return;
    }

    String.fromCodePoint = require('core-js/fn/string/from-code-point');
  })();

  (function checkSymbol() {
    if (globalScope.Symbol) {
      return;
    }

    require('core-js/es6/symbol');
  })();

  (function checkStringPadStart() {
    if (String.prototype.padStart) {
      return;
    }

    require('core-js/fn/string/pad-start');
  })();

  (function checkStringPadEnd() {
    if (String.prototype.padEnd) {
      return;
    }

    require('core-js/fn/string/pad-end');
  })();

  (function checkObjectValues() {
    if (Object.values) {
      return;
    }

    Object.values = require('core-js/fn/object/values');
  })();
}