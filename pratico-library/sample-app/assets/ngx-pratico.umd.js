(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("@angular/core");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
let WindowRef = class WindowRef {
    constructor() {
        this.titleChanged = new core_1.EventEmitter();
        this.scrollChanged = new core_1.EventEmitter();
    }
    get window() {
        return this._window;
    }
    get title() {
        return (this.window && this.window.document) ? this.window.document.title : '';
    }
    set title(value) {
        if (this.window && this.window.document) {
            this.window.document.title = value;
            this.notifyTitleChanged(value);
        }
    }
    scrollTo(x, y) {
        this.window.scrollTo(x, y);
    }
    get nativeWindow() {
        return this._window;
    }
    notifyTitleChanged(value) {
        this.titleChanged.emit(value);
    }
    notifyScrollChanged(x, y) {
        this.scrollChanged.emit({
            x: x,
            y: y
        });
    }
};
WindowRef = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], WindowRef);
exports.WindowRef = WindowRef;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const observable_watcher_1 = __webpack_require__(6);
exports.PRATICAL_RX_PROVIDERS = [
    observable_watcher_1.ObservableWatcher
];
let PraticoRxModule = PraticoRxModule_1 = class PraticoRxModule {
    static forRoot() {
        return {
            ngModule: PraticoRxModule_1,
            providers: exports.PRATICAL_RX_PROVIDERS
        };
    }
};
PraticoRxModule = PraticoRxModule_1 = __decorate([
    core_1.NgModule({
        providers: [],
        declarations: [],
        entryComponents: [],
        exports: []
    })
], PraticoRxModule);
exports.PraticoRxModule = PraticoRxModule;
var PraticoRxModule_1;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
exports.TEMPLATE_SCRIPT = `let a = 1;
let p = new Promise((resolve, reject) => {
  setTimeout(() => resolve(), 3000);
});

import { Directive, Component, Injectable } from '@angular/core';


@Injectable()
export class SomeService2 {
  doesSomething() {
    console.log('Does something...');
  }
}
@Component({
  selector: 'app-comp',
  template: \`<h1>{{title}}</h1>\`
})
export class MyComponent {
  title = 'My Main Page!';
}

@Directive({
  selector: 'ngxTranslate'
})
export class TranslateDirective {
  constructor() {

  }
}
`;
/**
 * Provides access to source code to be displayed on CodeEditor
 *
 * @export
 * @class PraticoCodeManager
 */
let CodeManager = class CodeManager {
    getCode(path) {
        return exports.TEMPLATE_SCRIPT;
    }
};
CodeManager = __decorate([
    core_1.Injectable()
], CodeManager);
exports.CodeManager = CodeManager;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DATA_SVG_XML_PREFIX = 'data:image/svg+xml;charset=utf-8';
function svgAsEmbededResource(svgContent) {
    const encodedContent = encodeURIComponent(svgContent);
    return `${exports.DATA_SVG_XML_PREFIX},${encodedContent}`;
}
exports.svgAsEmbededResource = svgAsEmbededResource;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var observable_watcher_1 = __webpack_require__(6);
exports.ObservableWatcher = observable_watcher_1.ObservableWatcher;
var rx_module_1 = __webpack_require__(2);
exports.PraticoRxModule = rx_module_1.PraticoRxModule;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
__webpack_require__(25);
__webpack_require__(24);
/**
 * ObservableWatcher allow to watch into a observable and so, know when it started and completed
 *
 * @export
 * @class ObservableWatcher
 * @template T
 */
class ObservableWatcher {
    /**
     * Creates an instance of ObservableWatcher.
     * @param {Observable<any>} originObservable
     *
     * @memberOf ObservableWatcher
     */
    constructor(originObservable) {
        this.processing = false;
        this.onCompleted = new core_1.EventEmitter();
        this._debug = false;
        this.console = {
            log: function (...args) {
                if (this._debug) {
                    window.console.log(arguments);
                }
            }
        };
        if (!originObservable) {
            throw new Error('You should pass an Observable!!');
        }
        this.configureObservable(originObservable);
    }
    /**
     * Watchs into an Observable
     *
     * @static
     * @template U
     * @param {Observable<U>} observable
     * @returns {<ObservableWatched<U>>}
     *
     * @memberOf ObservableWatcher
     */
    static watch(observable) {
        new ObservableWatcher(observable);
        return observable;
    }
    /**
     * Enables to write console.log into output
     *
     * @param {boolean} debug
     *
     * @memberOf ObservableWatcher
     */
    setDebug(debug) {
        this._debug = debug;
    }
    completedHandler() {
        this.console.log('complete handler');
        this.processing = false;
        this.onCompleted.next();
    }
    errorHandler(e) {
        this.console.log('error handler');
        this.processing = false;
        this.onCompleted.next();
    }
    configureObservable(originObservable) {
        const originalObservableSubscribe = originObservable.subscribe;
        originObservable.watcher = this;
        this.console.log('subscribe configured');
        const __this = this;
        originObservable.subscribe = (function (nextOriginal, errorOriginal, completeOriginal) {
            __this.console.log('subscribe called!');
            __this.processing = true;
            const error = function () {
                __this.errorHandler.apply(__this, arguments);
                if (errorOriginal) {
                    errorOriginal.apply(this, arguments);
                }
            };
            const complete = function () {
                __this.completedHandler.apply(__this, arguments);
                if (completeOriginal) {
                    completeOriginal.apply(this, arguments);
                }
            };
            originalObservableSubscribe.apply(this, [nextOriginal, error, complete]);
        });
    }
}
exports.ObservableWatcher = ObservableWatcher;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const svg_as_embeded_resource_1 = __webpack_require__(4);
const svg_icons_1 = __webpack_require__(11);
exports.EMBEDDED_IMAGE_RESOURCES = {
    'ball': svg_icons_1.BALL_SVG,
    'balls': svg_icons_1.BALLS_SVG,
    'blue-loading': svg_icons_1.BLUE_LOADING,
    'clock': svg_icons_1.CLOCK_SVG,
    'hour-glass': svg_icons_1.HOUR_GLASS_SVG,
    'magnify': svg_icons_1.MAGNIFY_SVG,
    'orange-loading': svg_icons_1.ORANGE_LOADING_SVG,
    'rolling': svg_icons_1.ROLLING_SVG,
    'squares': svg_icons_1.SQUARES_SVG
};
Object.keys(exports.EMBEDDED_IMAGE_RESOURCES).forEach((name) => {
    exports.EMBEDDED_IMAGE_RESOURCES[name] = svg_as_embeded_resource_1.svgAsEmbededResource(exports.EMBEDDED_IMAGE_RESOURCES[name]);
});
exports.DefaultLoadingImage = 'blue-loading';
/**
 * ImageAssetsLoader provides the icons which would be used in the loading indicator.
 *
 * @export
 * @class ImageAssetsLoader
 */
let ImageAssetsLoader = class ImageAssetsLoader {
    /**
     * Creates an instance of ImageAssetsLoader.
     *
     * @memberOf ImageAssetsLoader
     */
    constructor() {
        this.resources = exports.EMBEDDED_IMAGE_RESOURCES;
    }
    /**
     * Returns an icon asset by name
     *
     * @param {string} name
     * @returns {string} the asset resource src or data
     *
     * @memberOf ImageAssetsLoader
     */
    getAssetByName(name) {
        return this.resources[name];
    }
    /**
     * Returns true if there is an asset with a given name
     *
     * @param {string} name
     * @returns {boolean}
     *
     * @memberOf ImageAssetsLoader
     */
    hasAsset(name) {
        return Object.keys(this.resources).indexOf(name) !== -1;
    }
    /**
     *
     *
     * @returns {string} the default asset resource src or data
     *
     * @memberOf ImageAssetsLoader
     */
    getDefaultAsset() {
        return this.resources[exports.DefaultLoadingImage];
    }
};
ImageAssetsLoader = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], ImageAssetsLoader);
exports.ImageAssetsLoader = ImageAssetsLoader;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("@angular/platform-browser");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const code_editor_component_1 = __webpack_require__(14);
const code_manager_service_1 = __webpack_require__(3);
const browser_1 = __webpack_require__(13);
const code_editor_config_service_1 = __webpack_require__(15);
const monaco_typings_loader_service_1 = __webpack_require__(17);
const monaco_initializer_service_1 = __webpack_require__(16);
const window_ref_service_1 = __webpack_require__(1);
/**
 * Inspired on:
 * - https://www.npmjs.com/package/ng2-monaco-editor / https://github.com/0plus1/ng2-monaco-editor
 * - https://gist.github.com/chrisber/ef567098216319784c0596c5dac8e3aa
//  */
exports.INITIALIZER_TOKEN = core_1.APP_INITIALIZER;
exports.PRATICAL_CODE_EDITOR_PROVIDERS = [
    code_manager_service_1.CodeManager,
    code_editor_config_service_1.CodeEditorConfig,
    monaco_typings_loader_service_1.MonacoTypingsLoader,
    {
        provide: exports.INITIALIZER_TOKEN,
        useFactory: monaco_initializer_service_1.monacoInitializerFactory,
        deps: [core_1.forwardRef(() => window_ref_service_1.WindowRef), core_1.forwardRef(() => code_editor_config_service_1.CodeEditorConfig), core_1.forwardRef(() => monaco_typings_loader_service_1.MonacoTypingsLoader)],
        multi: true
    }
];
let PraticoCodeEditorModule = PraticoCodeEditorModule_1 = class PraticoCodeEditorModule {
    static forRoot() {
        return {
            ngModule: PraticoCodeEditorModule_1,
            providers: exports.PRATICAL_CODE_EDITOR_PROVIDERS
        };
    }
};
PraticoCodeEditorModule = PraticoCodeEditorModule_1 = __decorate([
    core_1.NgModule({
        declarations: [code_editor_component_1.CodeEditorComponent],
        entryComponents: [code_editor_component_1.CodeEditorComponent],
        exports: [code_editor_component_1.CodeEditorComponent],
        imports: [
            browser_1.PraticoBrowserModule.forRoot()
        ]
    })
], PraticoCodeEditorModule);
exports.PraticoCodeEditorModule = PraticoCodeEditorModule;
var PraticoCodeEditorModule_1;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const image_assets_loader_service_1 = __webpack_require__(7);
const rx_module_1 = __webpack_require__(2);
const inplace_loading_component_1 = __webpack_require__(20);
const observable_watcher_pipe_1 = __webpack_require__(22);
const svg_spinner_component_1 = __webpack_require__(21);
const platform_browser_1 = __webpack_require__(8);
const app_splash_component_1 = __webpack_require__(19);
exports.PRATICAL_UI_PROVIDERS = [
    image_assets_loader_service_1.ImageAssetsLoader
];
let PraticoUiModule = PraticoUiModule_1 = class PraticoUiModule {
    static forRoot() {
        return {
            ngModule: PraticoUiModule_1,
            providers: exports.PRATICAL_UI_PROVIDERS
        };
    }
};
PraticoUiModule = PraticoUiModule_1 = __decorate([
    core_1.NgModule({
        declarations: [app_splash_component_1.AppSplashComponent, inplace_loading_component_1.InplaceLoadingComponent, svg_spinner_component_1.SvgSpinnerComponent, observable_watcher_pipe_1.ObservableWatcherPipe],
        entryComponents: [app_splash_component_1.AppSplashComponent, inplace_loading_component_1.InplaceLoadingComponent, svg_spinner_component_1.SvgSpinnerComponent],
        exports: [app_splash_component_1.AppSplashComponent, inplace_loading_component_1.InplaceLoadingComponent, svg_spinner_component_1.SvgSpinnerComponent],
        imports: [
            rx_module_1.PraticoRxModule,
            platform_browser_1.BrowserModule
        ]
    })
], PraticoUiModule);
exports.PraticoUiModule = PraticoUiModule;
var PraticoUiModule_1;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:max-line-length
exports.BALL_SVG = `<?xml version="1.0" encoding="utf-8"?><svg width='72px' height='72px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-ball"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><g transform="translate(50 50)"><g><circle cx="0" cy="0" r="15" fill="#1b4f80" transform=""><animate attributeName="cy" calcMode="spline" dur="1s" repeatCount="indefinite" from="30" to="30" values="30;-30;30" keySplines="0.4 0.8 0.4 0.8;0.8 0.4 0.8 0.4" keyTimes="0;0.5;1"></animate></circle><animateTransform  type="rotate" from="0" to="360" dur="1s" repeatCount="indefinite"></animateTransform></g></g></svg>`;
// tslint:disable-next-line:max-line-length
exports.BALLS_SVG = `<svg width='192px' height= '192px' xmlns= "http://www.w3.org/2000/svg" viewBox= "0 0 100 100" preserveAspectRatio= "xMidYMid" class="uil-balls" > <rect x="0" y= "0" width= "100" height= "100" fill= "none" class="bk" > </rect><g transform="rotate(0 50 50)"> < circle r= "5" cx= "30" cy= "50" > <animateTransform attributeName="transform" type= "translate" begin= "0s" repeatCount= "indefinite" dur= "1s" values= "0 0;19.999999999999996 -20" keyTimes= "0;1" /> <animate attributeName="fill" dur= "1s" begin= "0s" repeatCount= "indefinite"  keyTimes= "0;1" values= "#fff;#999" /> </circle> < /g><g transform="rotate(90 50 50)"> < circle r= "5" cx= "30" cy= "50" > <animateTransform attributeName="transform" type= "translate" begin= "0s" repeatCount= "indefinite" dur= "1s" values= "0 0;19.999999999999996 -20" keyTimes= "0;1" /> <animate attributeName="fill" dur= "1s" begin= "0s" repeatCount= "indefinite"  keyTimes= "0;1" values= "#999;#000" /> </circle> < /g><g transform="rotate(180 50 50)"> < circle r= "5" cx= "30" cy= "50" > <animateTransform attributeName="transform" type= "translate" begin= "0s" repeatCount= "indefinite" dur= "1s" values= "0 0;19.999999999999996 -20" keyTimes= "0;1" /> <animate attributeName="fill" dur= "1s" begin= "0s" repeatCount= "indefinite"  keyTimes= "0;1" values= "#000;#fff" /> </circle> < /g><g transform="rotate(270 50 50)"> < circle r= "5" cx= "30" cy= "50" > <animateTransform attributeName="transform" type= "translate" begin= "0s" repeatCount= "indefinite" dur= "1s" values= "0 0;19.999999999999996 -20" keyTimes= "0;1" /> <animate attributeName="fill" dur= "1s" begin= "0s" repeatCount= "indefinite"  keyTimes= "0;1" values= "#fff;#999" /> </circle> < /g></svg >`;
// tslint:disable-next-line:max-line-length
exports.BLUE_LOADING = `<svg width='100px' height='100px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-default"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#2f3a73' transform='rotate(0 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#2f3a73' transform='rotate(30 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.08333333333333333s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#2f3a73' transform='rotate(60 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.16666666666666666s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#2f3a73' transform='rotate(90 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.25s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#2f3a73' transform='rotate(120 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.3333333333333333s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#2f3a73' transform='rotate(150 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.4166666666666667s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#2f3a73' transform='rotate(180 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.5s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#2f3a73' transform='rotate(210 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.5833333333333334s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#2f3a73' transform='rotate(240 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.6666666666666666s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#2f3a73' transform='rotate(270 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.75s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#2f3a73' transform='rotate(300 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.8333333333333334s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#2f3a73' transform='rotate(330 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.9166666666666666s' repeatCount='indefinite'/></rect></svg>`;
// tslint:disable-next-line:max-line-length
exports.CLOCK_SVG = `<?xml version="1.0" encoding="utf-8"?><svg width='120px' height='120px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-clock"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><circle cx="50" cy="50" r="30" fill="#d6f1ff" stroke="#2b74ba" stroke-width="8px"></circle><line x1="50" y1="50" x2="50" y2="30" stroke="#000" stroke-width="5" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="5s" repeatCount="indefinite"></animateTransform></line><line x1="50" y1="50" x2="50" y2="20" stroke="#f00" stroke-width="2px" stroke-linecap="round" opacity="0"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="1s" repeatCount="indefinite"></animateTransform></line></svg>`;
// tslint:disable-next-line:max-line-length
exports.HOUR_GLASS_SVG = `<?xml version="1.0" encoding="utf-8"?><svg width='192px' height='192px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-hourglass"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><g><path fill="none" stroke="#007282" stroke-width="5" stroke-miterlimit="10" d="M58.4,51.7c-0.9-0.9-1.4-2-1.4-2.3s0.5-0.4,1.4-1.4 C70.8,43.8,79.8,30.5,80,15.5H70H30H20c0.2,15,9.2,28.1,21.6,32.3c0.9,0.9,1.4,1.2,1.4,1.5s-0.5,1.6-1.4,2.5 C29.2,56.1,20.2,69.5,20,85.5h10h40h10C79.8,69.5,70.8,55.9,58.4,51.7z" class="glass"></path><clipPath id="uil-hourglass-clip1"><rect x="15" y="20" width="70" height="25" class="clip"><animate attributeName="height" from="25" to="0" dur="1s" repeatCount="indefinite" values="25;0;0" keyTimes="0;0.5;1"></animate><animate attributeName="y" from="20" to="45" dur="1s" repeatCount="indefinite" values="20;45;45" keyTimes="0;0.5;1"></animate></rect></clipPath><clipPath id="uil-hourglass-clip2"><rect x="15" y="55" width="70" height="25" class="clip"><animate attributeName="height" from="0" to="25" dur="1s" repeatCount="indefinite" values="0;25;25" keyTimes="0;0.5;1"></animate><animate attributeName="y" from="80" to="55" dur="1s" repeatCount="indefinite" values="80;55;55" keyTimes="0;0.5;1"></animate></rect></clipPath><path d="M29,23c3.1,11.4,11.3,19.5,21,19.5S67.9,34.4,71,23H29z" clip-path="url(#uil-hourglass-clip1)" fill="#ffab00" class="sand"></path><path d="M71.6,78c-3-11.6-11.5-20-21.5-20s-18.5,8.4-21.5,20H71.6z" clip-path="url(#uil-hourglass-clip2)" fill="#ffab00" class="sand"></path><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="180 50 50" repeatCount="indefinite" dur="1s" values="0 50 50;0 50 50;180 50 50" keyTimes="0;0.7;1"></animateTransform></g></svg>`;
// tslint:disable-next-line:max-line-length
exports.MAGNIFY_SVG = `<?xml version="1.0" encoding="utf-8"?><svg width='18px' height='18px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-magnify"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><g><circle fill="#b8b8ff" cx="47" cy="47" r="20" opacity="0.5"></circle><path d="M77.5,69.3l-6.2-6.2c-0.7-0.7-1.3-1.2-1.9-1.6c2.6-4,4.1-8.8,4.1-14c0-14.4-11.7-26.1-26.1-26.1S21.3,33.2,21.3,47.5 S33,73.6,47.4,73.6c5.4,0,10.4-1.6,14.5-4.4c0.5,0.7,1.1,1.4,1.9,2.2l5.8,5.8c2.9,2.9,7.1,3.5,9.2,1.3C81,76.4,80.4,72.2,77.5,69.3z M47.4,66.2c-10.3,0-18.7-8.4-18.7-18.6s8.4-18.6,18.7-18.6s18.7,8.4,18.7,18.6S57.7,66.2,47.4,66.2z" fill="#030317"></path><animateTransform attributeName="transform" type="translate" from="15 15" to="15 15" dur="1s" repeatCount="indefinite" values="15 15;-15 15;0 -10.98;15 15" keyTimes="0;0.33;0.66;1"></animateTransform></g></svg>`;
// tslint:disable-next-line:max-line-length
exports.ORANGE_LOADING_SVG = `<svg width='20px' height='20px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-default"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='darkorange' transform='rotate(0 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='darkorange' transform='rotate(30 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.08333333333333333s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='darkorange' transform='rotate(60 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.16666666666666666s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='darkorange' transform='rotate(90 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.25s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='darkorange' transform='rotate(120 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.3333333333333333s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='darkorange' transform='rotate(150 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.4166666666666667s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='darkorange' transform='rotate(180 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.5s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='darkorange' transform='rotate(210 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.5833333333333334s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='darkorange' transform='rotate(240 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.6666666666666666s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='darkorange' transform='rotate(270 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.75s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='darkorange' transform='rotate(300 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.8333333333333334s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='darkorange' transform='rotate(330 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.9166666666666666s' repeatCount='indefinite'/></rect></svg>`;
// tslint:disable-next-line:max-line-length
exports.ROLLING_SVG = `<?xml version="1.0" encoding="utf-8"?><svg width='98px' height='98px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-ring"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><circle cx="50" cy="50" r="40" stroke-dasharray="163.36281798666926 87.9645943005142" stroke="#d25353" fill="none" stroke-width="20"><animateTransform attributeName="transform" type="rotate" values="0 50 50;180 50 50;360 50 50;" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite" begin="0s"></animateTransform></circle></svg>`;
// tslint:disable-next-line:max-line-length
exports.SQUARES_SVG = `<?xml version="1.0" encoding="utf-8"?><svg width='98px' height='98px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-squares"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><rect x="15" y="15" width="20" height="20" fill="#047ab3" class="sq"><animate attributeName="fill" from="#047ab3" to="#00cde8" repeatCount="indefinite" dur="1s" begin="0.0s" values="#00cde8;#00cde8;#047ab3;#047ab3" keyTimes="0;0.1;0.2;1"></animate></rect><rect x="40" y="15" width="20" height="20" fill="#047ab3" class="sq"><animate attributeName="fill" from="#047ab3" to="#00cde8" repeatCount="indefinite" dur="1s" begin="0.125s" values="#00cde8;#00cde8;#047ab3;#047ab3" keyTimes="0;0.1;0.2;1"></animate></rect><rect x="65" y="15" width="20" height="20" fill="#047ab3" class="sq"><animate attributeName="fill" from="#047ab3" to="#00cde8" repeatCount="indefinite" dur="1s" begin="0.25s" values="#00cde8;#00cde8;#047ab3;#047ab3" keyTimes="0;0.1;0.2;1"></animate></rect><rect x="15" y="40" width="20" height="20" fill="#047ab3" class="sq"><animate attributeName="fill" from="#047ab3" to="#00cde8" repeatCount="indefinite" dur="1s" begin="0.875s" values="#00cde8;#00cde8;#047ab3;#047ab3" keyTimes="0;0.1;0.2;1"></animate></rect><rect x="65" y="40" width="20" height="20" fill="#047ab3" class="sq"><animate attributeName="fill" from="#047ab3" to="#00cde8" repeatCount="indefinite" dur="1s" begin="0.375" values="#00cde8;#00cde8;#047ab3;#047ab3" keyTimes="0;0.1;0.2;1"></animate></rect><rect x="15" y="65" width="20" height="20" fill="#047ab3" class="sq"><animate attributeName="fill" from="#047ab3" to="#00cde8" repeatCount="indefinite" dur="1s" begin="0.75s" values="#00cde8;#00cde8;#047ab3;#047ab3" keyTimes="0;0.1;0.2;1"></animate></rect><rect x="40" y="65" width="20" height="20" fill="#047ab3" class="sq"><animate attributeName="fill" from="#047ab3" to="#00cde8" repeatCount="indefinite" dur="1s" begin="0.625s" values="#00cde8;#00cde8;#047ab3;#047ab3" keyTimes="0;0.1;0.2;1"></animate></rect><rect x="65" y="65" width="20" height="20" fill="#047ab3" class="sq"><animate attributeName="fill" from="#047ab3" to="#00cde8" repeatCount="indefinite" dur="1s" begin="0.5s" values="#00cde8;#00cde8;#047ab3;#047ab3" keyTimes="0;0.1;0.2;1"></animate></rect></svg>`;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const window_ref_service_1 = __webpack_require__(1);
exports.defaultWindow = window;
function buildWindowProvider() {
    const windowRef = new window_ref_service_1.WindowRef();
    windowRef['_window'] = exports.defaultWindow;
    return windowRef;
}
exports.buildWindowProvider = buildWindowProvider;
exports.PRATICAL_BROWSER_MODULE_PROVIDERS = [
    {
        provide: window_ref_service_1.WindowRef,
        useFactory: buildWindowProvider
    }
];
let PraticoBrowserModule = PraticoBrowserModule_1 = class PraticoBrowserModule {
    static forRoot() {
        return {
            ngModule: PraticoBrowserModule_1,
            providers: exports.PRATICAL_BROWSER_MODULE_PROVIDERS
        };
    }
};
PraticoBrowserModule = PraticoBrowserModule_1 = __decorate([
    core_1.NgModule({
        providers: []
    })
], PraticoBrowserModule);
exports.PraticoBrowserModule = PraticoBrowserModule;
var PraticoBrowserModule_1;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var window_ref_service_1 = __webpack_require__(1);
exports.WindowRef = window_ref_service_1.WindowRef;
var browser_module_1 = __webpack_require__(12);
exports.PraticoBrowserModule = browser_module_1.PraticoBrowserModule;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const code_manager_service_1 = __webpack_require__(3);
const window_ref_service_1 = __webpack_require__(1);
const _ = __webpack_require__(23);
// fp-ngx -> fast and pratico angular
let CodeEditorComponent = class CodeEditorComponent {
    constructor(codeManager, windowRef) {
        this.codeManager = codeManager;
        this.windowRef = windowRef;
        this.language = 'typescript';
        this.load = new core_1.EventEmitter();
        this.save = new core_1.EventEmitter();
        this._defaultWidth = '800px';
        this._width = null;
        this._defaultHeight = '600px';
        this._height = null;
        this._defaultPosition = 'relative';
        this._position = null;
        this._defaultBorder = '1px solid gray';
        this._border = null;
    }
    ngOnInit() {
    }
    ngAfterViewInit() {
        this.initMonaco();
    }
    // Will be called once monaco library is available
    initMonaco() {
        const myDiv = this.editorContent.nativeElement;
        this.windowRef.nativeWindow.PRATICO_EDITOR = monaco.editor.create(myDiv, {
            model: monaco.editor.createModel(this.codeManager.getCode(this.fileName), this.language, monaco.Uri.parse('file:///script.ts'))
        });
        // this.typingsLoader.loadTypings();
    }
    afterLoad() {
        this.load.emit();
    }
    afterSave() {
        this.save.emit();
    }
    get width() {
        return this.getWidth();
    }
    set width(value) {
        this._width = value;
    }
    getWidth() {
        if (this._width == null || _.isEmpty(this._width)) {
            return this._defaultWidth;
        }
        else {
            return this._width;
        }
    }
    get height() {
        return this.getHeight();
    }
    set height(value) {
        this._height = value;
    }
    getHeight() {
        if (this._height == null || _.isEmpty(this._height)) {
            return this._defaultHeight;
        }
        else {
            return this._height;
        }
    }
    get position() {
        return this.getPosition();
    }
    set position(value) {
        this._position = value;
    }
    getPosition() {
        if (this._position == null || _.isEmpty(this._position)) {
            return this._defaultPosition;
        }
        else {
            return this._position;
        }
    }
    get border() {
        return this.getBorder();
    }
    set border(value) {
        this._border = value;
    }
    getBorder() {
        if (this._border == null || _.isEmpty(this._border)) {
            return this._defaultBorder;
        }
        else {
            return this._border;
        }
    }
};
__decorate([
    core_1.ViewChild('editor'),
    __metadata("design:type", core_1.ElementRef)
], CodeEditorComponent.prototype, "editorContent", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CodeEditorComponent.prototype, "fileName", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], CodeEditorComponent.prototype, "language", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], CodeEditorComponent.prototype, "load", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], CodeEditorComponent.prototype, "save", void 0);
__decorate([
    core_1.Input(),
    core_1.HostBinding('style.width'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], CodeEditorComponent.prototype, "width", null);
__decorate([
    core_1.Input(),
    core_1.HostBinding('style.height'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], CodeEditorComponent.prototype, "height", null);
__decorate([
    core_1.Input(),
    core_1.HostBinding('style.position'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], CodeEditorComponent.prototype, "position", null);
__decorate([
    core_1.Input(),
    core_1.HostBinding('style.border'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], CodeEditorComponent.prototype, "border", null);
CodeEditorComponent = __decorate([
    core_1.Component({
        selector: 'pratico-code-editor',
        template: `<div id='editor' #editor class="monaco-editor" style="width:800px;height:600px;" ></div>`
    }),
    __metadata("design:paramtypes", [code_manager_service_1.CodeManager,
        window_ref_service_1.WindowRef])
], CodeEditorComponent);
exports.CodeEditorComponent = CodeEditorComponent;
/*
## R
*/


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
let CodeEditorConfig = class CodeEditorConfig {
    constructor() {
        this.monacoPath = 'assets/monaco/vs';
    }
};
CodeEditorConfig = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], CodeEditorConfig);
exports.CodeEditorConfig = CodeEditorConfig;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function monacoInitializerFactory(windowRef, config, typingsLoader) {
    return function () {
        const monacoInitializer = new MonacoInitializer(windowRef, config, typingsLoader);
        return monacoInitializer.init();
    };
}
exports.monacoInitializerFactory = monacoInitializerFactory;
class MonacoInitializer {
    constructor(windowRef, config, typingsLoader) {
        this.windowRef = windowRef;
        this.config = config;
        this.typingsLoader = typingsLoader;
    }
    init() {
        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
            const onGotAmdLoader = () => {
                // Load monaco
                this.windowRef.nativeWindow.require.config({ paths: { 'vs': this.config.monacoPath } });
                this.windowRef.nativeWindow.require(['vs/editor/editor.main'], () => {
                    this.configureTypescript();
                });
            };
            // Load AMD loader if necessary
            if (!this.windowRef.nativeWindow.require) {
                const loaderScript = document.createElement('script');
                loaderScript.type = 'text/javascript';
                loaderScript.src = 'assets/monaco/vs/loader.js';
                loaderScript.addEventListener('load', onGotAmdLoader);
                document.body.appendChild(loaderScript);
            }
            else {
                onGotAmdLoader();
            }
        });
    }
    configureTypescript() {
        monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
            target: monaco.languages.typescript.ScriptTarget.ES2016,
            allowNonTsExtensions: true,
            moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
            module: monaco.languages.typescript.ModuleKind.CommonJS,
            noEmit: true,
            allowSyntheticDefaultImports: true,
            emitDecoratorMetadata: true,
            experimentalDecorators: true,
            typeRoots: [
                '@types'
            ]
        });
        this.typingsLoader.loadTypings();
        this.resolve();
    }
}
exports.MonacoInitializer = MonacoInitializer;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
/**
 * Loads typings into monaco editor
 *
 * - https://github.com/Microsoft/monaco-editor/issues/264
 *
 *
monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.ES2016,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.CommonJS,
    noEmit: true,
    typeRoots: ["node_modules/@types"]
});

// extra libraries
monaco.languages.typescript.typescriptDefaults.addExtraLib(
    `export declare function next() : string`,
    'node_modules/@types/external/index.d.ts');

monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false
})

var jsCode = `import * as x from "external"
    const tt : string = x.dnext();`;

monaco.editor.create(document.getElementById("container"), {
    model: monaco.editor.createModel(jsCode,"typescript",new monaco.Uri("file:///main.tsx")),
});
 *
 * @export
 * @class MonacoTypingsLoader
 */
let MonacoTypingsLoader = class MonacoTypingsLoader {
    constructor() {
        this.typings = [];
    }
    loadTypings() {
        monaco.languages.typescript.typescriptDefaults.addExtraLib(this.angularCore, '@types/angular/core/index.d.ts');
    }
    get angularCore() {
        return `
declare var module: any;

declare module "@angular/core" {

    export interface Directive {
        selector?: string;
        inputs?: string[];
        outputs?: string[];
        host?: {[key: string]: string};
        providers?: any[];
        exportAs?: string;
        queries?: {[key: string]: any};
    }

    export interface Component extends Directive {
        moduleId?: string;
        template?: string;
        templateUrl?: string;
        styles?: string[];
        styleUrls?: string[];
        changeDetection?: any;
        viewProviders?: any[];
        animations?: any[];
        encapsulation?: any;
        interpolation?: [string, string];
        entryComponents?: any[];
    }

    //Decorators
    export function Directive(settings: Directive) : any;
    export function Component(settings: Component) : any;
    export function Injectable() : any;


    export function enableProdMode(): void;
    export abstract class OnInit {
        ngOnInit(): void;
    }

    export abstract class OnDestroy {
        ngOnDestroy(): void;
    }
}`;
    }
};
MonacoTypingsLoader = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], MonacoTypingsLoader);
exports.MonacoTypingsLoader = MonacoTypingsLoader;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rx_module_1 = __webpack_require__(2);
exports.PraticoRxModule = rx_module_1.PraticoRxModule;
var ui_module_1 = __webpack_require__(10);
exports.PraticoUiModule = ui_module_1.PraticoUiModule;
var code_editor_module_1 = __webpack_require__(9);
exports.PraticoCodeEditorModule = code_editor_module_1.PraticoCodeEditorModule;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
let AppSplashComponent = class AppSplashComponent {
};
AppSplashComponent = __decorate([
    core_1.Component({
        selector: 'pratico-splash',
        template: ''
    })
], AppSplashComponent);
exports.AppSplashComponent = AppSplashComponent;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const index_1 = __webpack_require__(5);
/**
 * Component which shows a svg loading indicator while a observable is executing
 *
 * @export
 * @class InplaceLoadingComponent
 * @implements {OnChanges}
 * @example ```
 *    <pratico-inplace-loading>Processing...</pratico-inplace-loading>
 *    or
 *    <pratico-inplace-loading><pratico-spinner spinner="balls"></pratico-spinner></pratico-inplace-loading>
 * ```
 */
let InplaceLoadingComponent = class InplaceLoadingComponent {
    constructor(ref) {
        this.ref = ref;
        this.afterLoad = new core_1.EventEmitter();
    }
    get loading() {
        return (this.observable && this.observable.watcher) ? this.observable.watcher.processing : false;
    }
    get style() {
        return this.loading ? 'inline-block' : 'none';
    }
    ngOnChanges(changes) {
        // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        // Add 'implements OnChanges' to the class.
        if (changes['observable'] && changes['observable'].currentValue) {
            this.ref.markForCheck();
        }
    }
    // get imageUrl(): SafeHtml {
    //   if (this.spinner && this.assets.getAssetByName(this.spinner)) {
    //     return this.sanitizer
    //       .bypassSecurityTrustResourceUrl(
    //       window['unescape'](this.assets.getAssetByName(this.spinner)).replace('"', '').replace('"', '')
    //       );
    //   } else {
    //     return this.sanitizer
    //       .bypassSecurityTrustResourceUrl(
    //       window['unescape'](this.assets.getDefaultAsset()).replace('"', '').replace('"', '')
    //       );
    //   }
    // }
    get observable() {
        return this._observable;
    }
    set observable(value) {
        if (value) {
            this._observable = index_1.ObservableWatcher.watch(value);
            this._observable.watcher.onCompleted.subscribe(() => {
                this.onAfterLoad();
            });
        }
    }
    onAfterLoad() {
        this.afterLoad.emit();
        this.ref.markForCheck();
    }
};
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], InplaceLoadingComponent.prototype, "afterLoad", void 0);
__decorate([
    core_1.HostBinding('style.display'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], InplaceLoadingComponent.prototype, "style", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], InplaceLoadingComponent.prototype, "observable", null);
InplaceLoadingComponent = __decorate([
    core_1.Component({
        selector: 'pratico-inplace-loading',
        template: `<ng-content></ng-content>`,
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [core_1.ChangeDetectorRef])
], InplaceLoadingComponent);
exports.InplaceLoadingComponent = InplaceLoadingComponent;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const image_assets_loader_service_1 = __webpack_require__(7);
const platform_browser_1 = __webpack_require__(8);
const svg_as_embeded_resource_1 = __webpack_require__(4);
/**
 * SvgSpinnerComponent shows a svg spinner passing the name of the spinner or the svg spinner
 * into the input "spinner"
 *
 * @export
 * @class SvgSpinnerComponent
 */
let SvgSpinnerComponent = class SvgSpinnerComponent {
    /**
     * Creates an instance of SpinnerComponent.
     * @param {ImageAssetsLoader} assets
     * @param {DomSanitizer} sanitizer
     *
     * @memberOf SpinnerComponent
     */
    constructor(assets, sanitizer, ref) {
        this.assets = assets;
        this.sanitizer = sanitizer;
        this.ref = ref;
        this._height = 0;
        this._width = 0;
    }
    get width() {
        return this._width;
    }
    set width(value) {
        // TODO: validate dimension  using parseCssDimension -- // require('parse-css-dimension');
        // AND https://www.npmjs.com/package/parse-absolute-css-unit to parse units to pixel
        this._width = value;
        this.ref.markForCheck();
    }
    get height() {
        return this._height;
    }
    set height(value) {
        this._height = value;
        this.ref.markForCheck();
    }
    /**
     * Returns the svg already encoded, prefixed and sanitized to use inside "src" attribute of an image tag
     *
     * @readonly
     * @type {SafeResourceUrl}
     * @memberOf SpinnerComponent
     */
    get svgEmbeddableContent() {
        return this.getSvgEmbeddableContent();
    }
    /**
     *
     *
     * @returns {SafeResourceUrl}
     *
     * @memberOf SvgSpinnerComponent
     */
    getSvgEmbeddableContent() {
        if (this.isSvgKeyName(this.spinner)) {
            return this.sanitizeImageUrl(this.assets.getAssetByName(this.spinner));
        }
        else {
            return this.sanitizeAndEncodeImageUrl(this.spinner);
        }
    }
    get spinner() {
        return this._spinner;
    }
    set spinner(value) {
        this._spinner = value;
        this.ref.markForCheck();
    }
    isSvgKeyName(value) {
        return this.assets.hasAsset(value);
    }
    sanitizeAndEncodeImageUrl(content) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(`${svg_as_embeded_resource_1.svgAsEmbededResource(content)}`);
    }
    sanitizeImageUrl(content) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(content);
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], SvgSpinnerComponent.prototype, "width", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], SvgSpinnerComponent.prototype, "height", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [String])
], SvgSpinnerComponent.prototype, "spinner", null);
SvgSpinnerComponent = __decorate([
    core_1.Component({
        selector: 'pratico-spinner',
        template: `<img [src]="svgEmbeddableContent" [width]="width" [height]="height">`,
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [image_assets_loader_service_1.ImageAssetsLoader, platform_browser_1.DomSanitizer, core_1.ChangeDetectorRef])
], SvgSpinnerComponent);
exports.SvgSpinnerComponent = SvgSpinnerComponent;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(0);
const index_1 = __webpack_require__(5);
let ObservableWatcherPipe = class ObservableWatcherPipe {
    transform(value, ...args) {
        index_1.ObservableWatcher.watch(value);
        return value;
    }
};
ObservableWatcherPipe = __decorate([
    core_1.Pipe({
        // tslint:disable-next-line:pipe-naming
        name: 'observableWatcher'
    })
], ObservableWatcherPipe);
exports.ObservableWatcherPipe = ObservableWatcherPipe;


/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("rxjs/add/observable/of");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("rxjs/add/operator/do");

/***/ })
/******/ ])));
//# sourceMappingURL=ngx-pratico.umd.js.map