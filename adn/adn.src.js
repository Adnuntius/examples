/* eslint-env browser */
/* eslint-disable no-prototype-builtins */
'use strict';

var adn = adn || {};
adn.calls = adn.calls || [];
adn.version = '/* 0000 */';

try {
  (function(adn, doc, win) {
    var DEV_SCRIPT_ID = "ADN_DEV_SCRIPT",
      isDevScript = !!(doc.getElementById(DEV_SCRIPT_ID) || {}).src;
    if (adn.out && !isDevScript) {
      return adn.out.devOutput("adn.out is already defined", "initial check");
    }
    var ENUMS = {
        env: {
          localhost: {
            id: 'localhost',
            as: 'localhost:8078',
            api: 'http://localhost:8079/api/v1/creativepreview/'
          },
          lcl: {
            id: 'lcl',
            as: 'adserver.dev.lcl.test',
            dt: 'dev.data.lcl.test'
          },
          andemu: {
            id: 'andemu',
            as: '10.0.2.2:8078'
          },
          dev: {
            id: 'dev',
            as: 'adserver.dev.adnuntius.com',
            dt: 'dev.data.adnuntius.com',
            api: 'https://api.dev.adnuntius.com/api/v1/creativepreview/'
          },
          staging: {
            id: 'staging',
            as: 'adserver.staging.adnuntius.com',
            dt: 'staging.data.adnuntius.com',
            api: 'https://api.staging.adnuntius.com/api/v1/creativepreview/'
          },
          production: {
            id: 'production',
            as: 'delivery.adnuntius.com',
            dt: 'data.adnuntius.com',
            api: 'https://api.adnuntius.com/api/v1/creativepreview/'
          },
          cloudflare: {
            id: 'cloudflare',
            as: 'ads.adnuntius.delivery',
            dt: 'data.adnuntius.com',
            api: 'https://api.adnuntius.com/api/v1/creativepreview/'
          },
          limited: {
            id: 'limited',
            as: 'limited.delivery.adnuntius.com',
            dt: 'data.adnuntius.com'
          }
        },
        dn: {
          as: 'delivery.',
          dt: 'data.'
        },
        sync: {
          PLATFORM_161: 'https://ads.creative-serving.com/cm?redir=https%3A%2F%2Fdata.adnuntius.com%2Fsync%3FbrowserId%3D{BROWSER_ID}%26folderId%3D{FOLDER_ID}%26externalSystemType%3DP161%26externalSystemUserId%3D%24%7BUUID%7D'
        },
        impReg: {
          manual: 'manual'
        },
        events: {
          CUSTOM: 'CUSTOM'
        },
        methodEnums: {
          ifr: 'ifr',
          composed: 'composed',
          preview: 'preview',
          previewDirect: 'previewDirect',
          creativeTag: 'creativeTag'
        },
        loadEnums: {
          lazy: 'lazy',
          lazyRequest: 'lazyRequest'
        },
        requestMode: {
          hasTarget: 'hasTarget',
          default: 'default'
        },
        requestTiming: {
          immediate: 'immediate',
          onReady: 'onReady',
          onLoad: 'onLoad'
        },
        syncAds: ['//pagead2.googlesyndication.com/pagead/show_ads.js'],
        postMessageType: {
          toParentImpression: 'toParentImpression',
          toParentResponse: 'toParentResponse',
          toParentPageLoad: 'toParentPageLoad',
          toParentResize: 'toParentResize',
          toParentUpdateAd: 'toParentUpdateAd',
          toParentSubscribe: 'toParentSubscribe',
          toParentGetAdUnitInfo: 'toParentGetAdUnitInfo',
          toParentFunctions: 'toParentFunctions',
          toParentAllChildrenViewed: 'toParentAllChildrenViewed',
          toParentAdVisibilityEvent: 'toParentAdVisibilityEvent',
          toParentCustomEvent: 'toParentCustomEvent',
          toParentIsolateAdVisibilityEvent: 'toParentIsolateAdVisibilityEvent',
          toChildViewability: 'toChildViewability',
          toChildPubs: 'toChildPubs',
          toChildAdUnitInfo: 'toChildAdUnitInfo'
        },
        resizeToContent: {
          resize: 'resize',
          resizeCreative: 'resizeCreative',
          none: 'none'
        },
        validFormats: {
          script: 'script',
          iframe: 'iframe',
          js: 'js'
        },
        composedRequest: {
          noRequest: 'noRequest',
          requestMade: 'requestMade',
          requestReturned: 'requestReturned'
        },
        container: {
          iframe: 'iframe',
          div: 'div'
        },
        feedback: {
          console: {
            allAndInfo: 'allAndInfo',
            all: 'all',
            warnings: 'warnings',
            errors: 'errors',
            silent: 'silent'
          },
          inScreen: {
            inAdUnit: 'inAdUnit',
            silent: 'silent'
          }
        },
        cwClass: 'contentWrapperPerItem',
        nativeClass: 'adnNative',
        widgetIdPrefix: 'adn-widget-',
        adIdPrefix: 'adn-id-',
        longestTime: 900000,
        defaultProximity: 200,
        defaultVisibilityPercentage: 1,
        postMessageSrcKey: 'messageSrc',
        postMessageSrcValue: 'adn',
        functionContext: {
          parent: 'parent',
          inIframe: 'inIframe'
        },
        attentionStatus: {
          notAttention: 'notAttention',
          attention: 'attention',
          attentionSent: 'attentionSent'
        },
        viewabilityStatus: {
          notViewed: 'notViewed',
          divMissing: 'divMissing',
          blocked: 'blocked',
          viewed: 'viewed',
          viewSent: 'viewSent'
        },
        visibilityStatus: {
          notVisible: 'notVisible',
          visible: 'visible',
          visibleSent: 'visibleSent'
        },
        displayStatus: {
          notDisplayed: 'notDisplayed',
          displayed: 'displayed'
        },
        adStatus: {
          init: 'init',
          processed: 'processed',
          procured: 'procured',
          distributed: 'distributed'
        },
        scriptOverride: {
          github: {
            id: 'github',
            url: 'https://adnuntius.github.io/examples/adn/adn.src.js'
          },
          localhost: {
            id: 'localhost',
            url: 'http://localhost:8001/adn.src.js'
          },
          // https://developer.android.com/studio/run/emulator-networking
          andemu: {
            id: 'andemu',
            url: 'http://10.0.2.2:8001/adn.src.js'
          }
        },
        errorStatus: {
          noTarget: 'noTarget'
        },
        previewId: 'appPreviewId'
      },
      gTripTime = 0,
      gPrevTripTime = 0,
      gUseLocalStorage = true,
      gUseCookies = true,
      gWidgetSpecs = {},
      gRequestInfo = {},
      gEventListenerRegister = {},
      gAdLocs = {},
      gAdSpecs = {},
      gSectionSpecs = {},
      gGenObserverConfig = null,
      gViewableConfig = null,
      gVisibleConfig = null,
      gComposedAds = {},
      gWindowStats = {},
      gRequestFilterManager = {},
      gDevMode = false,
      AU_ID_REGEX = new RegExp('^[0-9A-Fa-f]{1,20}$'),
      EVENT_TYPE_LOAD = 'HANDLE_CHILD_PAGE_LOAD',
      SANDBOX_ATTRIBUTES = "allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation",
      RT_DATA_ATTR = 'data-response-token',
      EXTERNAL_CONTAINER_CLASS = 'adn-external-container',
      TOP_WINDOW_DATA_ATTR = 'data-parent-top',
      ENV_DATA_ATTR = 'data-env',
      DN_DATA_ATTR = 'data-dn',
      CONSOLE_DATA_ATTR = 'data-adn-console',
      IMP_REG_DATA_ATTR = 'data-imp-reg',
      MAX_AD_UNITS_PER_REQUEST = 50,
      SCRIPT_OVERRIDE_QSTRING = 'script-override',
      UNLOAD_EVENTS = ['visibilitychange', 'pagehide', 'beforeunload', 'unload'],
      SCRIPT_OVERRIDE_SERVER_QSTRING = 'script-server-override',
      BLOCK_REFRESH_QSTRING = 'block-refresh',
      DEBUG_UI_URL_STRING = "adndebug123",
      LOG_UI_URL_STRING = "adnlog123",
      DEBUG_UI_MAIN_DATA_DIV_ID = "adnDebugDataDiv",
      DEBUG_UI_DATA_DIV_PREFIX = "adn-data-div-",
      STORAGE_ADV_METADATA_KEY = "adn.metaData",
      STORAGE_CONV_METADATA_KEY = "adn.conv",
      STORAGE_DAT_KEY = "adn.data",
      VIEWABILITY_THRESHOLDS = [60, 70, 80, 90, 95, 100],
      STORAGE_DAT_SEGMENTS_KEY = "adn.data.segments",
      SYNC_BOUNDARY = 6 * 3600 * 1000, // 6 hours in milliseconds
      PICK_DATA_PARAMETERS = ['auId', 'widgetId', 'auW', 'auH', 'w', 'h', 'definedDims', 'resizeToContent', 'stack', 'ifrStyle', 'targetStyle', 'retAdsW', 'retAdsH', 'ads', 'dims', 'retAdCount', 'targetId', 'replacements', 'keywords', 'kv', 'userSegments', 'c', 'ps', 'auml', 'floorPrice', 'requestArgs', 'targetClass'],
      requestMethods,
      gScriptOverride,
      gShowWarning,
      gBlockRefresh,
      gRTokensCache = {},
      gLpLi,
      gLpC,
      gConsentString,
      gGdpr,
      gKeywords = [],
      gFeedback = {console: ENUMS.feedback.console.warnings, inScreen: ENUMS.feedback.inScreen.silent},
      gComposedRequest = ENUMS.composedRequest.noRequest;

    function LocalGlobalStorage() {
      var store = {};

      this.getItem = function(param) {
        return store[param];
      };

      this.setItem = function(param, value) {
        store[param] = value;
      };

      this.removeItem = function(param) {
        delete store[param];
      };
    }

    var gLocalStorage = new LocalGlobalStorage();

    adn.util = {
      dimension: function(value) {
        if (adn.util.isString(value)) {
          var theString = adn.util.trim(value);
          if (theString.length === 0 || adn.util.endsWith(theString, '%') || adn.util.endsWith(theString, 'px')) {
            return theString;
          }
          return theString + "px";
        }
        if (adn.util.isNumber(value)) {
          return value + "px";
        }
        return value;
      },
      isLoopable: function(item) {
        if (adn.util.isArray(item)) {
          return true;
        }
        var protoString = Object.prototype.toString.call(item);
        return protoString === '[object HTMLCollection]' || protoString === '[object NodeList]';
      },
      isArray: function(item) {
        if (Array.isArray) {
          return Array.isArray(item);
        }
        return Object.prototype.toString.call(item) === '[object Array]';
      },
      isObject: function(item) {
        return typeof item === 'object' && item !== null && !adn.util.isArray(item);
      },
      isInteger: function(value) {
        return parseInt(value, 10) === value;
      },
      isFlexiNumber: function(value) {
        return !isNaN(value);
      },
      isNumber: function(value) {
        return typeof value === 'number' && isFinite(value);
      },
      isString: function(item) {
        return typeof item === 'string';
      },
      isDefined: function(item) {
        return typeof item !== 'undefined' && item !== null;
      },
      isNotBlankString: function(item) {
        // here for backwards-compatibility
        return adn.util.isStringWithChars(item);
      },
      isStringWithChars: function(item) {
        return adn.util.isString(item) && adn.util.trim(item).length > 0;
      },
      isBlankString: function(item) {
        return adn.util.isString(item) && adn.util.trim(item).length === 0;
      },
      isFunction: function(method) {
        return Object.prototype.toString.call(method) === '[object Function]';
      },
      noop: function() {
      },
      hasLocalStorage: function() {
        if (gUseLocalStorage === false) {
          return false;
        }
        try {
          var storage = win.localStorage;
          var x = '__adn_storage_test__';
          storage.setItem(x, x);
          storage.removeItem(x);
          return true;
        } catch (e) {
          return false;
        }
      },
      uniques: function(arr) {
        var uniqArray = [];
        for (var i = 0, l = arr.length; i < l; i++) {
          if (uniqArray.indexOf(arr[i]) === -1 && arr[i] !== '') {
            uniqArray.push(arr[i]);
          }
        }
        return uniqArray;
      },
      isTopWindow: function() {
        return win.top === win || (win.location.host === 'localhost:9876');
      },
      trim: function(val) {
        if (!adn.util.isString(val)) {
          return val;
        }
        return String.prototype.trim ? val.trim() : val.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
      },
      getFrameElement: function() {
        if (!misc.canAccessLocalStorage()) {
          // safari throws a security error for sandboxed iframes that can't be caught.
          // hence, this, which works as a proxy for whether frameElement is available
          return;
        }
        try {
          return win.frameElement;
        } catch (e) {
          adn.out.devOutput("Error looking up frame element");
        }
      },
      endsWith: function(aString, endString) {
        return adn.util.isStringWithChars(aString) && adn.util.isStringWithChars(endString) && aString.substr(aString.length - endString.length, endString.length) === endString;
      },
      createDelegate: function(instance, method) {
        if ((!adn.util.isObject(instance) && instance !== null) || !adn.util.isFunction(method)) {
          return adn.out.output("Args not sufficient", "createDelegate", instance, method);
        }
        var outerArgs = Array.prototype.slice.call(arguments, 2);
        return function() {
          return method.apply(instance, outerArgs.length > 0 ? Array.prototype.slice.call(arguments, 0).concat(outerArgs) : arguments);
        };
      },
      detachEventListener: function(object, eventName, handler) {
        if (!adn.util.isObject(object) || !eventName) {
          return adn.out.output("Args not sufficient", "detachEventListener", object, eventName);
        }
        if (adn.util.isFunction(object.removeEventListener)) {
          return object.removeEventListener(eventName, handler, false);
        } else if (object.detachEvent) {
          return object.detachEvent('on' + eventName, handler);
        }
        return adn.out.output("Object to attach event listeners is not sufficient", "detachEventListener", object, eventName);
      },
      addEventListener: function(object, eventName, handler, type) {
        if (type) {
          gEventListenerRegister[type] = gEventListenerRegister[type] || [];
          gEventListenerRegister[type].push(handler);
        }
        if (!adn.util.isObject(object) || !eventName) {
          return adn.out.output("Args not sufficient", "addEventListener", object, eventName, handler);
        }
        if (adn.util.isFunction(object.addEventListener)) {
          return object.addEventListener(eventName, handler, false);
        } else if (object.attachEvent) {
          return object.attachEvent('on' + eventName, handler);
        }
        return adn.out.output("Object to attach event listeners is not sufficient", "addEventListener", object, eventName, handler);
      },
      getWindowDims: function() {
        // this is here for backwards-compatibility
        var winDims = adn.util.getWindowSize();
        return {
          w: winDims.width,
          h: winDims.height
        };
      },
      getWindowSize: function() {
        var windowSize = {
          width: 0,
          height: 0
        };
        if (adn.util.isNumber(win.innerWidth)) {
          windowSize.width = win.innerWidth;
          windowSize.height = win.innerHeight;
        } else if (doc.documentElement && (doc.documentElement.clientWidth || doc.documentElement.clientHeight)) {
          windowSize.width = doc.documentElement.clientWidth;
          windowSize.height = doc.documentElement.clientHeight;
        } else if (doc.body && (doc.body.clientWidth || doc.body.clientHeight)) {
          windowSize.width = doc.body.clientWidth;
          windowSize.height = doc.body.clientHeight;
        }
        return windowSize;
      },
      getScrollPos: function() {
        var scrollPos = {
          left: 0,
          top: 0
        };
        if (adn.util.isNumber(win.pageYOffset)) {
          scrollPos.top = win.pageYOffset;
          scrollPos.left = win.pageXOffset;
        } else if (doc.body && (doc.body.scrollLeft || doc.body.scrollTop)) {
          scrollPos.top = doc.body.scrollTop;
          scrollPos.left = doc.body.scrollLeft;
        } else if (doc.documentElement && (doc.documentElement.scrollLeft || doc.documentElement.scrollTop)) {
          scrollPos.top = doc.documentElement.scrollTop;
          scrollPos.left = doc.documentElement.scrollLeft;
        }
        return scrollPos;
      },
      getElementPosition: function(el) {
        var elementPos = {
          left: 0,
          top: 0
        };
        if (el.offsetParent) {
          do {
            elementPos.left += el.offsetLeft;
            elementPos.top += el.offsetTop;
            el = el.offsetParent;
          } while (el);
        }
        return elementPos;
      },
      getNewAjax: function(method, url, func) {
        if (adn.util.isDefined(win.XDomainRequest)) {
          // if XDomainRequest is defined and not IE10
          if (win.navigator.appVersion.indexOf("MSIE 10") === -1) {
            var ajaxIe = new win.XDomainRequest();
            ajaxIe.open(method, url);
            ajaxIe.contentType = "text/plain";
            ajaxIe.onerror = adn.util.noop;
            ajaxIe.ontimeout = adn.util.noop;
            ajaxIe.onprogress = adn.util.noop;
            ajaxIe.timeout = adn.util.noop;
            ajaxIe.onload = adn.util.noop;
            if (adn.util.isFunction(func)) {
              ajaxIe.onload = func;
            }
            return ajaxIe;
          }
        }
        var ajax = new XMLHttpRequest();
        ajax.open(method, url);
        ajax.setRequestHeader("Content-Type", "text/plain");
        if (adn.util.isFunction(func)) {
          ajax.onreadystatechange = func;
        }
        return ajax;
      },
      hasValue: function(collection, checkValue) {
        var hasValue = false;
        adn.util.forEach(collection, function(value) {
          if (value === checkValue) {
            hasValue = true;
            return false;
          }
        });
        return hasValue;
      },
      find: function(collection, callback) {
        if (!adn.util.isFunction(callback) || (!adn.util.isObject(collection) && !adn.util.isLoopable(collection)) || !adn.util.isDefined(collection)) {
          return adn.out.output("Args not sufficient", "find", collection, callback);
        }
        var foundElement = null;
        adn.util.forEach(collection, function(element, i) {
          if (callback.call(collection, element, i) === true) {
            foundElement = element;
            return false;
          }
        });
        return foundElement;
      },
      map: function(collection, callback) {
        if (!adn.util.isFunction(callback) || adn.util.isString(collection) || !adn.util.isDefined(collection)) {
          return adn.out.output("Args not sufficient", "map", collection, callback);
        }
        var els = [];
        adn.util.forEach(collection, function(element, i) {
          els.push(callback.call(collection, element, i));
        });
        return els;
      },
      filter: function(collection, callback) {
        if (!adn.util.isFunction(callback) || adn.util.isString(collection) || !adn.util.isDefined(collection)) {
          return adn.out.output("Args not sufficient", "filter", collection, callback);
        }
        var els = [];
        adn.util.forEach(collection, function(element, i) {
          if (callback.call(collection, element, i) === true) {
            els.push(element);
          }
        });
        return els;
      },
      forEach: function(collection, callback) {
        if (!adn.util.isFunction(callback) || (!adn.util.isObject(collection) && !adn.util.isLoopable(collection)) || !adn.util.isDefined(collection)) {
          return adn.out.output("Args not sufficient", "forEach", collection, callback);
        }
        var val;
        if (adn.util.isLoopable(collection)) {
          var len = collection.length;
          var collectionClone = [];
          for (var i = 0; i < len; i++) {
            collectionClone.push(collection[i]);
          }
          for (i = 0; i < len; i++) {
            val = collectionClone[i];
            if (callback.call(collectionClone, val, i) === false) {
              return val;
            }
          }
        } else {
          for (var prop in collection) {
            if (collection.hasOwnProperty(prop)) {
              val = collection[prop];
              if (callback.call(collection, val, prop) === false) {
                return val;
              }
            }
          }
        }
      },
      loadScriptElements: function(scriptContainer, scriptTargetId) {
        var elementsByTagName = scriptContainer.getElementsByTagName("script");
        adn.util.forEach(elementsByTagName, function(el) {
          if (!el) {
            return;
          }
          if (adn.util.isStringWithChars(el.type) && el.type !== "text/javascript") {
            adn.out.devOutput("Not executing script type", "showAdContent", el.type, el);
            return;
          }

          var allAttr = {};
          adn.util.forEach(el.attributes, function(attr) {
            if (attr.specified) {
              allAttr[attr.name] = attr.value;
            }
          });

          var innerHtml = el.innerHTML;
          var parentNode = el.parentNode;
          if (el.src) {
            var src = el.src;
            parentNode.removeChild(el);
            misc.loadScriptSrc(src, parentNode.id || scriptTargetId, allAttr, innerHtml);
          } else {
            parentNode.removeChild(el);
            misc.loadScriptContent(innerHtml, parentNode.id || scriptTargetId, allAttr);
          }
        });
      },
      hasProperties: function(obj) {
        if (!adn.util.isObject(obj)) {
          return false;
        }
        for (var prop in obj) {
          if (obj.hasOwnProperty(prop)) {
            return true;
          }
        }
        return false;
      },
      getElementDimensions: function(el) {
        try {
          var rect = el.getBoundingClientRect();
          var width = rect.width || rect.right - rect.left;
          var height = rect.height || rect.top - rect.bottom;
          return {
            w: width,
            h: height
          };
        } catch (e) {
          return adn.out.output("element dimensions failed", "getElementDimensions: catch block", e);
        }
      },
      isTrue: function(val) {
        return val === true || val === 'true';
      }
    };

    (function() {
      adn.out = {
        simple: function(message, args) {
          win.console.log("%cAdnuntius%c " + message, "background-color: purple; color: white; padding: 2px; border-radius: 3px;", "background-color: white; color: black; padding: 0", args);
        },
        devOutput: function(message, context) {
          if (gDevMode || gFeedback.console === ENUMS.feedback.console.all || gFeedback.console === ENUMS.feedback.console.allAndInfo) {
            return adn.out.output("(dev) " + message, context, Array.prototype.slice.call(arguments, 2));
          }
          return false;
        },
        infoOutput: function(message, context) {
          if (gDevMode || gFeedback.console === ENUMS.feedback.console.allAndInfo) {
            return adn.out.output("(dev) " + message, context, Array.prototype.slice.call(arguments, 2));
          }
          return false;
        },
        output: function(message, context) {
          if (gFeedback.console === ENUMS.feedback.console.silent) {
            return;
          }
          var allArgs = Array.prototype.slice.call(arguments, 2);
          var onErrors = adn.util.filter(allArgs, function(a) {
            return adn.util.isFunction(a);
          });
          var nextArgs = adn.util.filter(allArgs, function(a) {
            return !adn.util.isFunction(a);
          });
          var outputError = function(method, context, message) {
            method(context, message);
            adn.util.forEach(onErrors, function(errFunc) {
              errFunc({context: context, message: message, args: nextArgs});
            });
          };
          var outputArgs = function(method) {
            if (nextArgs && nextArgs.length) {
              adn.util.forEach(nextArgs, function(a, index) {
                if (adn.util.isFunction(a)) {
                  onErrors.push(a);
                } else {
                  method("Arg #" + index, a);
                }
              });
            }
          };
          if (!win.console || !win.console.warn || !win.console.error || !win.console.log) {
            return false;
          }

          if (adn.util.isObject(message) && message.lineNumber >= 0) {
            outputError(win.console.error, "At " + context + ":", message);
            outputArgs(win.console.log);
          } else {
            outputError(win.console.warn, "At " + context + ":", message);
            outputArgs(win.console.log);
          }
          return false;
        },
        warn: function(message) {
          if (gFeedback.console === ENUMS.feedback.console.silent) {
            return;
          }
          if (win.console && win.console.warn) {
            win.console.warn(message);
          }
        }
      };

      var setUpLocations = function(args, locType) {
        var server, protocol;

        var theEnvId = args.env || ENUMS.env.production.id;
        server = ENUMS.env[theEnvId] ? ENUMS.env[theEnvId] : ENUMS.env.production;
        var serverOverride = args.dn ? ENUMS.dn[locType || 'as'] + args.dn : false;

        var defaultProtocol = 'http' + ((misc.isTestAddress(win.location.href) || misc.isUnitTest() || theEnvId === ENUMS.env.localhost.id || (theEnvId !== ENUMS.env.production.id && win.location.protocol === 'http:')) ? '' : 's');
        protocol = (args.protocol === 'https' || args.protocol === 'http' ? args.protocol : defaultProtocol) + '://';

        var testEnv = misc.isTestAddress(theEnvId);
        gDevMode = testEnv || gDevMode;

        var hostAndUrl = serverOverride || server[locType || 'as'];
        if (theEnvId !== ENUMS.env.limited.id && args.subdomain) {
          hostAndUrl = args.subdomain + "." + hostAndUrl;
        }
        if (args.adServerHost) {
          hostAndUrl = args.adServerHost;
        }
        var serverUrlBase = gDevMode && (theEnvId || '').indexOf("http") === 0 ? theEnvId : protocol + hostAndUrl;
        return {
          serverUrlBase: serverUrlBase,
          baseRequestLoc: serverUrlBase + (testEnv ? "?" : "/i?") + "tzo=" + new Date().getTimezoneOffset(),
          isTestEnv: testEnv
        };
      };

      adn.lib = {
        setDevMode: function(modeValue) {
          gDevMode = modeValue === true;
        },
        testingHook: function(hook) {
          if (win.location.origin.indexOf('http://localhost') === 0) {
            gWidgetSpecs = {};
            gComposedAds = {};
            gAdSpecs = {};
            hook.adn = adn;
            hook.CONSTANTS = ENUMS;
            hook.ev = ev;
            hook.dom = dom;
            hook.readings = readings;
            hook.misc = misc;
            hook.conv = conv;
            hook.gComposedAds = gComposedAds;
            hook.gWidgetSpecs = gWidgetSpecs;
            hook.gLocalStorage = gLocalStorage;
            hook.gAdSpecs = gAdSpecs;
            hook.gAdLocs = gAdLocs;
            hook.gDevMode = gDevMode;
            hook.gKeywords = gKeywords;
            hook.storageMetadataKey = STORAGE_ADV_METADATA_KEY;
            hook.storageConversionKey = STORAGE_CONV_METADATA_KEY;
            hook.storageDataKey = STORAGE_DAT_KEY;
            hook.cookies = cookies;
            hook.parentMethods = parentMethods;
            hook.pFrameMethods = pFrameMethods;
            hook.requestMethods = requestMethods;
          }
        },
        isParentTopWindow: function() {
          var dataAttr = adn.inIframe.getIframeArgs()[TOP_WINDOW_DATA_ATTR];
          if (adn.util.isTrue(dataAttr)) {
            return true;
          }
          var bodyTag = doc.getElementsByTagName("body")[0];
          if (bodyTag && bodyTag.hasAttribute(TOP_WINDOW_DATA_ATTR)) {
            return adn.util.isTrue(bodyTag.getAttribute(TOP_WINDOW_DATA_ATTR));
          }
          var iframe = adn.util.getFrameElement();
          return adn.util.isDefined(iframe) ? adn.util.isTrue(iframe.getAttribute(TOP_WINDOW_DATA_ATTR)) : false;
        },
        getEnv: function() {
          var dataAttr = adn.inIframe.getIframeArgs()[ENV_DATA_ATTR];
          if (adn.util.isStringWithChars(dataAttr) && ENUMS.env[dataAttr]) {
            return ENUMS.env[dataAttr].id;
          }
          var bodyTag = doc.getElementsByTagName("body")[0];
          dataAttr = bodyTag ? bodyTag.getAttribute(ENV_DATA_ATTR) : '';
          if (adn.util.isStringWithChars(dataAttr) && ENUMS.env[dataAttr]) {
            return ENUMS.env[dataAttr].id;
          }
          var matchingEnv = misc.getEnvFromHref(misc.getParam(win.location, 'host'));
          if (matchingEnv) {
            return matchingEnv.id;
          }
          return ENUMS.env.production.id;
        },
        auPadStart: function(auId) {
          var reqLength = 16;
          if (auId.length >= reqLength) {
            return auId;
          }
          var prefix = "0".repeat(reqLength - auId.length);
          return prefix + auId;
        },
        getDn: function() {
          var dataAttr = adn.inIframe.getIframeArgs()[DN_DATA_ATTR];
          if (adn.util.isStringWithChars(dataAttr)) {
            return dataAttr;
          }
          var bodyTag = doc.getElementsByTagName("body")[0];
          dataAttr = bodyTag ? bodyTag.getAttribute(DN_DATA_ATTR) : '';
          if (adn.util.isStringWithChars(dataAttr)) {
            return dataAttr;
          }
        },
        getAdnDataLocs: function(aArgs) {
          var args = misc.clone(aArgs || {});
          args.protocol = 'https';

          var locations = setUpLocations(args, 'dt');
          var urlArgs = {};
          var qParams = ['browserId', 'folderId'];
          misc.copyArgValues(urlArgs, args, qParams);

          if (args.noCookies === true || args.useCookies === false || gUseCookies === false) {
            urlArgs.noCookies = true;
          }

          return {
            page: locations.baseRequestLoc.replace("/i?", "/page?") + misc.encodeAsUrlParams(urlArgs, true),
            visitor: locations.baseRequestLoc.replace("/i?", "/visitor?") + misc.encodeAsUrlParams(urlArgs, true),
            user: locations.baseRequestLoc.replace("/i?", "/usr?") + misc.encodeAsUrlParams(urlArgs, true),
            sync: locations.baseRequestLoc.replace("/i?", "/sync?") + misc.encodeAsUrlParams(urlArgs, true),
            segment: locations.baseRequestLoc.replace("/i?", "/segment?") + misc.encodeAsUrlParams(urlArgs, true)
          };
        },
        getRequestLocs: function(args, checkImmeasurable) {
          var locations = setUpLocations(args);

          var urlArgs = {};
          var qParams = ['network', 'usi', 'siteId', 'latitude', 'longitude', 'segments', 'uui'];
          misc.copyArgValues(urlArgs, args, qParams);
          var adUnitBlockCookies = false;
          if (args.adUnits && adn.util.isArray(args.adUnits)) {
            adUnitBlockCookies = !!adn.util.find(args.adUnits, function(au) {
              return au.useCookies === false;
            });
          }
          if (adUnitBlockCookies || args.noCookies === true || args.useCookies === false || gUseCookies === false) {
            urlArgs.noCookies = true;
          }
          if (checkImmeasurable && !adn.util.isTopWindow() && !misc.supportsIntersectionObserver()) {
            urlArgs.immeasurable = true;
          }
          var extraImpParams = {};
          var qpLpLi = misc.getPreviewLi();
          gShowWarning = !adn.util.isTrue(misc.getQueryParamsByName("adn-hide-warning"));
          if (adn.util.isStringWithChars(qpLpLi)) {
            extraImpParams.lpl = qpLpLi;
            var qpLpC = misc.getQueryParamsByName("adn-lp-c");
            if (adn.util.isStringWithChars(qpLpC)) {
              extraImpParams.lpc = qpLpC;
            }
          }
          if (gShowWarning && qpLpLi && adn.util.isTopWindow()) {
            var elemDiv = doc.createElement('div');
            elemDiv.id = "previewDiv";
            elemDiv.style.cssText = 'position:absolute;z-index:1000;background-color:pink;padding:10px;cursor: pointer';
            elemDiv.innerHTML = "<div onclick=\"document.getElementById('previewDiv').style.display='none';\">You are previewing ads delivered by Adnuntius. Previewed ads should have a message like this one in their top-left corner.</div>";
            doc.body.prepend(elemDiv);
            gLpLi = qpLpLi;
            gLpC = qpLpC;
          }
          if (win.URLSearchParams) {
            var params = new URLSearchParams(win.location.search);
            if (adn.util.isTrue(params.get("adn-params"))) {
              var keys = params.keys();
              var keyEntry;
              while ((keyEntry = keys.next()) && !keyEntry.done) {
                var val = params.get(keyEntry.value);
                if (keyEntry.value !== 'adn-params' && adn.util.isDefined(val)) {
                  extraImpParams[keyEntry.value] = val;
                }
              }
            }
          }
          return {
            imp: locations.baseRequestLoc + misc.encodeAsUrlParams(urlArgs, true) + (adn.util.hasProperties(extraImpParams) ? misc.encodeAsUrlParams(extraImpParams, true) : ""),
            rendered: locations.baseRequestLoc.replace("/i?", "/b?"),
            viewable: locations.baseRequestLoc.replace("/i?", "/v?"),
            attention: locations.baseRequestLoc.replace("/i?", "/f?"),
            visible: locations.baseRequestLoc.replace("/i?", "/s?"),
            custom: locations.baseRequestLoc.replace("/i?", "/u?"),
            retargeting: locations.baseRequestLoc.replace("/i?", "/r?"),
            conversion: locations.baseRequestLoc.replace("/i?", "/conv?"),
            click: locations.serverUrlBase + "/c/",
            preview: locations.serverUrlBase + (locations.isTestEnv ? "?" : "/preview?")
          };
        },
        sendRenderedImps: function(prTokens, renderedLoc, network) {
          if (!adn.util.isArray(prTokens)) {
            return adn.out.devOutput("No tokens to speak of", "sendRenderedImps", prTokens, renderedLoc);
          }
          var rTokens = adn.util.filter(prTokens, function(token) {
            return !gRTokensCache[token];
          });
          if (rTokens.length !== prTokens.length) {
            adn.out.devOutput("Block resending same response token multiple times", "sendRenderedImps", prTokens, rTokens);
          }
          if (rTokens.length < 1) {
            return false;
          }
          if (!renderedLoc || adn.util.isBlankString(renderedLoc)) {
            return adn.out.devOutput("Missing a location", "sendRenderedImps", rTokens, renderedLoc);
          }
          var renderedAndTimed = renderedLoc;
          if (gPrevTripTime !== gTripTime && gTripTime > 0) {
            gPrevTripTime = gTripTime;
            renderedAndTimed += "&tripTime=" + gTripTime;
          }
          if (win.screen && win.screen.availHeight) {
            if (!misc.isUnitTest()) {
              renderedAndTimed += misc.encodeAsUrlParams({screen: win.screen.availWidth + "x" + win.screen.availHeight}, true);
            }
          }
          var ajax = adn.util.getNewAjax("POST", renderedAndTimed, function() {
            if (ajax.readyState && ajax.readyState !== 4) {
              return false;
            }
            if ((!ajax.status || ajax.status === 200) && adn.util.isStringWithChars(ajax.responseText)) {
              var jsonResponse = {};
              try {
                jsonResponse = JSON.parse(ajax.responseText);
              } catch (e) {
                return adn.out.output(e, "ajax.onreadystatechange: catch block send event", ajax);
              }
              if (jsonResponse && jsonResponse.metaData) {
                cookies.writeAdvLs(jsonResponse.metaData, jsonResponse.network);
              }
            }
          });
          var data = {
            rts: rTokens
          };
          misc.setAndReturnMetaData(data, network);
          ajax.send(JSON.stringify(data));
          adn.util.forEach(rTokens, function(token) {
            gRTokensCache[token] = true;
          });
          return true;
        },
        doDebug: function(adUnitArgs, ifr, targetEl) {
          if (gLpLi && gShowWarning) {
            var hasPreview = adn.util.find(adUnitArgs.ads, function(ad) {
              return ad.lineItemId === gLpLi && (!gLpC || ad.creativeId === gLpC);
            });
            if (hasPreview) {
              var previewDiv = doc.createElement("div");
              previewDiv.style.cssText = "position:absolute;background-color:pink;padding:5px;z-index:10000;opacity:0.9;cursor:pointer";
              var divId = "div-preview-" + adUnitArgs.widgetId;
              previewDiv.id = divId;
              previewDiv.innerHTML = "<div onclick=\"document.getElementById('" + divId + "').style.display='none';\">Previewed Ad</>";
              ifr.parentNode.insertBefore(previewDiv, ifr);
              targetEl.style.position = "relative";
              return;
            }
          }
          if (gFeedback.inScreen === ENUMS.feedback.inScreen.inAdUnit) {
            var dataDiv = doc.createElement("div");
            dataDiv.id = DEBUG_UI_DATA_DIV_PREFIX + adUnitArgs.widgetId;
            var style = "position: absolute;top: 0; left: 0; text-align: left;";
            style += "border: 1px solid red; background-color: pink; padding: 5px;z-index: 10000;opacity: 0.9;";
            style += "min-width: 250px;max-width: " + Math.max(ifr.width, 350) + "px; max-height: 500px; overflow: auto";
            dataDiv.style.cssText = style;
            dataDiv.className = DEBUG_UI_MAIN_DATA_DIV_ID;

            var ads = [];
            adn.util.forEach(adUnitArgs.ads, function(ad) {
              ads.push({
                adId: ad.id,
                lineItemId: ad.lineItemId,
                creativeId: ad.creativeId,
                cost: ad.cost ? ad.cost.amount + ad.cost.currency : 'n/a',
                bid: ad.bid ? ad.bid.amount + ad.bid.currency : 'n/a'
              });
            });

            var output = "<div style='min-height: 1em;height:auto;'>AU Tag id: <a target='_blank' href='https://admin.adnuntius.com/search?q=" + adUnitArgs.auId + "'>" + adUnitArgs.auId + "</a></strong></div>";
            output += "<div style='padding-bottom: 2px; margin-bottom: 2px; border-bottom: 1px dashed #333;height:auto'><small>";
            adn.util.forEach(adUnitArgs.requestArgs, function(val, key) {
              if (key === 'adUnits') {
                var thisAdUnit = adn.util.find(val, function(v) {
                  return v.auId === adUnitArgs.auId && (!v.targetId || v.targetId === adUnitArgs.targetId) && (!v.targetClass || v.targetClass === adUnitArgs.targetClass);
                });
                if (thisAdUnit) {
                  adn.util.forEach(thisAdUnit, function(auVal, auKey) {
                    if (auKey === 'auId') {
                      return;
                    }
                    output += misc.dataOutput(auKey, auVal);
                  });
                }
                return;
              } else if (key === 'userId') {
                return;
              }
              if (key === 'headerBids' && adn.util.isArray(val)) {
                output += misc.dataOutput(key, val.length + " -- see more in console");
                adn.out.output("headerBids passed on", "debugger", val);
              } else {
                output += misc.dataOutput(key, val);
              }
            });
            var idsAsObj = cookies.getIdsAsObj(adUnitArgs);
            if (idsAsObj.userId) {
              output += misc.dataOutput('userId', idsAsObj.userId);
            }
            output += "</small></div>";
            if (ads.length === 0) {
              output += "<div><strong>No ads returned for ad call</strong></div>";
            }
            adn.util.forEach(ads, function(ad) {
              output += "<div style='min-height: 1em;height: auto;'>LI: <a target='_blank' href='http://admin.adnuntius.com/line-items/line-item/" + ad.lineItemId + "'>" + ad.lineItemId + "</a>" +
                " | Cr: <a target='_blank' href='http://admin.adnuntius.com/creatives/creative/" + ad.creativeId + "'>" + ad.creativeId + "</a>" +
                " | cost: " + ad.cost + " | bid: " + ad.bid + "</div>";
            });
            output += "<div style='height:auto;'><small>";
            adn.util.forEach(['Segments', 'Keywords'], function(key) {
              var adUnitKey = "returned" + key;
              if (adUnitArgs[adUnitKey] && adUnitArgs[adUnitKey].length > 0) {
                output += misc.dataOutput(key.toLowerCase(), adUnitArgs[adUnitKey]);
              }
            });
            output += "</small></div>";
            dataDiv.innerHTML = output;
            ifr.parentNode.insertBefore(dataDiv, ifr);
            targetEl.style.border = "2px solid red";
            targetEl.style.position = "relative";
          }
        },
        showAdContent: function(adUnitArgs, adData) {
          var targetEl = misc.getDocEl(adUnitArgs);
          var c = gComposedAds[adUnitArgs.targetId];
          if (!targetEl) {
            if (c) {
              c.errorStatus = ENUMS.errorStatus.noTarget;
            }
            adn.out.output("Unable to find HTML element", "showAdContent", c, adUnitArgs);
            return adn.out.warn("Unable to find HTML element on page with the following id: " + adUnitArgs.targetId);
          }
          if (c) {
            c.errorStatus = '';
          }

          if (adn.util.isTrue(adUnitArgs.clearTarget)) {
            targetEl.innerHTML = "";
          }
          var adContent = adData.html;
          var matchedAdCount = adData.matchedAdCount;

          var showInDivRequest = adUnitArgs.container === ENUMS.container.div && adn.util.isNumber(matchedAdCount);
          var showInDivCheck = showInDivRequest || ((adContent.indexOf("data-ad-format=\"") > 0 && adContent.indexOf("adsbygoogle.js") > 0)); // this is for responsive google ads, which must be put into a div
          var showInDiv = showInDivCheck && (adn.util.filter(ENUMS.syncAds, function(syncAdString) {
            // ads that are synchronous need to be put inside an iframe -- so skip DIV.
            return adContent.indexOf(syncAdString) > 0;
          })).length === 0;
          if (showInDiv) {
            adUnitArgs.container = ENUMS.container.div;
            if (targetEl.getElementsByTagName("div").length > 0) {
              if (adn.util.isObject(adUnitArgs.refresh)) {
                targetEl.innerHTML = "";
              } else {
                return;
              }
            }
            dom.showTargetDiv(targetEl, adUnitArgs);
            targetEl.innerHTML = misc.getAdContentOnly(adContent, adUnitArgs.widgetId);
            adn.util.loadScriptElements(targetEl, adUnitArgs.widgetId);

            adn.lib.doDebug(adUnitArgs, doc.getElementById(adUnitArgs.widgetId), targetEl);
            return true;
          }
          adUnitArgs.container = ENUMS.container.iframe;
          // foundIframeContainer protects against double rendering
          var foundIframeContainer = adn.util.find(targetEl.childNodes, function(node) {
            return node.id === adUnitArgs.widgetId;
          });
          if (!foundIframeContainer) {
            var otherWidgets = adn.util.filter(targetEl.childNodes, function(node) {
              var nodeId = node ? node.id : "";
              return nodeId && nodeId.indexOf(ENUMS.widgetIdPrefix) === 0;
            }) || [];

            adUnitArgs.serverUrl = null;
            var ifr = dom.insIframe(adUnitArgs, targetEl);
            var scriptOverride = misc.getAndSetScriptOverride();
            if (scriptOverride && adContent.indexOf(scriptOverride) < 0) {
              adContent = adContent.replace(/<script src="?https?:\/\/[A-Za-z_0-9:.-]{5,50}\/adn.(src.)?js"?><\/script>/g, "<script src=\"" + scriptOverride + "\" id=\"" + DEV_SCRIPT_ID + "\"></script>");
            }
            if (adUnitArgs.isolateSubFrame) {
              adContent = adContent.replace(/<iframe/g, "<iframe sandbox='" + SANDBOX_ATTRIBUTES + "'");
            }

            var bodyReplace = "<body id='" + adUnitArgs.widgetId + "' " + TOP_WINDOW_DATA_ATTR + "='" + adn.util.isTopWindow() + "'";
            if (adUnitArgs.env && adUnitArgs.env !== ENUMS.env.production.id) {
              bodyReplace += " " + ENV_DATA_ATTR + "='" + adUnitArgs.env + "'";
            }
            if (adUnitArgs.impReg) {
              bodyReplace += " " + IMP_REG_DATA_ATTR + "='" + adUnitArgs.impReg + "'";
            }
            if (adUnitArgs.dn) {
              bodyReplace += " " + DN_DATA_ATTR + "='" + adUnitArgs.dn + "'";
            }
            adContent = adContent.replace("<body", bodyReplace);

            if (misc.supportsSrcDoc() && adUnitArgs.isolateFrame) {
              ifr.setAttribute("srcdoc", adContent);
            } else {
              var iframeDoc = ifr.contentDocument || ifr.contentWindow;
              if (iframeDoc && iframeDoc.document) {
                iframeDoc = iframeDoc.document;
              }
              if (!iframeDoc) {
                adn.out.devOutput("Couldn't find iframeDoc", "showAdContent", targetEl, ifr, iframeDoc);
              }
              iframeDoc.open();
              iframeDoc.write(adContent);
              iframeDoc.close();
            }

            adn.util.forEach(otherWidgets, function(el) {
              el.style.display = "none";
            });

            adn.lib.doDebug(adUnitArgs, ifr, targetEl);

            return true;
          }
        }
      };
    }());

    var misc;
    (function() {
      var ALPHABET = '012356789bcdfghjklmnpqrstvwxyz',
        ID_LENGTH = 24;

      misc = {
        uuid: function() {
          var rtn = '';
          for (var i = 0; i < ID_LENGTH; i++) {
            rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
          }
          return rtn;
        },
        updateSrc: function(args, src, targetingAlreadyDone) {
          if (args.lineItemId) {
            src += misc.encodeAsUrlParams({lineItemId: args.lineItemId}, true);
          } else if (args.creativeSetId) {
            src += misc.encodeAsUrlParams({creativeSetId: args.creativeSetId}, true);
          } else if (args.orderId) {
            src += misc.encodeAsUrlParams({orderId: args.orderId}, true);
          }
          if (args.creativeId) {
            src += misc.encodeAsUrlParams({creativeId: args.creativeId}, true);
          }
          if (args.targeting) {
            src += misc.encodeAsUrlParams({targeting: args.targeting}, true);
          }

          if (!targetingAlreadyDone) {
            var targetingParamsObj = {};
            misc.copyArgValues(targetingParamsObj, args, ['auml', 'ps', 'c']);
            if (args.keywords) {
              targetingParamsObj.keywords = args.keywords.slice(0, 20);
            }
            if (args.kv) {
              // need this here because the kv needs to be an array that is stringified as an array
              targetingParamsObj.kv = JSON.stringify(args.kv);
            }
            if (args.replacements) {
              // need this here because the replacements needs to be an array that is stringified as an array
              targetingParamsObj.replacements = JSON.stringify(args.replacements);
            }
            if (args.userSegments) {
              // need this here because the userSegments needs to be an array that is stringified as an array
              targetingParamsObj.userSegments = JSON.stringify(args.userSegments);
            }
            src += misc.encodeAsUrlParams(targetingParamsObj, true);
          }

          if (args.dimensions) {
            src += misc.encodeAsUrlParams({dimensions: JSON.stringify(args.dimensions)}, true);
          }
          src += misc.encodeAsUrlParams({cb: encodeURIComponent(misc.uuid())}, true);
          if (args.clickTrackingUrlEsc) {
            src += "&clickTrackingUrlEsc=" + args.clickTrackingUrlEsc;
          } else if (args.clickTrackingUrl) {
            var alreadyEscapedIndicator = args.clickTrackingUrl.indexOf("%3A%2F");
            src += "&clickTrackingUrlEsc=" + (args.clickTrackingUrl.indexOf("http") === 0 ? (alreadyEscapedIndicator > 3 && alreadyEscapedIndicator < 8 ? args.clickTrackingUrl : encodeURIComponent(args.clickTrackingUrl)) : "");
          }
          return src;
        },
        supportsSrcDoc: function() {
          return ("srcdoc" in doc.createElement("iframe"));
        },
        isSrcdocFrame: function() {
          return misc.getLocationHref() === "about:srcdoc" || win.location.origin === "null";
        },
        getLocationHref: function() {
          return win.location.href;
        },
        canAccessLocalStorage: function() {
          try {
            win.localStorage.getItem("random");
            return true;
          } catch (e) {
            return false;
          }
        },
        getImpReg: function() {
          var dataAttr = adn.inIframe.getIframeArgs()[IMP_REG_DATA_ATTR];
          if (adn.util.isStringWithChars(dataAttr)) {
            return dataAttr;
          }
          var bodyTag = doc.getElementsByTagName("body")[0];
          if (bodyTag && bodyTag.hasAttribute(IMP_REG_DATA_ATTR)) {
            return bodyTag.getAttribute(IMP_REG_DATA_ATTR);
          }
          var iframe = adn.util.getFrameElement();
          return adn.util.isDefined(iframe) ? iframe.getAttribute(IMP_REG_DATA_ATTR) : undefined;
        },
        supportsIntersectionObserver: function() {
          // don't check for isIntersecting because of bug in Edge 15. See more in intersection-polyfill.js.
          return 'IntersectionObserver' in win &&
            'IntersectionObserverEntry' in win &&
            'intersectionRatio' in win.IntersectionObserverEntry.prototype;
        },
        getParam: function(aObj, aParam) {
          if (adn.util.isObject(aObj)) {
            return aObj[aParam];
          }
        },
        getNewViewability: function() {
          return {
            maxPercent: 0,
            prevPercent: 0,
            timeNone: 0,
            timePartly: 0,
            timeHalf: 0,
            timeFully: 0,
            timeIntersect: 0,
            timeStart: 0,
            isViewed: false
          };
        },
        onDocReady: function(fn) {
          if (doc.readyState === "complete" || doc.readyState === "interactive") {
            fn();
          } else {
            adn.util.addEventListener(win, 'DOMContentLoaded', fn);
          }
        },
        onLoad: function(fn) {
          if (doc.readyState === "complete") {
            fn();
          } else {
            adn.util.addEventListener(win, 'load', fn);
          }
        },
        getAdsFromContainer: function(adsDivEl) {
          return adn.util.filter(adsDivEl.getElementsByTagName("div"), function(el) {
            return el.className.indexOf(ENUMS.cwClass) > -1 && (el.id.indexOf(ENUMS.adIdPrefix) === 0);
          });
        },
        isVisible: function(el) {
          return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
        },
        generateAdData: function(args, info, adSpecs) {
          if (args && args.ads) {
            return args.ads;
          }
          if (!info || !info.ads || !adSpecs) {
            return [];
          }
          return adn.util.map(info.ads, function(a) {
            var prevAdSpec = adSpecs[a.id];
            return {
              adId: a.id,
              dims: a.dims,
              creativeId: a.creativeId,
              rt: a.rt,
              lineItemId: a.lineItemId,
              isPrebid: a.isPrebid,
              definedDims: prevAdSpec ? prevAdSpec.definedDims : a.definedDims
            };
          });
        },
        getAdsInfo: function(containerId) {
          var info = {
            contentDims: {},
            definedDims: {},
            adUnitContainerId: containerId,
            adServerHost: "",
            ads: []
          };
          try {
            info.adsDivEl = doc.getElementById(containerId);
            if (!info.adsDivEl.hasAttribute("data-au-id")) {
              info.adsDivEl = info.adsDivEl.querySelector("[data-au-id]");
            }
            if (!info.adsDivEl) {
              return {};
            }
            info.contentDims = adn.util.getElementDimensions(info.adsDivEl);
            info.adServerHost = info.adsDivEl.getAttribute("data-adserver-host");
            info.network = info.adsDivEl.getAttribute("data-network");
            if (info.contentDims.w === 0 || info.contentDims.h === 0) {
              var wonkyPositionCheck = adn.util.find(adn.util.map(info.adsDivEl.getElementsByTagName("div"), function(div) {
                if (div.style && (div.style.position === 'absolute' || div.style.position === 'fixed')) {
                  var divDims = adn.util.getElementDimensions(div);
                  if (divDims.w > 5 && divDims.h > 5) {
                    return divDims;
                  }
                }
                return null;
              }), function(val) {
                return !!val;
              });
              if (wonkyPositionCheck) {
                info.contentDims = wonkyPositionCheck;
                adn.out.infoOutput("Dims for out-of-flow div", "getAdsInfo", wonkyPositionCheck, containerId);
              }
            }
            info.definedDims = {w: 0, h: 0};
            info.auId = info.adsDivEl.getAttribute("data-au-id");
            info.ads = adn.util.map(misc.getAdsFromContainer(info.adsDivEl), function(a) {
              var width = misc.dimForAttr(a.getAttribute("data-creative-width"));
              var height = misc.dimForAttr(a.getAttribute("data-creative-height"));
              info.definedDims.w += width;
              info.definedDims.h += height;
              return {
                id: a.id,
                el: a,
                subdomain: misc.dimForAttr(a.getAttribute("data-subdomain")),
                creativeId: misc.dimForAttr(a.getAttribute("data-creative-id")),
                lineItemId: misc.dimForAttr(a.getAttribute("data-line-item-id")),
                rt: misc.dimForAttr(a.getAttribute("data-response-token")),
                definedDims: {w: width, h: height},
                dims: adn.util.getElementDimensions(a)
              };
            });
            var foundSubdomain = adn.util.find(info.ads, function(a) {
              return !!a.subdomain;
            });
            if (foundSubdomain) {
              info.subdomain = foundSubdomain.subdomain;
            }
          } catch (e) {
            info.contentDims = {};
          }
          return info;
        },
        loadScriptSrc: function(src, targetElOrTargetId, attrs, innerHtml) {
          if (!adn.util.isString(src)) {
            return adn.out.output("src should be a string", "loadScriptSrc", src);
          }
          try {
            var scriptEl = doc.createElement('script');
            adn.util.forEach(attrs || [], function(attrValue, attrKey) {
              scriptEl.setAttribute(attrKey, attrValue);
            });
            if (adn.util.isStringWithChars(innerHtml)) {
              scriptEl.innerHTML = innerHtml;
            }
            scriptEl.src = src;

            var scriptElContainer = adn.util.isStringWithChars(targetElOrTargetId) ? doc.getElementById(targetElOrTargetId) : targetElOrTargetId;
            if (scriptElContainer) {
              scriptElContainer.appendChild(scriptEl);
            } else {
              var targetEl = doc.getElementsByTagName('script')[0];
              targetEl.parentNode.insertBefore(scriptEl, targetEl);
            }
          } catch (e) {
            return adn.out.output(e, "loadScriptSrc: in catch block");
          }
        },
        dimForAttr: function(value) {
          if (adn.util.isString(value)) {
            var theString = adn.util.trim(value);
            var number = parseInt(theString, 10);
            if (adn.util.endsWith(theString, 'px')) {
              return number;
            } else if (number.toString(10) === theString) {
              return number;
            }
            return value;
          }
          if (adn.util.isNumber(value)) {
            return value;
          }
          return "";
        },
        addWidgetIdToProcessAd: function(htmlData, newWidgetId) {
          var jsString = "adn.inIframe.processAdResponse({";
          var replaceJsString = jsString + " widgetId: '" + newWidgetId + "', ";
          var replaceJsIframeIdString = "adn.inIframe.getIframeId(\"" + newWidgetId + "\"";
          // can't use RegExp here because of poor browser support
          return htmlData.replace(/adn.inIframe.processAdResponse\({/g, replaceJsString).replace(/adn.inIframe.getIframeId\(/g, replaceJsIframeIdString);
        },
        loadScriptContent: function(content, targetId, attributes) {
          if (!adn.util.isString(content)) {
            return adn.out.output("content should be a string", "loadScriptContent", content);
          }
          try {
            var scriptEl = doc.createElement('script');

            adn.util.forEach(attributes || {}, function(value, key) {
              scriptEl.setAttribute(key, value);
            });

            var scriptContent = doc.createTextNode(content);
            scriptEl.appendChild(scriptContent);
            var targetEl = doc.getElementById(targetId) || doc.body;
            targetEl.appendChild(scriptEl);
          } catch (e) {
            return adn.out.output(e, "loadScriptContent: in catch block");
          }
        },
        applyStyle: function(element, style) {
          return adn.util.forEach(style, function(val, prop) {
            element.style[prop] = val;
          });
        },
        parseHashArgs: function(url) {
          var getHashFragment = function() {
            // FireFox decodes its URL value when you try to read it, and it becomes impossible to parse as a URL afterwards.
            // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1093611
            var href = url || win.location.href || '';
            var hashIndex = href.indexOf('#');
            return (hashIndex > -1) ? href.substr(hashIndex + 1) : '';
          };
          return misc.decodeUrlEncodedPairs(getHashFragment());
        },
        parseUrlArgs: function(url) {
          return misc.decodeUrlEncodedPairs(url || win.location.search);
        },
        clone: function(item) {
          var baseObject = adn.util.isObject(item) ? {} : adn.util.isArray(item) ? [] : null;
          return baseObject ? misc.assign(baseObject, item) : item;
        },
        assign: function(target, source) {
          var assignArray = function(target, source) {
            for (var i = 0; i < source.length; i++) {
              target.push(misc.clone(source[i]));
            }
            return target;
          };

          adn.util.forEach(source, function(lVal, lProp) {
            if (adn.util.isObject(lVal)) {
              if (!adn.util.isObject(target[lProp])) {
                target[lProp] = {};
              }
              misc.assign(target[lProp], lVal);
            } else if (adn.util.isArray(lVal)) {
              if (!adn.util.isArray(target[lProp])) {
                target[lProp] = [];
              }
              assignArray(target[lProp], lVal);
            } else {
              target[lProp] = lVal;
            }
          });
          return target;
        },
        isWidgetId: function(args) {
          var widgetInfo = adn.util.isString(args) ? args : misc.getParam(args, 'widgetId');
          return adn.util.isString(widgetInfo) && widgetInfo.indexOf(ENUMS.widgetIdPrefix) === 0;
        },
        copyArgValues: function(dest, source, params) {
          if (!adn.util.isArray(params) || !adn.util.isObject(dest) || !adn.util.isObject(source)) {
            return adn.out.output("Args not sufficient", "copyArgValues", dest, source, params);
          }
          adn.util.forEach(source, function(value, param) {
            if (adn.util.isDefined(value) && adn.util.hasValue(params, param)) {
              dest[param] = misc.clone(value);
            }
          });
          return dest;
        },
        decodeUrlEncodedPairs: function(urlEncodedPairs) {
          if (!adn.util.isString(urlEncodedPairs)) {
            return adn.out.output("urlEncodedPairs should be a string", "decodeUrlEncodedPairs");
          }
          var object = {};
          var pairs = urlEncodedPairs.replace(/\?/, '').replace(/#/, '').split('&');
          for (var i = 0; i < pairs.length; i++) {
            var pairElements = pairs[i].split('=');
            if (pairElements.length === 2) {
              var name = decodeURIComponent(pairElements[0]);
              var value = decodeURIComponent(pairElements[1]);

              if (adn.util.isDefined(object[name])) { // Check if we already have a value for this name
                if (!adn.util.isArray(object[name])) { // If so, convert to array if not already an array
                  object[name] = [object[name]];
                }
                object[name].push(value);
              } else {
                object[name] = value;
              }
            }
          }
          return object;
        },
        combineArgs: function() {
          var allArgs = {},
            argLength = arguments.length;
          for (var i = 0; i < argLength; i++) {
            var theArg = arguments[i];
            if (adn.util.isObject(theArg)) {
              misc.assign(allArgs, arguments[i]);
            }
          }
          return allArgs;
        },
        getPreviewLi: function() {
          return misc.getQueryParamsByName("adn-lp-li");
        },
        getQueryParamsByName: function(aQp) {
          if (!adn.util.isString(aQp) || adn.util.isBlankString(aQp)) {
            return null;
          }
          var url = misc.getLocationHref();
          var qp = aQp.replace(/[[\]]/g, "\\$&");
          var regex = new RegExp("[?&]" + qp + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
          if (!results) {
            return null;
          }
          return !results[2] ? '' : decodeURIComponent(results[2].replace(/\+/g, " "));
        },
        encodeAsUrlParams: function(obj, prefixFirst) {
          if (adn.util.isString(obj)) {
            return obj;
          }
          var pairs = [];
          adn.util.forEach(obj, function(val, prop) {
            var encodedPropEquals = encodeURIComponent(prop) + '=';
            if (adn.util.isArray(val)) {
              adn.util.forEach(val, function(v) {
                pairs.push(encodedPropEquals + encodeURIComponent(adn.util.isObject(v) ? JSON.stringify(v) : v));
              });
            } else if (adn.util.isObject(val)) {
              pairs.push(encodedPropEquals + encodeURIComponent(JSON.stringify(val)));
            } else {
              if ((adn.util.isDefined(val) && !adn.util.isBlankString(val))) {
                pairs.push(encodedPropEquals + encodeURIComponent(val));
              }
            }
          });
          if (pairs.length === 0) {
            return '';
          }
          var urlParams = pairs.join('&');
          return prefixFirst ? '&' + urlParams : urlParams;
        },
        isAdnPrice: function(data) {
          return adn.util.isObject(data) && adn.util.isNumber(data.amount) && data.amount > 0 && adn.util.isString(data.currency) && data.currency.length === 3;
        },
        postMessageToParent: function(msgObject) {
          if (msgObject && msgObject.isDivContainer) {
            return ev.handlePostMessage(msgObject);
          }
          if (!adn.util.isObject(win.parent) || !win.parent.postMessage || !adn.util.isObject(msgObject)) {
            return adn.out.output("Attributes not sufficient", "postMessageToParent");
          }
          msgObject[ENUMS.postMessageSrcKey] = ENUMS.postMessageSrcValue;
          win.parent.postMessage(JSON.stringify(msgObject), '*');
        },
        visibilityEventHandling: function(callbackProp, widgetSpec) {
          if (adn.util.isObject(widgetSpec.refresh) && callbackProp === widgetSpec.refresh.event && widgetSpec.refresh.count > 0 && !gBlockRefresh) {
            win.setTimeout(function() {
              var requestData = widgetSpec.parentArgs || {};
              var auData = misc.clone(widgetSpec.auArgs);
              auData.refresh = misc.clone(widgetSpec.refresh);
              auData.refresh.count--;
              requestData.requestParams = {}; // reset request params because previous call should have used the request params, not the new one
              auData.requestParams = {}; // reset request params because previous call should have used the request params, not the new one
              requestData.adUnits = [auData];
              delete requestData.headerBids; // don't reuse headerBids
              adn.request(requestData);
            }, widgetSpec.refresh.delay * 1000);
          }
          var dataFromSpec = widgetSpec[callbackProp + 'Data'];
          if (widgetSpec[callbackProp] && adn.util.isFunction(widgetSpec[callbackProp])) {
            widgetSpec[callbackProp](dataFromSpec);
          }
          var dataDiv = doc.getElementById(DEBUG_UI_DATA_DIV_PREFIX + widgetSpec.widgetId);
          if (dataDiv && dataFromSpec.feedbackText) {
            var extrasString = (dataFromSpec.attention || []).join(", ");
            var suffix = extrasString ? " - " + extrasString : "";
            dataDiv.innerHTML += "<div><small>" + dataFromSpec.feedbackText + " sent - " + dataFromSpec.creativeId + suffix + "</small></div>";
          }
        },
        postMessageToChild: function(childFrame, msgObject) {
          if (!adn.util.isObject(msgObject)) {
            return adn.out.output("Expected an object for a message", "postMessageToChild", msgObject);
          }
          if (adn.util.isTrue(msgObject.isDivContainer)) {
            return ev.handlePostMessage(msgObject);
          }
          if (!childFrame || !childFrame.contentWindow) {
            return adn.out.output("Childframe isn't really a child frame", "postMessageToChild", childFrame, msgObject);
          }
          if (!childFrame.contentWindow.postMessage) {
            return adn.out.output("Childframe doesn't support postMessage", "postMessageToChild", childFrame, msgObject);
          }
          msgObject[ENUMS.postMessageSrcKey] = ENUMS.postMessageSrcValue;
          childFrame.contentWindow.postMessage(JSON.stringify(msgObject), childFrame.src || '*');
        },
        dataOutput: function(key, val) {
          return key + ": " + (adn.util.isObject(val) || adn.util.isArray(val) ? JSON.stringify(val) : val) + " | ";
        },
        ampCheck: function(args, size) {
          if (args && args.mode === 'amp' && win.context && adn.util.isFunction(win.context.renderStart)) {
            if (size && size.width === 0) {
              win.context.noContentAvailable();
            } else {
              win.context.renderStart(size || undefined);
            }
          }
        },
        getUnixTimestamp: function(addDays, asMinutes) {
          var multiplication = addDays / (asMinutes ? 1440 : 1);
          return Date.now() + (adn.util.isNumber(addDays) && addDays > 0 ? (1000 * 60 * 60 * 24 * multiplication) : 0);
        },
        getDocEl: function(specs) {
          if (specs.targetClass) {
            var elements = doc.getElementsByClassName(specs.targetClass);
            var selEl = adn.util.find(elements, function(el) {
              return !el.hasChildNodes();
            });
            return selEl || elements[0];
          }
          if (specs.duplicateId) {
            var theIds = doc.querySelectorAll("*[id='" + specs.targetId + "']");
            var theEl = adn.util.find(theIds, function(el) {
              return !el.hasChildNodes();
            });
            return theEl || theIds[0];
          }
          return doc.getElementById(specs.targetId) || (specs.altTargetId ? doc.getElementById(specs.altTargetId) : null);
        },
        isTestAddress: function(loc) {
          if (adn.util.isString(loc) && loc.indexOf("http://localhost") === 0 && loc.indexOf("/test") > 0) {
            gDevMode = true;
            return true;
          }
          return false;
        },
        isUnitTest: function() {
          return win.location.href.indexOf("http://localhost:9876/context.html") > -1;
        },
        getEnvFromHref: function(url) {
          if (!url || !adn.util.isString(url)) {
            return;
          }
          return adn.util.find(ENUMS.env, function(env) {
            // need a false here to stop the repeated checking
            return url === env.as || url.indexOf('://' + env.as) > 0;
          });
        },
        getAdContentOnly: function(adContent, newWidgetId) {
          var adnResponseString = "<div id=\"adn-rsp-";
          var endString = "</body>";
          var adnResponseStringIndex = adContent.indexOf(adnResponseString);
          var endStringIndex = adContent.indexOf(endString);
          if (adnResponseStringIndex < 1 || endStringIndex < 1) {
            if (adContent.indexOf(ENUMS.nativeClass) > -1) {
              var adContentWithWidgetId = "<div id=\"" + newWidgetId + "\">" + adContent + "</div>";
              return misc.addWidgetIdToProcessAd(adContentWithWidgetId, newWidgetId);
            }
            adn.out.output("Something unexpected has gone on with the content of the ad server response", "getAdContentOnly", endString, endStringIndex, adContent);
            return;
          }
          var htmlAdContentOnly = adContent.substring(adnResponseStringIndex, endStringIndex);
          htmlAdContentOnly = "<div id=\"" + newWidgetId + "\">" + htmlAdContentOnly + "</div>";
          return misc.addWidgetIdToProcessAd(htmlAdContentOnly, newWidgetId);
        },
        gatherDataParams: function(aDataSrc, aFilterCb, aCb, deleteFromObj) {
          var data = [],
            objParams = {},
            filterCb = adn.util.isFunction(aFilterCb) ? aFilterCb : function() {
              return true;
            },
            cb = adn.util.isFunction(aCb) ? aCb : adn.util.noop,
            deleteMeObj = deleteFromObj || {};
          var theKeys = ['auId', 'creativeId', 'targetId', 'c', 'kv', 'keywords', 'replacements', 'ps', 'auml', 'floorPrice', 'dimensions'];
          var theCreativeTagKeys = ['lineItemId', 'creativeId', 'clickTrackingUrl', 'creativeSetId', 'orderId', 'targeting', 'kv', 'c', 'keywords', 'auml', 'ps', 'replacements', 'dimensions'];
          var objectKeys = [{server: 'userSegments', script: 'userSegments'}, {server: 'context', script: 'ctx'}, {server: 'canonical', script: 'canonical'}];
          adn.util.forEach(aDataSrc, function(a) {
            if (a.lineItemId || a.creativeSetId || a.orderId) {
              a.creativeTag = true;
            }
            if (filterCb(a) === true) {
              var params = {};
              adn.util.forEach(theKeys, function(key) {
                params[key] = a[key];
              });
              if (a.lineItemId || a.creativeSetId || a.orderId) {
                adn.util.forEach(theCreativeTagKeys, function(key) {
                  params[key] = a[key];
                });
                params.creativeTag = true;
              }
              if (a.floorPrice && !misc.isAdnPrice(a.floorPrice)) {
                adn.out.output("Floor price is not valid", "gatherDataParams", a);
                delete params.floorPrice;
              }
              data.push(params);
              adn.util.forEach(objectKeys, function(key) {
                objParams[key.server] = objParams[key.server] || a[key.script];
              });
              cb(a);
            }
          });
          adn.util.forEach(theKeys, function(key) {
            delete deleteMeObj[key];
          });
          adn.util.forEach(objectKeys, function(oKey) {
            delete deleteMeObj[oKey.server];
            delete deleteMeObj[oKey.script];
          });
          return {
            adUnits: adn.util.filter(data, function(a) {
              return !a.lineItemId && !a.creativeSetId && !a.orderId;
            }),
            creativeTags: adn.util.filter(data, function(a) {
              return !!a.lineItemId || !!a.creativeSetId || !!a.orderId;
            }),
            params: objParams
          };
        },
        getAndSetScriptOverride: function(returnId, specifiedScriptOverride) {
          if (adn.util.isObject(gScriptOverride)) {
            return returnId ? gScriptOverride.id : gScriptOverride.url;
          }
          var scriptOverrideId = specifiedScriptOverride || misc.getQueryParamsByName(SCRIPT_OVERRIDE_QSTRING);
          gScriptOverride = null;
          if (adn.util.isString(scriptOverrideId) && scriptOverrideId.length > 0) {
            gScriptOverride = (adn.util.find(ENUMS.scriptOverride, function(so) {
              return so.id === scriptOverrideId;
            }) || "");
          }
          return returnId && gScriptOverride ? gScriptOverride.id : (gScriptOverride || {}).url;
        },
        gatherExclusions: function(dataSrc) {
          var arrayCheck = function(targetObj, sourceObj, param) {
            if (adn.util.isArray(sourceObj[param]) && sourceObj[param].length > 0) {
              targetObj[param] = sourceObj[param];
            }
          };

          var exclusions = {};
          if (adn.util.isArray(dataSrc)) {
            adn.util.forEach(dataSrc, function(a) {
              arrayCheck(exclusions, a, 'excludedLineItems');
              arrayCheck(exclusions, a, 'excludedCreatives');
            });
          } else {
            arrayCheck(exclusions, dataSrc, 'excludedLineItems');
            arrayCheck(exclusions, dataSrc, 'excludedCreatives');
          }
          return exclusions;
        },
        encodeUrlParams: function(baseUrl, paramsObj, args) {
          var theArgs = args || {};
          misc.copyArgValues(paramsObj, theArgs, ['auml', 'ps', 'c']);
          if (theArgs.keywords) {
            paramsObj.keywords = theArgs.keywords.slice(0, 20);
          }
          if (theArgs.kv) {
            // need this here because the kv needs to be an array that is stringified as an array
            paramsObj.kv = JSON.stringify(theArgs.kv);
          }
          if (theArgs.ctx) {
            paramsObj.ctx = theArgs.ctx;
          }
          if (theArgs.canonical) {
            paramsObj.canonical = theArgs.canonical;
          }
          if (theArgs.replacements) {
            // need this here because the replacements needs to be an array that is stringified as an array
            paramsObj.replacements = JSON.stringify(theArgs.replacements);
          }
          if (theArgs.userSegments) {
            // need this here because the userSegments needs to be an array that is stringified as an array
            paramsObj.userSegments = JSON.stringify(theArgs.userSegments);
          }
          var scriptOverrideId = misc.getAndSetScriptOverride(true);
          if (scriptOverrideId) {
            paramsObj.so = scriptOverrideId;
          }
          if (misc.isAdnPrice(theArgs.floorPrice)) {
            paramsObj.fp = JSON.stringify(theArgs.floorPrice);
          } else if (theArgs.floorPrice) {
            adn.out.output("Not a valid floorprice supplied.", "encodeUrlParams", theArgs);
          }
          try {
            baseUrl += misc.encodeAsUrlParams(paramsObj, true);
            return baseUrl;
          } catch (e) {
            return adn.out.output("encoding urls failed", "insIframe: catch block", e);
          }
        },
        setAndReturnMetaData: function(theData, network) {
          var ajaxData = theData;
          var metaData = cookies.getAllAdvStorageAsObjForAjaxSend(network);
          if (adn.util.hasProperties(metaData)) {
            ajaxData = ajaxData || {};
            ajaxData.metaData = metaData;
          }
          return ajaxData;
        },
        normalise: function(aObj) {
          var toStringParams = {
            auW: 'auW',
            auH: 'auH'
          };
          adn.util.forEach(aObj, function(v, k) {
            if (toStringParams[k]) {
              aObj[k] = v.toString();
            }
          });

          if ((aObj.sdk || (aObj.requestArgs && aObj.requestArgs.sdk)) && aObj.ads && aObj.ads.length > 0 && aObj.ads[0].dims) {
            var dims = aObj.ads[0].dims;
            // current SDK expects integers for dims w and h, so force the issue here
            dims.w = adn.util.isNumber(dims.w) ? Math.round(dims.w) : parseInt(dims.w, 10);
            dims.h = adn.util.isNumber(dims.h) ? Math.round(dims.h) : parseInt(dims.h, 10);
            aObj.ads[0].dims = dims;
          }
          return aObj;
        }
      };
    }());

    var conv = {
        regDestination: function() {
          var adnCreative = misc.getQueryParamsByName("adn_creative");
          if (!adn.util.isStringWithChars(adnCreative)) {
            return;
          }
          var adnCampaign = misc.getQueryParamsByName("adn_campaign");
          var adnSource = misc.getQueryParamsByName("adn_source");
          if (!adn.util.isStringWithChars(adnCampaign) || !adn.util.isStringWithChars(adnSource)) {
            return;
          }
          cookies.writeConvLs({
            adn_campaign: adnCampaign,
            adn_source: adnSource,
            adn_creative: adnCreative
          });
        }
      },
      ev = {
        handleChildPageLoad: function(eventData, pDelayedResize) {
          var respCtrId = adn.inIframe.getResponseCtrId(eventData.widgetId ? doc.getElementById(eventData.widgetId) : "");
          var info = misc.getAdsInfo(respCtrId);
          if (!info.adsDivEl) {
            return adn.out.devOutput("Can't find container ID", "handleChildPageLoad", adn.inIframe.getResponseCtrId());
          }
          if (!eventData.containerDiv && !eventData.pageLoadBeforeProcessAd && (!adn.util.isArray(info.ads) || !info.ads.length || !gAdSpecs[info.ads[0].id])) {
            // handles situation where this method is called before processAdResponse. This can happen because the ad response goes via adn.calls.push.
            // timeout of 50 ensures that the next time this gets called, processAdResponse should have happened.
            win.setTimeout(function() {
              ev.handleChildPageLoad({pageLoadBeforeProcessAd: true});
            }, 50);
            return;
          }
          var iframeId = eventData.widgetId || adn.inIframe.getIframeId();
          if (!iframeId) {
            return adn.out.devOutput("Can't find a widget ID", "handleChildPageLoad", eventData);
          }
          var resizeToContent = adn.inIframe.getResize();
          var delayedResize = adn.util.isNumber(pDelayedResize) ? pDelayedResize : 0;
          var messageType = delayedResize > 0 ? ENUMS.postMessageType.toParentResize : ENUMS.postMessageType.toParentPageLoad;

          var iframe = info.adsDivEl.getElementsByTagName("iframe")[0];
          if (iframe) {
            // need to do this in order to cover for when the iframe is position: fixed or position: absolute and weird things happen.
            var iframeDims = adn.util.getElementDimensions(iframe);
            if (iframeDims.w > info.contentDims.w) {
              info.contentDims.w = iframeDims.w;
            }
            if (iframeDims.h > info.contentDims.h) {
              info.contentDims.h = iframeDims.h;
            }
          }
          var prevGlobalAdSpecs = misc.assign({}, gAdSpecs);
          var hasSizeChange = false;
          adn.util.forEach(gAdSpecs, function(adSpec) {
            if ((!eventData.widgetId || eventData.widgetId === adSpec.widgetId) && JSON.stringify(adSpec.dims) !== JSON.stringify(info.contentDims)) {
              if (info.contentDims.w < 10 || info.contentDims.h < 10) {
                // if less than 10, don't resize, probably a mistake.
                if (adSpec.isPrebid) {
                  // If isPrebid, don't collapse to 0
                  adn.out.infoOutput("Prebid ad so don't collapse", JSON.stringify(adSpec), JSON.stringify(info));
                  return;
                }
                if (adSpec.retAdCount > 0) {
                  adn.out.infoOutput("Ad returned so don't collapse", JSON.stringify(adSpec), JSON.stringify(info));
                  return;
                }
              }
              adSpec.dims = info.contentDims;
              hasSizeChange = true;
              // if any one ad is in a div container, then really all of it is.
              info.isDivContainer = info.isDivContainer || adSpec.isDivContainer;
            }
          });
          if (hasSizeChange || messageType === ENUMS.postMessageType.toParentPageLoad) {
            var msgObject = {
              widgetId: iframeId,
              messageType: messageType,
              w: info.contentDims.w,
              h: info.contentDims.h,
              hasSizeChange: hasSizeChange,
              retAdCount: info.ads.length,
              dims: info.contentDims,
              definedDims: info.definedDims,
              isDivContainer: info.isDivContainer,
              ads: misc.generateAdData(null, info, prevGlobalAdSpecs),
              resizeToContent: resizeToContent
            };
            // have to JSON stringify because in some strange cases, console says object is not available.
            adn.out.infoOutput("Message to parent for " + iframeId, "handleChildPageLoad", JSON.stringify(msgObject), JSON.stringify(gAdSpecs), JSON.stringify(eventData));
            misc.postMessageToParent(msgObject);
          }
          if (info.contentDims.w > 0 && info.contentDims.h > 0 && delayedResize > 9) {
            return;
          }
          // distinguishing between ad content is actually 0x0 and a parent div is hidden so ad is considered 0x0.
          // if parent div is hidden, want to keep checking the ad in case that it is suddenly visible.
          if (delayedResize < 20 || !misc.isVisible(info.adsDivEl)) {
            win.setTimeout(function() {
              // we do this delayed resize because of third-party creatives taking ages to load up their stuff.
              ev.handleChildPageLoad({widgetId: eventData.widgetId, containerDiv: eventData.containerDiv, pageLoadBeforeProcessAd: true}, delayedResize + 1);
            }, delayedResize < 20 ? 205 : 1500);
          }
        },
        handleChildSubs: function(e, args) {
          if (!args.widgetId) {
            return adn.out.devOutput("Cannot find widget ID", "handleChildSubs", e, args);
          }
          var widgetEl = doc.getElementById(args.widgetId);
          if (!widgetEl) {
            return adn.out.output("Cannot find widget", "handleChildSubs", e, args);
          }
          var msgObject = {
            messageType: ENUMS.postMessageType.toChildPubs,
            windowDims: adn.util.getWindowDims(),
            widgetDims: adn.util.getElementDimensions(widgetEl),
            widgetParentDims: adn.util.getElementDimensions(widgetEl.parentElement),
            widgetId: args.widgetId,
            event: args.event,
            isDivContainer: args.isDivContainer
          };
          if (adn.util.isDefined(args.functionCalls)) {
            msgObject.functionCalls = args.functionCalls;
          }
          misc.postMessageToChild(widgetEl, msgObject);
        },
        handlePostResponse: function(args, widgetSpec) {
          widgetSpec.hasResponse = true;
          misc.copyArgValues(widgetSpec, args, ['retAdsW', 'retAdsH', 'retAdCount', 'adServerHost']);
          var returnArgs = {};
          misc.copyArgValues(returnArgs, widgetSpec, PICK_DATA_PARAMETERS);
          misc.copyArgValues(returnArgs, args, PICK_DATA_PARAMETERS);
          if (adn.util.isFunction(widgetSpec.onResponse)) {
            widgetSpec.onResponse(returnArgs);
          }
          var ri = gRequestInfo[widgetSpec.requestId];
          if (ri) {
            ri.returnArgs = ri.returnArgs || [];
            ri.returnArgs.push(returnArgs);
            var notResponded = adn.util.filter(ri.widgetIds, function(widgetId) {
              return !gWidgetSpecs[widgetId].hasResponse;
            });
            if (notResponded.length === 0) {
              ri.onAllResponses(ri.returnArgs);
            }
          }
          return returnArgs;
        },
        handlePostMessage: function(aMessage) {
          if (!adn.util.isObject(aMessage)) {
            return adn.out.output("Handle post aMessage is being used in weird ways", "handlePostMessage", aMessage);
          }
          if (!adn.util.isString(aMessage.data) && !adn.util.isTrue(aMessage.isDivContainer)) {
            // if message.data is not coming back as a string, it's coming from somewhere else.
            return;
          }

          var args = {};
          if (adn.util.isTrue(aMessage.isDivContainer)) {
            args = misc.clone(aMessage);
          } else {
            try {
              args = JSON.parse(aMessage.data);
            } catch (e) {
              return adn.out.devOutput("Couldn't handle parsing", "handlePostMessage", e, aMessage.data, aMessage);
            }
            if (args[ENUMS.postMessageSrcKey] !== ENUMS.postMessageSrcValue) {
              // could be many other window.postMessage messages going round, so just skipping early without debug info.
              return false;
            }
          }

          var widgetSpec = gWidgetSpecs[args.widgetId] || {};
          if (args.messageType === ENUMS.postMessageType.toChildPubs) {
            if (!adn.util.isString(args.event) || !adn.util.isString(args.widgetId)) {
              return adn.out.output("Requires more data", "handlePostMessage", args);
            }
            var msgObject = {
              widgetId: args.widgetId,
              event: args.event,
              windowDims: args.windowDims,
              widgetDims: args.widgetDims,
              widgetParentDims: args.widgetParentDims
            };
            if (adn.util.isDefined(args.functionCalls)) {
              msgObject.functionCalls = args.functionCalls;
            }
            pFrameMethods.handleChildPubs(msgObject);
          } else if (args.messageType === ENUMS.postMessageType.toChildAdUnitInfo) {
            if (!adn.util.isString(args.adUnitInfoId)) {
              return adn.out.output("Requires more data", "handlePostMessage", args);
            }
            pFrameMethods.handleAdUnitInfo(args);
          } else if (args.messageType === ENUMS.postMessageType.toParentGetAdUnitInfo) {
            if (!adn.util.isString(args.adUnitInfoId) || !adn.util.hasProperties(widgetSpec)) {
              return adn.out.output("Needs ad unit info id and widget id", "handlePostMessage", args, widgetSpec);
            }
            misc.postMessageToChild(doc.getElementById(args.widgetId), {
              adUnitInfoId: args.adUnitInfoId,
              messageType: ENUMS.postMessageType.toChildAdUnitInfo,
              adUnitInfo: widgetSpec,
              isDivContainer: args.isDivContainer
            });
          } else if (args.messageType === ENUMS.postMessageType.toParentCustomEvent) {
            if (!adn.util.isDefined(args.args) || !adn.util.isObject(args.customArgs) || !adn.util.isObject(args.pAdSpec)) {
              return adn.out.output("Missing required data to send custom event info", "handlePostMessage", args);
            }
            adn.inIframe.sendCustomEvent(args.args, args.customArgs, args.pAdSpec);
          } else if (args.messageType === ENUMS.postMessageType.toParentFunctions) {
            if (!adn.util.hasProperties(widgetSpec)) {
              return adn.out.output("Needs valid widget id", "handlePostMessage", args, widgetSpec);
            }
            if (!args.name) {
              return adn.out.output("Needs a function name", "handlePostMessage", args, widgetSpec);
            }
            if (widgetSpec.functions && adn.util.isArray(widgetSpec.functions)) {
              var funcObj = adn.util.find(widgetSpec.functions, function(f) {
                return f && f.name === args.name && adn.util.isFunction(f.func);
              });
              if (funcObj && adn.util.isFunction(funcObj.func)) {
                var copyArgValues = {};
                misc.copyArgValues(copyArgValues, widgetSpec, PICK_DATA_PARAMETERS);
                funcObj.func(copyArgValues, args.args);
              }
            }
          } else if (args.messageType === ENUMS.postMessageType.toParentAdVisibilityEvent) {
            if (!adn.util.hasProperties(widgetSpec)) {
              return adn.out.output("Need widget info", "toParentAdVisibility", args, widgetSpec);
            }
            widgetSpec[args.callbackProp + 'Data'] = {
              widgetId: args.widgetId,
              auId: widgetSpec.auId,
              adId: args.adId,
              creativeId: args.creativeId,
              lineItemId: args.lineItemId,
              viewability: args.viewability,
              attention: args.attention,
              feedbackText: args.feedbackText
            };
            if (args.delayedImpression) {
              if (widgetSpec.impReg !== ENUMS.impReg.manual || widgetSpec['outside' + args.feedbackText]) {
                readings.sendEventFromParent(args.impRequestLoc, args.spec, args.feedbackText, widgetSpec.network || widgetSpec.networkId);
                misc.visibilityEventHandling(args.callbackProp, widgetSpec);
              } else if (widgetSpec.impReg === ENUMS.impReg.manual) {
                widgetSpec['inside' + args.feedbackText] = {
                  impRequestLoc: args.impRequestLoc,
                  spec: args.spec,
                  feedbackText: args.feedbackText
                };
              }
            } else {
              misc.visibilityEventHandling(args.callbackProp, widgetSpec);
            }
          } else if (args.messageType === ENUMS.postMessageType.toParentSubscribe) {
            if (!adn.util.isString(args.event) || !adn.util.isString(args.widgetId)) {
              return adn.out.output("Requires on event", "handlePostMessage", args);
            }
            adn.util.addEventListener(win, args.event, adn.util.createDelegate(ev, ev.handleChildSubs, {
              widgetId: args.widgetId,
              event: args.event,
              isDivContainer: args.isDivContainer
            }));
          } else if (args.messageType === ENUMS.postMessageType.toParentPageLoad || args.messageType === ENUMS.postMessageType.toParentResize) {
            if (widgetSpec.resizeOnPageLoad !== false && (!adn.util.isFunction(widgetSpec.resizeOnPageLoad) || widgetSpec.resizeOnPageLoad(args) !== false)) {
              if ((args.resizeToContent === ENUMS.resizeToContent.resizeCreative || args.resizeToContent === ENUMS.resizeToContent.resize) && adn.util.isTrue(args.hasSizeChange)) {
                var resizeArgs = {};
                misc.copyArgValues(resizeArgs, widgetSpec, PICK_DATA_PARAMETERS);
                misc.copyArgValues(resizeArgs, args, PICK_DATA_PARAMETERS);
                parentMethods.iframeResizer(resizeArgs, false);
              }
            }
            if (args.messageType === ENUMS.postMessageType.toParentPageLoad) {
              if (adn.util.isFunction(widgetSpec.onPageLoad)) {
                var pageLoadArgs = {};
                misc.copyArgValues(pageLoadArgs, widgetSpec, PICK_DATA_PARAMETERS);
                misc.copyArgValues(pageLoadArgs, args, PICK_DATA_PARAMETERS);
                widgetSpec.onPageLoad(misc.normalise(pageLoadArgs));
              }
            }
          } else {
            if (adn.util.isStringWithChars(args.method)) {
              try {
                if (args.functionContext === ENUMS.functionContext.inIframe) {
                  adn.util.isFunction(pFrameMethods[args.method]) ?
                    pFrameMethods[args.method].call(adn.inIframe, args)
                    : adn.inIframe[args.method].call(adn.inIframe, args);
                } else {
                  parentMethods[args.method].call(parentMethods, args);
                }
              } catch (e) {
                return adn.out.output(e, "catch block for calling method", args, e);
              }
            }

            if (args.messageType === ENUMS.postMessageType.toParentImpression || args.messageType === ENUMS.postMessageType.toParentResponse) {
              var returnArgs = ev.handlePostResponse(args, widgetSpec);
              if (args.messageType === ENUMS.postMessageType.toParentImpression) {
                if (adn.util.isFunction(widgetSpec.onImpressionResponse)) {
                  widgetSpec.onImpressionResponse(misc.normalise(returnArgs));
                }
                ev.handleChildSubs({}, {
                  event: 'impRegistered',
                  widgetId: args.widgetId,
                  functionCalls: (widgetSpec.functionCalls || []).concat(widgetSpec.cachedFunctionCalls),
                  isDivContainer: args.isDivContainer
                });
              }
            }
          }
        },
        registerListeners: function() {
          adn.util.addEventListener(win, 'message', adn.util.createDelegate(adn.lib, ev.handlePostMessage));
          if (!adn.util.isTopWindow()) {
            adn.util.addEventListener(win, 'load', adn.util.createDelegate(adn.lib, ev.handleChildPageLoad), EVENT_TYPE_LOAD);
          }
        },
        setFeedbackOptions: function(args) {
          if (adn.util.isObject(args)) {
            if (adn.util.isString(args.console) && !!ENUMS.feedback.console[args.console]) {
              gFeedback.console = args.console;
            }
            if (adn.util.isString(args.inScreen) && !!ENUMS.feedback.inScreen[args.inScreen]) {
              gFeedback.inScreen = args.inScreen;
            }
          }
          if (win.location.href.toLowerCase().indexOf(LOG_UI_URL_STRING) > 0) {
            gFeedback.console = ENUMS.feedback.console.allAndInfo;
          }
          if (win.location.href.toLowerCase().indexOf(DEBUG_UI_URL_STRING) > 0) {
            gFeedback.inScreen = ENUMS.feedback.inScreen.inAdUnit;
          }
          var inScreenQv = misc.getQueryParamsByName("inScreen");
          if (adn.util.isString(inScreenQv) && !!ENUMS.feedback.inScreen[inScreenQv]) {
            gFeedback.inScreen = inScreenQv;
          }
        }
      },
      cookies = (function() {
        var providerKeys = {
          cxense: {
            userId: 'cX_P'
          },
          relay42: {
            userId: '_svtri'
          }
        };

        var getStorageData = function(storageType, storageKey) {
          var storageString = storageType.getItem(storageKey);
          if (adn.util.isStringWithChars(storageString)) {
            try {
              return JSON.parse(storageString);
            } catch (e) {
              return adn.out.output("Error reading from local storage", "cookie.getLs", e, storageType, storageString);
            }
          }
          return {};
        };

        var getLocalStorageInfo = function(storageKey, raw, network) {
          var storageMethod = adn.util.hasLocalStorage() ? win.localStorage : gLocalStorage;
          var storageData;
          try {
            storageData = getStorageData(storageMethod, storageKey);
          } catch (e) {
            adn.out.devOutput("Problem with local storage", "getLocalStorage", e);
            return {};
          }
          if (storageKey === STORAGE_CONV_METADATA_KEY) {
            if (!adn.util.hasProperties(storageData)) {
              storageData = {};
            }
          } else if (!adn.util.isArray(storageData)) {
            storageData = [];
          }
          if (raw === true) {
            return storageData;
          }

          var storageObj = {};
          adn.util.forEach(storageData, function(el) {
            if (el.key === 'voidAuIds') {
              if (!adn.util.isArray(el.value)) {
                return;
              }
              storageObj.voidAuIds = adn.util.filter(el.value, function(auId) {
                return auId.auId && auId.exp && auId.exp > misc.getUnixTimestamp();
              });
            } else if (adn.util.isStringWithChars(el.key) && el.exp && el.exp > misc.getUnixTimestamp() && (!network || el.network === network)) {
              storageObj[el.key] = el.value;
            }
          });
          return storageObj;
        };

        return {
          getGdprAsObj: function(args) {
            var localGdpr = args && adn.util.isDefined(args.gdpr) ? args.gdpr : adn.util.isDefined(gGdpr) ? gGdpr : null;
            if (adn.util.isDefined(localGdpr)) {
              return {gdpr: localGdpr === false ? 0 : localGdpr === true ? 1 : localGdpr};
            }
          },
          getEuConsentAsObj: function(args) {
            var euConsent = args && args.consentString ? args.consentString : gConsentString ? gConsentString : cookies.get("euconsent-v2") || cookies.get("euconsent");
            if (adn.util.isStringWithChars(euConsent)) {
              return {consentString: euConsent};
            }
          },
          getAllIdsAsObj: function() {
            var theIds = [];
            var cxenseId = cookies.get(providerKeys.cxense.userId);
            if (cxenseId) {
              theIds.push({CXENSE: {userId: cxenseId}});
            }
            var relay42Id = cookies.get(providerKeys.relay42.userId);
            if (relay42Id) {
              theIds.push({RELAY42: {userId: relay42Id}});
            }
            if (theIds.length < 1) {
              return;
            }
            return {userAliases: JSON.stringify(theIds)};
          },
          getIdsAsObj: function(args) {
            var ids = {
              userId: args.userId || cookies.getAllDatStorageAsObj().browserId
            };
            if (!ids.userId) {
              delete ids.userId;
            }
            if (!ids.sessionId) {
              delete ids.sessionId;
            }
            return ids;
          },
          get: function(key) {
            var name = key ? key + "=" : null;
            var cookieObj = name ? null : {};
            var decodedCookie = decodeURIComponent(doc.cookie);
            var ca = decodedCookie.split(';');
            for (var i = 0; i < ca.length; i++) {
              var c = ca[i];
              while (c.charAt(0) === ' ') {
                c = c.substring(1);
              }
              if (!name) {
                var kv = c.split('=');
                cookieObj[kv[0]] = kv[1];
              } else if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
              }
            }
            return adn.util.isObject(cookieObj) ? cookieObj : "";
          },
          set: function(cookieObj) {
            adn.util.forEach(cookieObj, function(value, key) {
              var date = new Date();
              date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
              var expires = "; expires=" + date.toUTCString();
              doc.cookie = key + "=" + (value || "") + expires + "; path=/";
            });
          },
          clearAdvLocalStorage: function() {
            try {
              win.localStorage.removeItem(STORAGE_ADV_METADATA_KEY);
              gLocalStorage.removeItem(STORAGE_ADV_METADATA_KEY);
              win.localStorage.removeItem(STORAGE_CONV_METADATA_KEY);
              gLocalStorage.removeItem(STORAGE_CONV_METADATA_KEY);
            } catch (e) {
              adn.out.devOutput("Problem clearing adv local storage", "clearAdvLocalStorage", e);
            }
          },
          writeConvLs: function(cookieObj, overwrite, network) {
            if (!overwrite && (!adn.util.isObject(cookieObj) || !adn.util.hasProperties(cookieObj))) {
              return adn.out.devOutput("Not an object of data", "writeAdvLs");
            }
            if (!gUseLocalStorage) {
              cookies.clearAdvLocalStorage();
            }

            function vetData(val, campaign) {
              return val.adn_creative &&
                adn.util.isStringWithChars(val.adn_creative) && val.adn_source &&
                adn.util.isStringWithChars(val.adn_source) && campaign &&
                adn.util.isStringWithChars(campaign);
            }

            function setToStorage(storage, key, val, timestamp) {
              storage[key] = {
                adn_source: val.adn_source,
                adn_creative: val.adn_creative,
                timestamp: timestamp || misc.getUnixTimestamp(),
                network: network
              };
            }

            function vetCookieObj(currentStorage, cookieObj) {
              adn.util.forEach(cookieObj, function(val, key) {
                if (vetData(val, key)) {
                  setToStorage(currentStorage, key, val, val.timestamp);
                }
              });
            }

            var currentStorage = {};
            if (overwrite) {
              var vettedData = cookieObj;
              if (adn.util.isStringWithChars(vettedData)) {
                try {
                  vettedData = JSON.parse(vettedData);
                } catch (e) {
                  return adn.out.devOutput("Problem deciphering data from adserver", "writeConvLs", e, cookieObj);
                }
              }
              vetCookieObj(currentStorage, vettedData);
              if (adn.util.hasProperties(vettedData) && (!adn.util.isObject(currentStorage) || !adn.util.hasProperties(currentStorage))) {
                // if the data send in is malformed rather than just empty, eg not `{}` or {}, then don't write
                return;
              }
            } else {
              currentStorage = getLocalStorageInfo(STORAGE_CONV_METADATA_KEY, true, network);
              var keysForDeletion = [];
              adn.util.forEach(currentStorage, function(val, key) {
                if (!vetData(val, key) || !val.timestamp || !adn.util.isNumber(val.timestamp)) {
                  keysForDeletion.push(key);
                }
              });
              adn.util.forEach(keysForDeletion, function(key) {
                delete currentStorage[key];
              });

              if (vetData(cookieObj, cookieObj.adn_campaign)) {
                // is simple data obj, not the response from the ad server
                setToStorage(currentStorage, cookieObj.adn_campaign, cookieObj);
              } else {
                vetCookieObj(currentStorage, cookieObj);
              }
            }

            var localStorageMethod = adn.util.hasLocalStorage() ? win.localStorage : gLocalStorage;
            try {
              if (adn.util.hasProperties(currentStorage)) {
                localStorageMethod.setItem(STORAGE_CONV_METADATA_KEY, JSON.stringify(currentStorage));
              } else {
                localStorageMethod.removeItem(STORAGE_CONV_METADATA_KEY);
              }
            } catch (e) {
              adn.out.devOutput("Problem setting item", "writeAdvLs", e, currentStorage);
            }
          },
          writeAdvLs: function(cookieObj, network) {
            if (!adn.util.isObject(cookieObj) || !adn.util.hasProperties(cookieObj)) {
              return adn.out.devOutput("Not an object of data", "writeAdvLs");
            }
            if (!gUseLocalStorage) {
              cookies.clearAdvLocalStorage();
            }
            var lsArray = [],
              currentStorage = getLocalStorageInfo(STORAGE_ADV_METADATA_KEY, true),
              keysToSkip = ['clicks', 'voidAuIds'];

            adn.util.forEach(currentStorage, function(el) {
              // want to transition away from saving local storage elements without a network ID specified
              if ((adn.util.isStringWithChars(el.value) || adn.util.hasProperties(el.value)) && adn.util.isStringWithChars(el.key) && keysToSkip.indexOf(el.key) < 0 && (!cookieObj[el.key] || el.network !== network) && el.exp && el.exp > misc.getUnixTimestamp() && el.network) {
                lsArray.push(el);
              }
            });

            adn.util.forEach(cookieObj, function(value, key) {
              if (key.toLowerCase().indexOf("session") < 0 && keysToSkip.indexOf(key) < 0 && adn.util.isStringWithChars(key) && adn.util.isStringWithChars(value)) {
                lsArray.push({exp: misc.getUnixTimestamp(100), key: key, value: value, network: network});
              }
            });

            var newAuIds = adn.util.map(adn.util.isStringWithChars(cookieObj.voidAuIds) ? cookieObj.voidAuIds.split(";") : [], function(newAuId) {
              return {exp: misc.getUnixTimestamp(1), auId: newAuId};
            }) || [];
            var auIdsObj = {};
            adn.util.forEach((cookies.getAllAdvStorageAsObj().voidAuIds || []).concat(newAuIds), function(auEntry) {
              var existingExp = auIdsObj[auEntry.auId];
              if (!existingExp || auEntry.exp > existingExp) {
                auIdsObj[auEntry.auId] = auEntry.exp;
              }
            });
            var voidAuIds = adn.util.map(auIdsObj, function(exp, auId) {
              return {exp: exp, auId: auId};
            });
            if (voidAuIds.length > 0) {
              lsArray.push({key: 'voidAuIds', value: voidAuIds});
            }

            var localStorageMethod = adn.util.hasLocalStorage() ? win.localStorage : gLocalStorage;
            try {
              if (lsArray.length > 0) {
                localStorageMethod.setItem(STORAGE_ADV_METADATA_KEY, JSON.stringify(lsArray));
              } else {
                localStorageMethod.removeItem(STORAGE_ADV_METADATA_KEY);
              }
            } catch (e) {
              adn.out.devOutput("Problem setting item", "writeAdvLs", e, lsArray);
            }
            if (cookieObj.clicks) {
              cookies.writeConvLs(cookieObj.clicks, true, network);
            }
          },
          writeDatSegments: function(folderId, cookieObj) {
            if (!adn.util.isObject(cookieObj) || !adn.util.hasProperties(cookieObj)) {
              return adn.out.devOutput("Not an object of data", "writeDatLs");
            }
            var data = {};
            data[folderId] = {};

            adn.util.forEach(cookieObj, function(value, key) {
              if (key === "segments") {
                data[folderId][key] = value;
              }
            });

            if (!data[folderId].segments) {
              data[folderId].segments = [];
            }
            data[folderId].exp = misc.getUnixTimestamp(1, true);

            var storageType = adn.util.hasLocalStorage() ? win.localStorage : gLocalStorage;
            try {
              storageType.setItem(STORAGE_DAT_SEGMENTS_KEY, JSON.stringify(data));
            } catch (e) {
              adn.out.devOutput("Problem setting item", "writeDatSegments", e, data);
            }
          },
          getDatSegments: function(folderId) {
            var datSegments = {};
            var localStorageMethod = adn.util.hasLocalStorage() ? win.localStorage : gLocalStorage;
            try {
              var rawDatSegments = misc.assign({}, misc.assign(getStorageData(localStorageMethod, STORAGE_DAT_SEGMENTS_KEY)));
              adn.util.forEach(rawDatSegments, function(segmentsObj, key) {
                if (!adn.util.isArray(segmentsObj.segments) || !segmentsObj.segments.length || !segmentsObj.exp || segmentsObj.exp <= misc.getUnixTimestamp()) {
                  return;
                }
                datSegments[key] = segmentsObj;
              });
              if (!datSegments || !adn.util.hasProperties(datSegments)) {
                win.localStorage.removeItem(STORAGE_DAT_SEGMENTS_KEY);
                gLocalStorage.removeItem(STORAGE_DAT_SEGMENTS_KEY);
                return {};
              }
            } catch (e) {
              adn.out.devOutput("Problem getting dat segments", "getDatSegments", e);
              return {};
            }
            if (!datSegments[folderId]) {
              return {};
            }
            var folderSegmentObj = datSegments[folderId] || {};
            folderSegmentObj.segments = adn.util.isArray(folderSegmentObj.segments) ? folderSegmentObj.segments : [];
            delete folderSegmentObj.exp;
            return folderSegmentObj;
          },
          writeDatLs: function(cookieObj) {
            if (!adn.util.isObject(cookieObj) || !adn.util.hasProperties(cookieObj)) {
              return adn.out.devOutput("Not an object of data", "writeDatLs");
            }
            var lsParams = {};

            adn.util.forEach(cookieObj, function(value, key) {
              if (key.indexOf("browserId") === 0) {
                lsParams[key] = value;
              } else if (key.indexOf("extSync") === 0) {
                lsParams[key] = value;
              }
            });

            var localStorageMethod = adn.util.hasLocalStorage() ? win.localStorage : gLocalStorage;
            try {
              localStorageMethod.setItem(STORAGE_DAT_KEY, JSON.stringify(lsParams));
            } catch (e) {
              adn.out.devOutput("Problem setting item", "writeDatLs", e, lsParams);
            }
          },
          getAllDatStorageAsObj: function() {
            var localStorageMethod = adn.util.hasLocalStorage() ? win.localStorage : gLocalStorage;
            try {
              return misc.assign({}, getStorageData(localStorageMethod, STORAGE_DAT_KEY));
            } catch (e) {
              adn.out.devOutput("Problem with local storage", "getAllDatStorageAsObj", e);
              return {};
            }
          },
          getAllAdvStorageAsObj: function(network) {
            return misc.assign({}, getLocalStorageInfo(STORAGE_ADV_METADATA_KEY, false, network));
          },
          getAllAdvStorageAsObjForAjaxSend: function(network) {
            var cookieData = cookies.getAllAdvStorageAsObj(network);
            delete cookieData.voidAuIds;
            return cookieData;
          },
          getConvStorageAsObj: function() {
            var localStorageMethod = adn.util.hasLocalStorage() ? win.localStorage : gLocalStorage;
            return getStorageData(localStorageMethod, STORAGE_CONV_METADATA_KEY);
          }
        };
      }()),
      pFrameMethods = {},
      dom = {
        distributeComposedAds: function(composedAds) {
          var initProximity = false;
          var rTokens = [];
          var renderedLoc = "";
          var network = "";
          adn.util.forEach(composedAds.adUnits || composedAds, function(au) {
            var wSpecArgs = adn.util.find(gWidgetSpecs, function(wSpec) {
              return wSpec.targetId === au.targetId && wSpec.adStatus === ENUMS.adStatus.init;
            });
            if (!wSpecArgs) {
              adn.out.output("No ad unit data found, mismatched target probably or not the right status", "composed", wSpecArgs);
              return;
            }
            wSpecArgs.ads = au.ads;
            wSpecArgs.returnedKeywords = composedAds.keywords;
            wSpecArgs.returnedSegments = composedAds.segments;
            renderedLoc = wSpecArgs.renderedImpRequestLoc;
            network = wSpecArgs.network;

            if (au.matchedAdCount > 0) {
              if (wSpecArgs.native) {
                wSpecArgs.container = ENUMS.container.div;
              } else {
                if (!au.renderOption) {
                  if (au.html.indexOf("adnOptionContainerDiv") > 0) {
                    wSpecArgs.container = ENUMS.container.div;
                  }
                  if (au.html.indexOf("adnOptionContainerIframe") > 0) {
                    wSpecArgs.container = ENUMS.container.iframe;
                  }
                } else {
                  wSpecArgs.renderOption = au.renderOption;
                }
                if (au.renderOption === 'IFRAME') {
                  wSpecArgs.container = ENUMS.container.iframe;
                }
                if (au.renderOption === 'SANDBOXED_IFRAME') {
                  wSpecArgs.container = ENUMS.container.iframe;
                  wSpecArgs.isolateFrame = true;
                }
                if (au.renderOption === 'DIV') {
                  wSpecArgs.container = ENUMS.container.div;
                }
              }
            }

            if (au.matchedAdCount === 0) {
              wSpecArgs.adStatus = ENUMS.adStatus.processed;
              var dataArgs = misc.copyArgValues({
                matchedAdCount: au.matchedAdCount,
                html: au.html
              }, wSpecArgs, ['auId', 'targetId', 'auW', 'auH', 'kv', 'keywords', 'userSegments', 'c', 'ps', 'replacements', 'auml', 'floorPrice', 'requestArgs']);
              dataArgs.retAdCount = 0;
              dataArgs.retAdsW = 0;
              dataArgs.retAdsH = 0;
              dataArgs.h = 0;
              dataArgs.w = 0;
              ev.handlePostResponse(dataArgs, wSpecArgs);
              if (adn.util.isFunction(wSpecArgs.onNoMatchedAds)) {
                wSpecArgs.onNoMatchedAds(dataArgs);
              }
              if (adn.util.isFunction(wSpecArgs.onPageLoad)) {
                wSpecArgs.onPageLoad(dataArgs);
              }
              misc.ampCheck(wSpecArgs, {width: 0, height: 0});
            } else if (misc.getParam(wSpecArgs.requestParams, 'load') === ENUMS.loadEnums.lazy && !wSpecArgs.withinBounds) {
              initProximity = true;
              wSpecArgs.adStatus = ENUMS.adStatus.procured;
              au.renderedImpRequestLoc = renderedLoc;

              var targetEl = misc.getDocEl(wSpecArgs);
              var c = gComposedAds[au.targetId];
              if (targetEl && c) {
                c.errorStatus = '';
                dom.showTargetDiv(targetEl, wSpecArgs);
                targetEl.style.width = adn.util.dimension(wSpecArgs.auW);
                targetEl.style.height = adn.util.dimension(wSpecArgs.auH);
              } else {
                c.errorStatus = ENUMS.errorStatus.noTarget;
                adn.out.output("Unable to find target element", "distributeComposedAds", wSpecArgs);
              }
            } else {
              misc.ampCheck(wSpecArgs);
              var result = adn.lib.showAdContent(wSpecArgs, au);
              if (adn.util.isTrue(result)) {
                wSpecArgs.adStatus = ENUMS.adStatus.distributed;

                adn.out.devOutput("renderedTokenCollection", "distributeComposedAds", !!au.html, au.html && au.html.indexOf("class=\"" + EXTERNAL_CONTAINER_CLASS) < 0);
                if (!au.html || (au.html && au.html.indexOf("class=\"" + EXTERNAL_CONTAINER_CLASS) < 0)) {
                  adn.util.forEach(au.rts || [], function(rp) {
                    rTokens.push(rp);
                  });
                }

                var els = doc.getElementsByClassName((wSpecArgs.targetClass || wSpecArgs.targetId) + "-show");
                adn.util.forEach(els, function(el) {
                  el.style.display = wSpecArgs.display || "block";
                });
              }
            }
          });
          if (rTokens.length > 0) {
            adn.lib.sendRenderedImps(rTokens, renderedLoc, network);
          }

          if (initProximity) {
            readings.initProximity();
          }
        },
        showTargetDiv: function(targetEl, args) {
          if (!targetEl) {
            return;
          }
          if (adn.util.isString(args.display) && targetEl.style.display !== args.display) {
            targetEl.style.display = args.display;
          } else if (targetEl.style.display === 'none') {
            targetEl.style.display = 'block';
          }
        },
        insIframe: function(args, targetElement) {
          var targetEl = (targetElement && targetElement.targetId === args.targetId) || misc.getDocEl(args);
          if (!targetEl && args.format !== 'script') {
            adn.out.warn("Unable to find HTML element on page with the following id or class: " + args.targetId + " - " + args.targetClass);
            return adn.out.output("No targetId was found.", "insIframe");
          }

          function updateDefaultSizes(args, targetEl, ifr) {
            var derivedWidth = args.auW || (args.creativeData ? args.creativeData.creativeWidth : null);
            var ifrWidth = adn.util.isString(derivedWidth) || derivedWidth > 0 ? derivedWidth : 0;
            if (ifr) {
              ifr.width = ifrWidth;
            }
            targetEl.style.width = adn.util.isFlexiNumber(derivedWidth) && parseInt(derivedWidth, 10) > 0 ? adn.util.dimension(ifrWidth) : ifrWidth;

            var derivedHeight = args.auH || (args.creativeData ? args.creativeData.creativeHeight : null);
            var ifrHeight = adn.util.isString(derivedHeight) || derivedHeight > 0 ? derivedHeight : 0;
            if (ifr) {
              ifr.height = ifrHeight;
            }
            targetEl.style.height = adn.util.isFlexiNumber(derivedHeight) && parseInt(derivedHeight, 10) > 0 ? adn.util.dimension(ifrHeight) : ifrHeight;
          }

          var ifr = doc.createElement('iframe');
          ifr.id = args.widgetId;
          ifr.name = args.widgetId;
          ifr.setAttribute(TOP_WINDOW_DATA_ATTR, adn.util.isTopWindow());
          ifr.allowTransparency = true;

          ifr.setAttribute(CONSOLE_DATA_ATTR, gFeedback.console);
          if (args.impReg) {
            ifr.setAttribute(IMP_REG_DATA_ATTR, args.impReg);
          }

          var paramsObj = {ifrId: ifr.id};
          if (args.serverUrl) {
            if (args.env && args.env !== ENUMS.env.production.id && ENUMS.env[args.env]) {
              paramsObj[ENV_DATA_ATTR] = args.env;
            }
            if (args.dn) {
              paramsObj[DN_DATA_ATTR] = args.dn;
            }
            if (args.impReg) {
              paramsObj[IMP_REG_DATA_ATTR] = args.impReg;
            }
            var serverSrc = misc.encodeUrlParams(args.serverUrl, paramsObj, args);
            if (args.serverUrl.length > 5) {
              // means this is a call to the ad server for the iframe.
              serverSrc += misc.encodeAsUrlParams(cookies.getIdsAsObj(args), true);
              serverSrc += misc.encodeAsUrlParams(cookies.getAllIdsAsObj() || {}, true);
              serverSrc += misc.encodeAsUrlParams(cookies.getEuConsentAsObj(args) || {}, true);
              serverSrc += misc.encodeAsUrlParams(cookies.getGdprAsObj(args) || {}, true);

              if (adn.util.isTopWindow()) {
                var dims = adn.util.getWindowSize();
                if (dims.width > 0 && dims.height > 0) {
                  if (!misc.isUnitTest()) {
                    serverSrc += misc.encodeAsUrlParams({viewport: dims.width + "x" + dims.height}, true);
                  }
                }
              }

              if (win.screen && win.screen.availHeight) {
                if (!misc.isUnitTest()) {
                  serverSrc += misc.encodeAsUrlParams({screen: win.screen.availWidth + "x" + win.screen.availHeight}, true);
                }
              }

              if (!adn.util.isTopWindow()) {
                var topWindowParams = {};
                topWindowParams[TOP_WINDOW_DATA_ATTR] = false;
                serverSrc += misc.encodeAsUrlParams(topWindowParams, true);
              }
            }
            if (!serverSrc) {
              return adn.out.output("Failure to create server src", "insIframe", serverSrc);
            }
            ifr.src = serverSrc;
          }

          ifr.setAttribute('style', 'display: block; margin: 0; border-width: 0; padding: 0;');
          ifr.setAttribute('scrolling', 'no');
          ifr.frameBorder = '0';

          if (args.isolateFrame && misc.supportsSrcDoc()) {
            var attributes = SANDBOX_ATTRIBUTES;
            if (args.blockScript) {
              attributes = attributes.replace("allow-scripts", "");
            }
            ifr.setAttribute("sandbox", attributes);
          }

          if (args.format === 'script' || args.format === 'js') {
            var scriptSrc = ifr.src;
            scriptSrc += misc.encodeAsUrlParams({format: args.format}, true);
            if (args.creativeTag) {
              scriptSrc = misc.updateSrc(args, scriptSrc, true);
              misc.loadScriptSrc(scriptSrc, targetEl);
              updateDefaultSizes(args, targetEl);
            } else {
              doc.write("\x3Cscript src='" + scriptSrc + "'>\x3C/script>");
            }
          } else {
            updateDefaultSizes(args, targetEl, ifr);

            if (args.creativeTag && ifr.src) {
              ifr.src = misc.updateSrc(args, ifr.src, true);
            }

            targetEl.appendChild(ifr);
          }

          dom.showTargetDiv(targetEl, args);
          return ifr;
        }
      },
      readings = (function() {
        var mViewabilityRunner = false,
          gSendEventLocs = [];

        var sendEvent = function(eventLoc, spec, feedbackText, network, extraParams, sendAsBeacon) {
          var loc = eventLoc;
          var eventLocIsComplete = !spec || !spec.rt;
          try {
            if (win.screen && win.screen.availHeight) {
              loc += misc.encodeAsUrlParams({screen: win.screen.availWidth + "x" + win.screen.availHeight}, true);
            }
            if (!eventLocIsComplete) {
              loc = loc + misc.encodeAsUrlParams({rt: spec.rt}, true);
            }
            if (gSendEventLocs.indexOf(loc) > -1) {
              return adn.out.devOutput("URL has already been sent. Not sending again.", "sendEvent", loc, spec);
            }
            if (misc.isTestAddress(loc) || misc.isTestAddress(misc.getLocationHref())) {
              gSendEventLocs.push(loc);
              adn.out.devOutput(feedbackText + " being sent", "sending" + feedbackText + "Event", loc);
            } else if (adn.util.isStringWithChars(spec.rt) && spec.rt.indexOf("preview-") === 0) {
              gSendEventLocs.push(loc);
              adn.out.devOutput(feedbackText + " would have been sent if this was not a previewed ad", "sending" + feedbackText + "Event", loc);
            } else {
              var locWithExtraParams = loc;
              if (extraParams) {
                locWithExtraParams += misc.encodeAsUrlParams(extraParams, true);
              }
              if (sendAsBeacon && win.navigator && win.navigator && !misc.isUnitTest()) {
                win.navigator.sendBeacon(locWithExtraParams);
              } else {
                var ajax = adn.util.getNewAjax(eventLocIsComplete ? "GET" : "POST", locWithExtraParams, function() {
                  if (ajax.readyState && ajax.readyState !== 4) {
                    return false;
                  }
                  if ((!ajax.status || ajax.status === 200) && adn.util.isStringWithChars(ajax.responseText)) {
                    var jsonResponse = {};
                    try {
                      jsonResponse = JSON.parse(ajax.responseText);
                    } catch (e) {
                      return adn.out.output(e, "ajax.onreadystatechange: catch block send event", ajax);
                    }
                    if (jsonResponse && jsonResponse.metaData && adn.util.hasProperties(jsonResponse.metaData)) {
                      cookies.writeAdvLs(jsonResponse.metaData, jsonResponse.network);
                    }
                  }
                });
                var canAccessLocalStorage = misc.canAccessLocalStorage();
                ajax.withCredentials = !misc.isTestAddress(loc) && canAccessLocalStorage;
                var metaData;
                if (canAccessLocalStorage && (!gWindowStats || !gWindowStats.metaData)) {
                  metaData = misc.setAndReturnMetaData(null, network);
                } else {
                  metaData = gWindowStats.metaData;
                }
                console.log("EVENTSENT: ", locWithExtraParams);
                if (metaData) {
                  ajax.send(JSON.stringify(metaData));
                } else {
                  ajax.send();
                }
              }
              gSendEventLocs.push(loc);
            }
            return true;
          } catch (e) {
            adn.out.output("sending a " + feedbackText + " event failed", e);
            return false;
          }
        };

        var sendImpression = function(impRequestProp, specProp, constantCheckProp, constantPostProp, feedbackText, callbackProp) {
          adn.util.forEach(gAdSpecs, function(spec) {
            if (!adn.util.isStringWithChars(spec.rt) && spec.displayStatus) {
              adn.out.output("Need a response token on the spec object to send imp", "send" + feedbackText + "Impression", spec);
              return;
            }
            var impRequestLoc = gAdLocs[impRequestProp];
            if (!adn.util.isString(impRequestLoc)) {
              adn.out.output("Missing a imp request location", "send" + feedbackText + "Impression", gAdLocs, impRequestProp);
              return;
            }
            var isAttention = impRequestProp.indexOf("attention") > -1;
            if (spec.displayStatus === ENUMS.displayStatus.displayed && (spec[specProp] === ENUMS[specProp][constantCheckProp] || isAttention)) {
              var defaultArgs = {
                messageType: ENUMS.postMessageType.toParentAdVisibilityEvent,
                widgetId: spec.widgetId,
                adId: spec.adId,
                creativeId: spec.creativeId,
                lineItemId: spec.lineItemId,
                creativeSetId: spec.creativeSetId,
                orderId: spec.orderId,
                viewability: spec.viewability,
                attention: spec.attention,
                spec: spec,
                callbackProp: callbackProp,
                feedbackText: feedbackText,
                isDivContainer: spec.isDivContainer,
                impRequestLoc: impRequestLoc
              };

              var afterComplete = function() {
                spec[specProp] = ENUMS[specProp][constantPostProp];
                if (!misc.isWidgetId(spec.widgetId)) {
                  return adn.out.devOutput("Couldn't find a widget ID", "sendImpression", spec);
                }
                misc.postMessageToParent(defaultArgs);
              };

              if (spec.impReg || (!misc.canAccessLocalStorage() && adn.lib.isParentTopWindow())) {
                defaultArgs.delayedImpression = true;
                afterComplete();
              } else {
                var extraParams = null;
                adn.util.forEach(VIEWABILITY_THRESHOLDS, function(vt) {
                  if (spec['viewability' + vt + 'Status'] === ENUMS.viewabilityStatus.viewed && spec.attention.indexOf(vt) < 0) {
                    extraParams = extraParams || {};
                    extraParams['v' + vt] = 1;
                    spec.attention = spec.attention || [];
                    spec.attention.push(vt);
                  }
                });
                if (!isAttention || extraParams) {
                  sendEvent(impRequestLoc, spec, feedbackText, spec.network, extraParams, isAttention);
                  afterComplete();
                }
              }
            }
          });
        };

        return {
          sendEventFromParent: function(impRequestLoc, spec, feedbackText, network) {
            sendEvent(impRequestLoc, spec, feedbackText, network);
          },
          sendClick: function(clickLoc) {
            sendEvent(clickLoc, {}, 'Click');
          },
          sendVisibilityImpressions: function() {
            sendImpression('visible', 'visibilityStatus', 'visible', 'visibleSent', 'Visible', 'onVisible');
          },
          sendViewableImpressions: function() {
            sendImpression('viewable', 'viewabilityStatus', 'viewed', 'viewSent', 'Viewable', 'onViewable');
          },
          sendAttentionImpressions: function() {
            sendImpression('attention', 'attentionStatus', 'attention', 'attentionSent', 'Attention', 'onAttention');
          },
          cancelProximityListeners: function() {
            adn.util.detachEventListener(win, 'resize', readings.takeProximity);
            adn.util.detachEventListener(win, 'scroll', readings.takeProximity);
          },
          cancelViewabilityListeners: function() {
            adn.util.detachEventListener(win, 'resize', readings.takeViewability);
            adn.util.detachEventListener(win, 'scroll', readings.takeViewability);
          },
          initViewability: function() {
            if (adn.util.isTopWindow() && !misc.supportsIntersectionObserver()) {
              readings.takeViewability();
              if (mViewabilityRunner === false) {
                // interval time is set to a little more than 200 to make cover off any idiosyncracies in timing too early or whatnot
                mViewabilityRunner = win.setInterval(readings.takeViewability, 203);
              }
              adn.util.addEventListener(win, 'resize', readings.takeViewability);
              adn.util.addEventListener(win, 'scroll', readings.takeViewability);
            }
          },
          initProximity: function() {
            if (adn.util.isTopWindow()) {
              readings.takeProximity();
              adn.util.addEventListener(win, 'resize', readings.takeProximity);
              adn.util.addEventListener(win, 'scroll', readings.takeProximity);
            }
          },
          takeProximity: function() {
            var windowSize,
              scrollPos,
              wSpecs = adn.util.filter(gWidgetSpecs, function(w) {
                return (w.adStatus === ENUMS.adStatus.procured || misc.getParam(w.requestParams, 'load') === ENUMS.loadEnums.lazyRequest) && !w.withinBounds;
              });

            if (wSpecs.length === 0) {
              readings.cancelProximityListeners();
              return adn.out.devOutput("No more ads to proximity check", "takeProximityReading", gWidgetSpecs);
            }

            if (!adn.util.isTopWindow()) {
              return;
            }

            try {
              windowSize = adn.util.getWindowSize();
            } catch (e) {
              adn.out.output("takeProximityReading window size calcs off", e);
            }
            try {
              scrollPos = adn.util.getScrollPos();
            } catch (e) {
              adn.out.output("takeProximityReading scroll calcs off", e);
            }

            var rTokens = [];
            var renderedImpRequestLoc = "";
            adn.util.forEach(wSpecs, function(spec) {
              try {
                var widgetEl = misc.getDocEl(spec);
                if (!widgetEl) {
                  adn.out.devOutput("Missing appearance of element", "takeProximity", widgetEl, spec);
                  return;
                }
                var previousDisplay = widgetEl.style.display;
                if (previousDisplay.toLowerCase() === 'none') {
                  widgetEl.style.display = 'block';
                }

                var widgetPos = adn.util.getElementPosition(widgetEl),
                  widgetSize = {
                    width: widgetEl.offsetWidth,
                    height: widgetEl.offsetHeight
                  },
                  proximityLimit = adn.util.isNumber(misc.getParam(spec.requestParams, 'proximity')) ? misc.getParam(spec.requestParams, 'proximity') : ENUMS.defaultProximity;

                var viewportPos = {
                    top: scrollPos.top,
                    left: scrollPos.left,
                    bottom: scrollPos.top + windowSize.height,
                    right: scrollPos.left + windowSize.width
                  },
                  adPos = {
                    top: widgetPos.top,
                    left: widgetPos.left,
                    bottom: widgetPos.top + widgetSize.height,
                    right: widgetPos.left + widgetSize.width
                  },
                  distanceAdTopToViewportBottom = adPos.top - viewportPos.bottom,
                  distanceAdBottomToViewportTop = adPos.bottom - viewportPos.top,
                  distanceAdLeftToViewportRight = adPos.left - viewportPos.right,
                  withinYBounds = distanceAdTopToViewportBottom < proximityLimit && distanceAdBottomToViewportTop > (proximityLimit * -1),
                  withinXBounds = distanceAdLeftToViewportRight < proximityLimit;
                if (withinYBounds && withinXBounds) {
                  spec.withinBounds = true;
                  if (spec.adStatus === ENUMS.adStatus.procured) {
                    spec.adStatus = ENUMS.adStatus.distributed;

                    var composedAd = gComposedAds[spec.targetId];
                    if (!adn.util.isObject(composedAd)) {
                      return adn.out.output("Can't find composed ad details", "proximity", gComposedAds, spec);
                    }
                    var result = adn.lib.showAdContent(spec, composedAd);
                    if (adn.util.isTrue(result)) {
                      adn.util.forEach(composedAd.rts || [], function(rp) {
                        rTokens.push(rp);
                      });
                      renderedImpRequestLoc = composedAd.renderedImpRequestLoc;
                    }
                  }
                }
                widgetEl.style.display = previousDisplay;
              } catch (e) {
                adn.out.output("some catch error for takeProximityReading", e);
              }
            });
            adn.lib.sendRenderedImps(rTokens, renderedImpRequestLoc);
          },
          takeViewability: function(pTreatAsChildWindow) {
            var windowSize,
              triggerSendViewableImp = false,
              triggerSendVisibleImp = false,
              treatAsChildWindow = adn.util.isTrue(pTreatAsChildWindow),
              allSpecs = adn.util.isTopWindow() && !treatAsChildWindow ? gWidgetSpecs : gAdSpecs,
              specs = adn.util.filter(allSpecs, function(s) {
                return s.displayStatus === ENUMS.displayStatus.displayed && s.viewabilityStatus === ENUMS.viewabilityStatus.notViewed && !s.isNested && !s.preview;
              }),
              cancelIntervals = function() {
                win.clearInterval(mViewabilityRunner);
                mViewabilityRunner = false;
              };

            if (specs.length === 0) {
              readings.cancelViewabilityListeners();
              cancelIntervals();
              if (!adn.util.isTopWindow() || treatAsChildWindow) {
                misc.postMessageToParent({
                  messageType: ENUMS.postMessageType.toParentAllChildrenViewed,
                  widgetId: adn.inIframe.getIframeId(),
                  functionContext: ENUMS.functionContext.parent,
                  method: 'allChildrenViewed'
                });
              }
              return adn.out.devOutput("No more ads to viewability check", "takeViewabilityReadings", gWidgetSpecs, gAdSpecs, adn.util.isTopWindow());
            }

            try {
              windowSize = adn.util.getWindowSize();
              windowSize.width = Math.max(windowSize.width, 1);
              windowSize.height = Math.max(windowSize.height, 1);
              if (gWindowStats.prevWindowWidth !== windowSize.width || gWindowStats.prevWindowHeight !== windowSize.height) {
                gWindowStats.prevWindowWidth = windowSize.width;
                gWindowStats.prevWindowHeight = windowSize.height;
              }
            } catch (e) {
              adn.out.output("takeViewabilityReading window size calcs off", e);
            }
            var scrollPos;
            try {
              scrollPos = adn.util.getScrollPos();
              if (gWindowStats.prevScrollLeft !== scrollPos.left || gWindowStats.prevScrollTop !== scrollPos.top) {
                gWindowStats.prevScrollLeft = scrollPos.left;
                gWindowStats.prevScrollTop = scrollPos.top;
              }
              gWindowStats.maxViewLeft = Math.max(scrollPos.left + windowSize.width, gWindowStats.maxViewLeft);
              gWindowStats.maxViewTop = Math.max(scrollPos.top + windowSize.height, gWindowStats.maxViewTop);
            } catch (e) {
              adn.out.output("takeViewabilityReading scroll calcs off", e);
            }
            var now = new Date().getTime();
            var timeDelta;

            if (treatAsChildWindow) {
              gWindowStats.childPrevTime = gWindowStats.childPrevTime || {};
              var widgetId = specs[0].widgetId;
              gWindowStats.childPrevTime[widgetId] = gWindowStats.childPrevTime[widgetId] || new Date().getTime();
              timeDelta = now - gWindowStats.childPrevTime[widgetId];
              gWindowStats.childPrevTime[widgetId] = now;
            } else {
              gWindowStats.prevTime = gWindowStats.prevTime || new Date().getTime();
              timeDelta = now - gWindowStats.prevTime;
              gWindowStats.prevTime = now;
            }

            adn.util.forEach(specs, function(spec) {
              try {
                var widgetEl = doc.getElementById(spec.adId || spec.widgetId);
                if (!widgetEl) {
                  spec.viewabilityStatus = ENUMS.viewabilityStatus.divMissing;
                  adn.out.devOutput("Missing div", "takeViewabilityReading", spec);
                  return;
                }
                var widgetPos = adn.util.getElementPosition(widgetEl),
                  widgetSize = {
                    width: Math.max(widgetEl.offsetWidth, 1),
                    height: Math.max(widgetEl.offsetHeight, 1)
                  },
                  overlapLeft = Math.max(widgetPos.left, scrollPos.left),
                  overlapRight = Math.min(widgetPos.left + widgetSize.width, scrollPos.left + windowSize.width),
                  overlapTop = Math.max(widgetPos.top, scrollPos.top),
                  overlapBottom = Math.min(widgetPos.top + widgetSize.height, scrollPos.top + windowSize.height),
                  metricsFromParent = gWindowStats.metricsFromParent;

                if (!misc.isVisible(widgetEl)) {
                  // if you've hit this point, then the widget is hidden by a parent having display: none. As such, is not visible. This is distinguished from an ad that is 0x0, for instance, ad contents is just console.log("blah");
                  return;
                }

                if (metricsFromParent) {
                  var parentLeft = metricsFromParent.overlapPos.left + scrollPos.left,
                    parentRight = metricsFromParent.overlapPos.left + metricsFromParent.overlapSize.width + scrollPos.left,
                    parentTop = metricsFromParent.overlapPos.top + scrollPos.top,
                    parentBottom = metricsFromParent.overlapPos.top + metricsFromParent.overlapSize.height + scrollPos.top;

                  overlapLeft = Math.max(parentLeft, overlapLeft);
                  overlapRight = Math.min(parentRight, overlapRight);
                  overlapTop = Math.max(parentTop, overlapTop);
                  overlapBottom = Math.min(parentBottom, overlapBottom);
                }
                var overlapWidth = Math.max(overlapRight - overlapLeft, 0),
                  overlapHeight = Math.max(overlapBottom - overlapTop, 0),
                  viewablePercent = Math.round(overlapWidth * overlapHeight / (widgetSize.width * widgetSize.height) * 100);

                if (viewablePercent > ENUMS.defaultVisibilityPercentage && spec.visibilityStatus === ENUMS.visibilityStatus.notVisible) {
                  if (!adn.util.isTopWindow() || treatAsChildWindow) {
                    spec.visibilityStatus = ENUMS.visibilityStatus.visible;
                    triggerSendVisibleImp = true;
                  }
                }
                if (viewablePercent === 100 && spec.viewability.prevPercent === 100 && spec.viewability.timeFully < ENUMS.longestTime) {
                  spec.viewability.timeFully += timeDelta;
                }
                if (viewablePercent >= 50 && spec.viewability.prevPercent >= 50 && spec.viewability.timeHalf < ENUMS.longestTime) {
                  spec.viewability.timeHalf += timeDelta;
                }
                if (viewablePercent > 0 && spec.viewability.prevPercent > 0 && spec.viewability.timePartly < ENUMS.longestTime) {
                  spec.viewability.timePartly += timeDelta;
                } else {
                  spec.viewability.timeNone += timeDelta;
                }
                if (viewablePercent > spec.viewability.maxPercent) {
                  spec.viewability.maxPercent = viewablePercent;
                }
                spec.viewability.prevPercent = viewablePercent;

                if ((spec.viewability.timeFully > 1000 || spec.viewability.timeHalf > 1000) && spec.viewabilityStatus === ENUMS.viewabilityStatus.notViewed) {
                  if (!adn.util.isTopWindow() || treatAsChildWindow) {
                    spec.viewabilityStatus = ENUMS.viewabilityStatus.viewed;
                    triggerSendViewableImp = true;
                  }
                }

                if (adn.util.isTopWindow() && !treatAsChildWindow) {
                  var metrics = [now, scrollPos.left, scrollPos.top, windowSize.width, windowSize.height, widgetPos.left, widgetPos.top, widgetSize.width, widgetSize.height, overlapLeft - widgetPos.left, overlapTop - widgetPos.top, overlapWidth, overlapHeight];
                  adn.util.forEach(metrics, function(m, i) {
                    metrics[i] = Math.round(m);
                  });
                  misc.postMessageToChild(widgetEl, {
                    messageType: ENUMS.postMessageType.toChildViewability,
                    functionContext: ENUMS.functionContext.inIframe,
                    method: 'updateMetricsFromParent',
                    metricsFromParent: metrics.join(","),
                    metaData: cookies.getAllAdvStorageAsObj(spec.network),
                    isDivContainer: spec.container === ENUMS.container.div || spec.isDivContainer
                  });
                }
              } catch (e) {
                adn.out.output("takeViewabilityReading off", e);
              }
            });
            if (triggerSendVisibleImp) {
              readings.sendVisibilityImpressions();
            }
            if (triggerSendViewableImp) {
              readings.sendViewableImpressions();
            }
          }
        };
      }()),
      parentMethods = (function() {
        var checkArgs = function(args, func, theWidget) {
          if (!misc.isWidgetId(args.widgetId)) {
            var unregisteredWidget = doc.getElementById(args.widgetId);
            if (unregisteredWidget) {
              // this can happen via prebid calls
              return func.call(parentMethods, unregisteredWidget, {}, args);
            }
            return adn.out.output("Couldn't find a widget ID", "checkArgs", args);
          }
          var widgetSpec = gWidgetSpecs[args.widgetId];
          if (!widgetSpec && args.widgetId !== ENUMS.previewId) {
            return adn.out.output("Couldn't find widget specs for " + args.widgetId, "checkArgs", args);
          }
          var widget = theWidget || doc.getElementById(args.widgetId) || doc.getElementById(ENUMS.previewId);
          if (!widget) {
            return adn.out.output("Couldn't find widget in the document", "checkArgs", args, widget);
          }
          if (widgetSpec) {
            return func.call(parentMethods, widget, widgetSpec, args);
          }
        };

        var handleRestyle = function(widgetSpec, args) {
          if (widgetSpec && adn.util.isFunction(widgetSpec.onRestyle)) {
            var restyleArgs = {};
            misc.copyArgValues(restyleArgs, widgetSpec, PICK_DATA_PARAMETERS);
            misc.copyArgValues(restyleArgs, args, PICK_DATA_PARAMETERS);
            widgetSpec.onRestyle(misc.normalise(restyleArgs));
          }
        };

        return {
          allChildrenViewed: function(args) {
            var wSpec = gWidgetSpecs[args.widgetId];
            if (wSpec) {
              wSpec.visibilityStatus = ENUMS.visibilityStatus.visible;
              wSpec.viewabilityStatus = ENUMS.viewabilityStatus.viewed;
            }
          },
          updateIframe: function(args) {
            return checkArgs(args, function(widget, widgetSpec, args) {
              if (adn.util.isDefined(args.w)) {
                widget.width = args.w;
              }
              if (adn.util.isDefined(args.h)) {
                widget.height = args.h;
              }

              var targetEl = widget.parentNode;
              if (args.stack === 'relative') {
                targetEl.style.position = 'relative';
                widget.style.position = 'absolute';
              } else if (args.stack === 'fixed') {
                widget.style.position = 'fixed';
              } else if (args.stack === 'absolute') {
                if (!adn.util.isBlankString(targetEl.style.position) && targetEl.style.position === 'relative') {
                  targetEl.style.position = 'static';
                }
                widget.style.position = 'absolute';
              } else {
                if (!adn.util.isBlankString(widget.style.position) && widget.style.position !== 'static') {
                  widget.style.position = 'static';
                }

                if (adn.util.isDefined(widget.width)) {
                  targetEl.style.width = adn.util.dimension(widget.width);
                }
                if (adn.util.isDefined(widget.height)) {
                  targetEl.style.height = adn.util.dimension(widget.height);
                }
              }

              if (adn.util.isDefined(args.ifrStyle) && !adn.util.isBlankString(args.ifrStyle)) {
                misc.applyStyle(widget, args.ifrStyle);
              }
              if (adn.util.isDefined(args.targetStyle) && !adn.util.isBlankString(args.targetStyle)) {
                misc.applyStyle(targetEl, args.targetStyle);
              }

              handleRestyle(widgetSpec, args);
            });
          },
          triggerViewabilityReading: function(args) {
            checkArgs(args, function(widget, widgetSpec) {
              widgetSpec.adStatus = ENUMS.adStatus.processed;
              widgetSpec.displayStatus = ENUMS.displayStatus.displayed;
              readings.initViewability(widgetSpec);
            });
          },
          iframeResizer: function(args, displayNone, collapsible) {
            return checkArgs(args, function(widget, widgetSpec, args) {
              var theW = args.resizeToContent === ENUMS.resizeToContent.resizeCreative && args.definedDims ? args.definedDims.w : args.w;
              var theH = args.resizeToContent === ENUMS.resizeToContent.resizeCreative && args.definedDims ? args.definedDims.h : args.h;

              var parseW = parseInt(theW, 10),
                parseH = parseInt(theH, 10),
                isCollapsible = adn.util.isDefined(collapsible) ? collapsible : widgetSpec.collapsible;
              if (parseW < 0 || parseH < 0) {
                return adn.out.output("Invalid width (" + theW + ") and height (" + theH + ") for resize", "iframeResizer");
              }
              var zeroW = parseW === 0,
                zeroH = parseH === 0;

              if ((zeroW || zeroH) && !isCollapsible) {
                return adn.out.devOutput("Resize to zero not allowed -- ad unit is not collapsible", "iframeResizer", args, isCollapsible);
              }

              widget.width = theW;
              widget.height = theH;

              var targetEl = widget.parentNode;
              targetEl.style.width = adn.util.dimension(theW);
              targetEl.style.height = adn.util.dimension(theH);

              if ((zeroW || zeroH) && displayNone) {
                widget.style.display = 'none';
                targetEl.style.display = 'none';
              }
              adn.out.infoOutput("Resizing to " + widget.width + "x" + widget.height + " and " + targetEl.style.width + "-" + targetEl.style.height + " for " + args.widgetId, "iframeResizer", args);

              handleRestyle(widgetSpec, args);
            });
          },
          styleFromAds: function(args) {
            if (!misc.isWidgetId(args.widgetId)) {
              return adn.out.devOutput("missing widget ID", "styleFromAds", args);
            }
            var adCount = parseInt(args.retAdCount, 10);
            var widgetSpec = gWidgetSpecs[args.widgetId];
            var resizeArgs = {};
            misc.copyArgValues(resizeArgs, widgetSpec, PICK_DATA_PARAMETERS);
            misc.copyArgValues(resizeArgs, args, PICK_DATA_PARAMETERS);
            if (adCount === 0) {
              resizeArgs = misc.assign(resizeArgs, {w: 0, h: 0, retAdCount: 0, ads: []});
              parentMethods.iframeResizer(resizeArgs, gFeedback.inScreen !== ENUMS.feedback.inScreen.inAdUnit);
            } else if (adn.util.isNumber(adCount) && adCount > 0) {
              if (!widgetSpec || !adn.util.hasProperties(widgetSpec)) {
                return adn.out.output("Missing widget spec", "styleFromAds", args);
              }
              widgetSpec.displayStatus = ENUMS.displayStatus.displayed;
              readings.initViewability(widgetSpec);

              var theW = args.resizeToContent === ENUMS.resizeToContent.resizeCreative && args.definedDims ? args.definedDims.w : args.retAdsW;
              var theH = args.resizeToContent === ENUMS.resizeToContent.resizeCreative && args.definedDims ? args.definedDims.h : args.retAdsH;

              resizeArgs = misc.assign(resizeArgs, {w: parseInt(theW, 10), h: parseInt(theH, 10), retAdCount: args.retAdCount, ads: misc.generateAdData(args)});
              parentMethods.iframeResizer(resizeArgs, false, false);
            } else {
              return adn.out.output("adCount is not valid: " + adCount, "styleFromAds");
            }
          }
        };
      }());

    adn.inIframe = (function() {
      var resizeToContent = ENUMS.resizeToContent.resize,
        responseCtrStyle = "",
        windowEventSubs = {},
        onUpdateMetricsFromParent = [],
        onProcessAd = [],
        regFunctions = [],
        adInfoHandlers = {};

      misc.isTestAddress(win.location.href); // required to set dev mode

      pFrameMethods = {
        handleAdUnitInfo: function(args) {
          if (!args || !adn.util.isString(args.adUnitInfoId)) {
            return adn.out.output("Missing ad unit info id for ad unit info response", "handleAdUnitInfo", args);
          }
          var infoHandlers = adInfoHandlers[args.adUnitInfoId];
          if (!infoHandlers || !adn.util.isArray(infoHandlers) || infoHandlers.length < 1) {
            return adn.out.output("Missing some ad unit info response handlers", "handleAdUnitInfo", adInfoHandlers, args);
          }
          var adUnitInfo = args.adUnitInfo;
          var abridgedAdUnitInfo = misc.copyArgValues({}, adUnitInfo, ["auId", "latitude", "longitude", "adStatus", "auH", "auW", "collapsible", "display", "c", "kv", "keywords", "replacements", "auml", "ps", "displayStatus", "targetId", "targetClass", "widgetId", "functionCalls", "functions", "requestParams", "method", "onNoMatchedAds", "onImpressionResponse", "onPageLoad", "usi", "siteId", "userId", "segments", "userSegments", "resizeOnPageLoad", "ctx"]);
          adn.util.forEach(infoHandlers, function(h) {
            h(abridgedAdUnitInfo);
          });
        },
        handleChildPubs: function(args) {
          if (!adn.util.isObject(args) || !adn.util.isString(args.widgetId) || !adn.util.isString(args.event)) {
            return adn.out.output("Missing some args", "handleChildPubs", args);
          }
          adn.util.forEach(args.functionCalls || [], function(fc) {
            if (!fc || !fc.name) {
              adn.out.output("Missing a name parameter for a function call", "handleChildPubs", args);
              return;
            }
            var regFuncsToCall = adn.util.filter(regFunctions, function(regFunc) {
              return regFunc.name === fc.name && adn.util.isFunction(regFunc.func) && regFunc.isCalled !== true;
            });
            adn.util.forEach(regFuncsToCall || [], function(fToCall) {
              fToCall.func(fc.args);
              fToCall.isCalled = args.event !== ENUMS.events.CUSTOM && fc.event !== ENUMS.events.CUSTOM;
            });
          });
          adn.util.forEach(windowEventSubs[args.event] || [], function(eventFunc) {
            if (eventFunc.widgetId !== args.widgetId) {
              return;
            }
            var funcArgs = {};
            if (adn.util.isObject(args.windowDims)) {
              funcArgs.windowDims = args.windowDims;
            }
            if (adn.util.isObject(args.widgetDims)) {
              funcArgs.widgetDims = args.widgetDims;
            }
            if (adn.util.isObject(args.widgetParentDims)) {
              funcArgs.widgetParentDims = args.widgetParentDims;
            }
            eventFunc.cb(funcArgs);
          });
        },
        updateMetricsFromParent: function(args) {
          if (!args || !adn.util.isObject(args)) {
            return adn.out.devOutput("Missing required args", "updateMetricsFromParent", args);
          }
          if (args.metricsFromParent && !args.isDivContainer) {
            var values = args.metricsFromParent.split(",");
            adn.util.forEach(values, function(v, k) {
              values[k] = parseInt(v, 10);
            });
            gWindowStats.metricsFromParent = {
              updateTime: values[0],
              scrollPos: {
                left: values[1],
                top: values[2]
              },
              windowSize: {
                width: values[3],
                height: values[4]
              },
              widgetPos: {
                left: values[5],
                top: values[6]
              },
              widgetSize: {
                width: values[7],
                height: values[8]
              },
              overlapPos: {
                left: values[9],
                top: values[10]
              },
              overlapSize: {
                width: values[11],
                height: values[12]
              }
            };
          }
          if (args.metaData) {
            gWindowStats.metaData = args.metaData;
          }
          adn.util.forEach(onUpdateMetricsFromParent, function(func) {
            func();
          });
          onUpdateMetricsFromParent = [];
          if (!misc.supportsIntersectionObserver()) {
            readings.takeViewability(adn.util.isTrue(args.isDivContainer));
          }
        }
      };

      var registerSpecs = function(adId, type, threshold, maxTime, callback, creativeId, auId) {
        // creativeId and auId only there for debugging
        var id = adId + "|" + type;
        gSectionSpecs[id] = {
          id: id,
          adId: adId,
          type: type,
          threshold: threshold,
          maxTime: maxTime,
          success: false,
          callback: callback,
          viewabilityTimeout: false,
          auId: auId,
          creativeId: creativeId
        };

        var isCustomTiming = id.indexOf("customTiming") > -1;
        if (!isCustomTiming) {
          return;
        }

        var timeoutEventFunc = function() {
          var sectionSpec = gSectionSpecs[id];

          if (sectionSpec.success) {
            return;
          }

          if (sectionSpec.isBeingViewed) {
            sectionSpec.timeIntersect = (sectionSpec.timeIntersect || 0) + new Date().getTime() - sectionSpec.timeStart;
          }

          if (sectionSpec.timeIntersect > 0) {
            callback(sectionSpec);
          }
          sectionSpec = null;

          adn.util.forEach(UNLOAD_EVENTS, function(event) {
            adn.util.detachEventListener(win, event, timeoutEventFunc);
          });
        };
        adn.util.forEach(UNLOAD_EVENTS, function(event) {
          adn.util.addEventListener(win, event, timeoutEventFunc);
        });
        gSectionSpecs[id].timeoutEventFunc = timeoutEventFunc;
      };

      var resetObserver = function(timeoutMillis) {
        win.setTimeout(function() {
          if (!gGenObserverConfig || !adn.util.hasProperties(gSectionSpecs)) {
            return;
          }

          adn.util.forEach(gAdSpecs, function(adSpec) {
            var el = doc.getElementById(adSpec.adId);
            gGenObserverConfig.unobserve(el);
            gGenObserverConfig.observe(el);

            gViewableConfig.unobserve(el);
            gViewableConfig.observe(el);
          });
        }, timeoutMillis || 550);
      };

      var successIds = [];
      var viewThreshold = function(data) {
        // find the latest intersection entry, which will give the best current estimate of intersection threshold.
        var narrowedData = {};
        adn.util.forEach(data, function(checkDatum) {
          var idOfElement = checkDatum.target.id;
          if (!narrowedData[idOfElement] || narrowedData[idOfElement].time < checkDatum.time) {
            narrowedData[idOfElement] = checkDatum;
          }
        });

        adn.util.forEach(narrowedData, function(datum) {
          adn.util.forEach(gSectionSpecs, function(sectionSpec) {
            if (sectionSpec.success) {
              return;
            }

            var idOfElement = datum.target.id;
            if (idOfElement !== sectionSpec.adId) {
              return;
            }

            var viewedEnum = ENUMS.viewabilityStatus.viewed;
            if (sectionSpec.type.indexOf("visibility") > -1) {
              viewedEnum = ENUMS.visibilityStatus.visible;
            }

            var successCallback = function() {
              successIds.push(sectionSpec.id);
              gAdSpecs[sectionSpec.adId][sectionSpec.type + "Status"] = viewedEnum;
              sectionSpec.timeIntersect = (sectionSpec.timeIntersect || 0) + new Date().getTime() - sectionSpec.timeStart;
              sectionSpec.callback(sectionSpec);
              win.clearTimeout(sectionSpec.viewabilityTimeout);
              sectionSpec.viewabilityTimeout = false;
              sectionSpec.success = true;
              if (sectionSpec.timeoutEventFunc) {
                adn.util.forEach(UNLOAD_EVENTS, function(event) {
                  adn.util.detachEventListener(win, event, sectionSpec.timeoutEventFunc);
                });
              }
              resetObserver(50);
            };

            var now = new Date().getTime();
            if ((datum.intersectionRatio > 0 && datum.intersectionRatio >= sectionSpec.threshold) || (sectionSpec.threshold === 0 && datum.isIntersecting)) {
              // is currently being viewed
              if (sectionSpec.maxTime < 5) {
                sectionSpec.timeStart = now;
                sectionSpec.timeIntersect = Math.max(sectionSpec.maxTime, 1);
                successCallback();
              } else {
                if (!sectionSpec.viewabilityTimeout && !sectionSpec.success) {
                  sectionSpec.timeStart = now;
                  var successTime = sectionSpec.maxTime - (sectionSpec.timeIntersect || 0);
                  win.clearTimeout(sectionSpec.viewabilityTimeout);
                  sectionSpec.viewabilityTimeout = win.setTimeout(successCallback, successTime);
                }
              }
              sectionSpec.isBeingViewed = true;
            } else {
              // is currently unviewed
              if (sectionSpec.viewabilityTimeout && sectionSpec.timeStart > 0) {
                sectionSpec.timeIntersect = (sectionSpec.timeIntersect || 0) + new Date().getTime() - sectionSpec.timeStart;
                sectionSpec.timeStart = 0;
                win.clearTimeout(sectionSpec.viewabilityTimeout);
                sectionSpec.viewabilityTimeout = false;
                sectionSpec.isBeingViewed = false;
              }
            }
          });
        });
        adn.util.forEach(successIds, function(sid) {
          delete gSectionSpecs[sid];
        });
        successIds.length = 0;
      };

      var processAd = function(iframeId, containerId, matchedAdCount) {
        var info = misc.getAdsInfo(containerId);
        if (!info.adsDivEl) {
          return adn.out.output("Can't find the ads container", "processAd", iframeId, containerId, matchedAdCount, info);
        }
        var widgetSpec = (gWidgetSpecs || {})[iframeId] || {};
        gAdLocs = adn.lib.getRequestLocs({env: gDevMode ? 'http://localhost:8000/test/i' : widgetSpec.env || adn.lib.getEnv(), dn: adn.lib.getDn(), adServerHost: info.adServerHost, subdomain: info.subdomain}, false);

        // isNested lets you know if the Adnuntius ad is a third-party creative in another ad server
        var isDivContainer = info.adsDivEl && info.adsDivEl.tagName.toLowerCase() === 'div' && (info.adsDivEl.className.indexOf(ENUMS.nativeClass) > -1 || (containerId !== adn.inIframe.getResponseCtrId() || containerId.indexOf(ENUMS.widgetIdPrefix) === 0));
        var isNested = (!isDivContainer && (!iframeId || !adn.lib.isParentTopWindow()) || (isDivContainer && (!iframeId || !adn.util.isTopWindow())));

        var insElements = info.adsDivEl.getElementsByTagName("ins");
        adn.util.forEach(insElements, function(insEl) {
          // this is being done for responsive google ads
          if (insEl.className && insEl.className.indexOf("dcmads") > -1 && insEl.style.display === "inline-block" && parseInt(insEl.style.width, 10) === 1 && parseInt(insEl.style.height, 10) === 1) {
            adn.inIframe.setAsResponsive();
          }
        });
        if (responseCtrStyle) {
          var els = doc.getElementsByClassName("responseCtr");
          adn.util.forEach(els, function(el) {
            el.style.display = "block";
          });
        }

        if (matchedAdCount === 0) {
          misc.postMessageToParent({
            messageType: ENUMS.postMessageType.toParentImpression,
            method: 'styleFromAds',
            retAdCount: matchedAdCount,
            retAdsW: info.contentDims.w,
            retAdsH: info.contentDims.h,
            definedDims: info.definedDims,
            dims: {w: info.contentDims.w, h: info.contentDims.h},
            ads: [],
            widgetId: iframeId,
            adServerHost: info.adServerHost,
            isDivContainer: isDivContainer
          });
          return;
        }

        // because of prebid, multiple processAdResponses are possible, hence this protection against duplication
        var currentSetOfAds = {};
        var externalContainers = doc.getElementsByClassName(EXTERNAL_CONTAINER_CLASS);
        adn.util.forEach(info.ads, function(a) {
          if (gAdSpecs[a.id]) {
            return;
          }
          var adSpecData = {
            widgetId: iframeId,
            isNested: isNested,
            isDivContainer: isDivContainer,
            network: info.network,
            adId: a.id,
            auId: info.auId,
            dims: a.dims,
            subdomain: a.subdomain,
            definedDims: a.definedDims,
            retAdCount: matchedAdCount,
            adServerHost: info.adServerHost,
            creativeId: a.el.getAttribute('data-creative-id'),
            lineItemId: a.el.getAttribute('data-line-item-id'),
            rt: a.el.getAttribute(RT_DATA_ATTR),
            impReg: widgetSpec.impReg || misc.getImpReg(),
            adStatus: ENUMS.adStatus.processed,
            displayStatus: ENUMS.displayStatus.displayed,
            viewabilityStatus: ENUMS.viewabilityStatus.notViewed,
            visibilityStatus: ENUMS.visibilityStatus.notVisible,
            attentionStatus: ENUMS.attentionStatus.notAttention,
            viewability: misc.getNewViewability(),
            visibility: misc.getNewViewability(),
            attention: [],
            isPrebid: adn.util.isLoopable(externalContainers) && externalContainers.length > 0
          };
          gAdSpecs[a.id] = adSpecData;
          currentSetOfAds[a.id] = adSpecData;

          if (misc.supportsIntersectionObserver()) {
            var adId = a.id;

            registerSpecs(adId, 'visibility', 0, 1, function() {
              readings.sendVisibilityImpressions();
            }, adSpecData.creativeId, adSpecData.auId);

            adn.util.forEach(VIEWABILITY_THRESHOLDS, function(vt) {
              registerSpecs(adId, "viewability" + vt, vt / 100, 990, function() {
                if (vt >= 95) {
                  win.setTimeout(function() {
                    // wait a tad to ensure all the other viewability events get registered
                    readings.sendAttentionImpressions();
                  }, 100);
                }
              }, adSpecData.creativeId, adSpecData.auId);
            });
            adn.util.forEach(UNLOAD_EVENTS, function(event) {
              adn.util.addEventListener(win, event, function() {
                readings.sendAttentionImpressions();
              });
            });
            registerSpecs(adId, "viewability", 0.5, 1000, function() {
              win.setTimeout(function() {
                // just another timeout here to make sure the other viewability measures are triggered before sending info to adserver
                readings.sendViewableImpressions();

                function repeatUntilAttentionSent() {
                  var adSpec = gAdSpecs[adId];
                  if (adSpec.attentionStatus === ENUMS.attentionStatus.attentionSent || adSpec.attention.length === VIEWABILITY_THRESHOLDS.length) {
                    return;
                  }
                  readings.sendAttentionImpressions();
                  win.setTimeout(repeatUntilAttentionSent, 10000);
                }
                repeatUntilAttentionSent();

              }, 5);
            }, adSpecData.creativeId, adSpecData.auId);

            // do this after onProcessAd to ensure that all recordInScreen are already registered
            gGenObserverConfig = gGenObserverConfig || new win.IntersectionObserver(viewThreshold, {
              root: null,
              rootMargin: '0px',
              threshold: [0, 0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, 0.8, 0.9, 0.95, 1]
            });
            var el = doc.getElementById(adSpecData.adId);
            gGenObserverConfig.observe(el);

            gViewableConfig = gViewableConfig || new win.IntersectionObserver(viewThreshold, {
              root: null,
              rootMargin: '0px',
              threshold: 0.5
            });
            gViewableConfig.observe(el);

            gVisibleConfig = gVisibleConfig || new win.IntersectionObserver(viewThreshold, {
              root: null,
              rootMargin: '0px',
              threshold: 0
            });
            gVisibleConfig.observe(el);
          }
        });

        if (!adn.util.hasProperties(currentSetOfAds)) {
          return;
        }

        // this section is for SSP creatives and overlaying a click counter where necessary.
        adn.util.forEach(externalContainers, function(contEl) {
          var cwElPerItemEl = contEl.parentNode;
          if (!cwElPerItemEl || !cwElPerItemEl.className || cwElPerItemEl.className.indexOf(ENUMS.cwClass) < 0) {
            return;
          }
          adn.util.addEventListener(cwElPerItemEl, 'click', function(e) {
            var linkNode = e.target;
            while (linkNode && linkNode.nodeName.toLowerCase() !== 'a') {
              linkNode = linkNode.parentNode;
            }
            if (linkNode) {
              var urls = [contEl.getAttribute("data-click-url"), contEl.getAttribute("data-click-tracking-url")];
              adn.util.forEach(urls, function(url) {
                if (adn.util.isStringWithChars(url)) {
                  readings.sendClick(url);
                }
              });
            }
          });
        });

        adn.util.forEach(onProcessAd, function(processAdObj) {
          if (currentSetOfAds[processAdObj.adId]) {
            processAdObj.func();
          }
        });

        onProcessAd = adn.util.filter(onProcessAd, function(processAdObj) {
          return !currentSetOfAds[processAdObj.adId];
        });

        if (!misc.isWidgetId(iframeId)) {
          return adn.out.devOutput("Couldn't derive a widget ID", "processAd", iframeId, containerId, matchedAdCount);
        }
        var exampleMsg = {
          messageType: ENUMS.postMessageType.toParentImpression,
          method: adn.inIframe.getResize() === ENUMS.resizeToContent.resize || adn.inIframe.getResize() === ENUMS.resizeToContent.resizeCreative ? 'styleFromAds' : 'triggerViewabilityReading',
          resizeToContent: adn.inIframe.getResize(),
          retAdCount: matchedAdCount,
          retAdsW: info.contentDims.w,
          retAdsH: info.contentDims.h,
          definedDims: info.definedDims,
          adServerHost: info.adServerHost,
          dims: {w: info.contentDims.w, h: info.contentDims.h},
          ads: misc.generateAdData(null, info, currentSetOfAds),
          widgetId: iframeId,
          isDivContainer: isDivContainer
        };
        misc.postMessageToParent(exampleMsg);

        if (!adn.util.isArray(gEventListenerRegister[EVENT_TYPE_LOAD]) || gEventListenerRegister[EVENT_TYPE_LOAD].length < 1) {
          misc.onLoad(function() {
            ev.handleChildPageLoad({containerDiv: isDivContainer, widgetId: iframeId});
          });
        }
      };

      var findAdSpec = function(pAdSpec, adId) {
        return pAdSpec || adn.util.find(gAdSpecs, function(a) {
          return a.adId === adId;
        });
      };

      return {
        sendCustomEvent: function(args, customArgs, pAdSpec) {
          var adId = misc.getParam(args, 'id') || args;
          if (!adn.util.isDefined(adId) || !adn.util.isDefined(customArgs)) {
            return adn.out.output("Missing an ad ID to perform the custom event", "sendCustomEvent", args, customArgs);
          }
          var actuallySendCustomEvent = function(adSpec) {
            if (!adn.util.isObject(adSpec)) {
              return adn.out.output("Need an ad spec to send a custom event", "sendCustomEvent", gAdSpecs, args, customArgs);
            }
            if (!adn.util.isString(adSpec.rt)) {
              return adn.out.output("Need a response token on the spec object to send imp", "sendCustomEvent", adSpec, gAdSpecs, args, customArgs);
            }
            var customRequestLoc = adn.lib.getRequestLocs({env: gDevMode ? 'http://localhost:8000/test' : adn.lib.getEnv(), subdomain: adSpec.subdomain, dn: adn.lib.getDn()}).custom;
            if (adSpec && gWidgetSpecs && gWidgetSpecs[adSpec.widgetId]) {
              customRequestLoc = gWidgetSpecs[adSpec.widgetId].customRequestLoc;
            }
            if (!customRequestLoc) {
              return adn.out.output("Need a custom request loc", "sendCustomEvent", customRequestLoc, adSpec, gAdSpecs, args, customArgs);
            }
            var uncheckedEventArray = misc.getParam(customArgs, 'events') || [{
              customType: misc.getParam(customArgs, 'customType'),
              customValue: misc.getParam(customArgs, 'customValue')
            }];
            var checkedEventArray = [];
            adn.util.forEach(adn.util.isArray(uncheckedEventArray) ? uncheckedEventArray : [], function(event) {
              if (!adn.util.isString(misc.getParam(event, 'customType'))) {
                adn.out.output("Missing type for the custom event", "sendCustomEvent", event, args, customArgs);
                return;
              }
              var customValue = parseInt(misc.getParam(event, 'customValue'), 10);
              var customEvent = {
                customType: event.customType,
                customValue: adn.util.isNumber(customValue) ? customValue : 0
              };
              if (customEvent.customValue === 0) {
                delete customEvent.customValue;
              }
              checkedEventArray.push(customEvent);
            });

            if (checkedEventArray.length === 0) {
              return adn.out.output("Found no valid custom events", "sendCustomEvent", args, customArgs);
            }
            try {
              var loc = customRequestLoc + misc.encodeAsUrlParams({rt: adSpec.rt}, true);
              if (misc.isTestAddress(loc)) {
                adn.out.devOutput("Custom request loc being send", "sending", adSpec, loc);
              } else {
                var dataForSending = JSON.stringify({events: checkedEventArray});
                if (win.navigator && win.navigator && !misc.isUnitTest()) {
                  win.navigator.sendBeacon(loc, dataForSending);
                } else {
                  var ajax = adn.util.getNewAjax("POST", loc);
                  ajax.withCredentials = misc.canAccessLocalStorage() && !misc.isTestAddress(loc);
                  ajax.send(dataForSending);
                }
              }
            } catch (e) {
              adn.out.output("sending a custom event failed", e, gAdSpecs, args, customArgs);
            }
          };
          var makeEventHappen = function(adSpec) {
            if (misc.isSrcdocFrame() && !pAdSpec) {
              return misc.postMessageToParent({
                args: args,
                customArgs: customArgs,
                pAdSpec: adSpec,
                messageType: ENUMS.postMessageType.toParentCustomEvent
              });
            }
            actuallySendCustomEvent(adSpec);
          };
          var adSpec = findAdSpec(pAdSpec, adId);
          if (adSpec) {
            makeEventHappen(adSpec);
          } else {
            onProcessAd.push({
              adId: adId, func: function() {
                return makeEventHappen(findAdSpec(pAdSpec, adId));
              }
            });
          }
        },
        intersectionCallback: function(args, config) {
          if (!adn.util.isFunction(config.callback)) {
            return adn.out.output("Need a callback registered", "intersectionCallback", config);
          }
          var adjustedConfig = misc.assign({}, config);
          adjustedConfig.recordType = 'intersection';
          adjustedConfig.maxTime = config.maxTime || 0;
          adn.inIframe.recordInScreen(args, adn.util.isStringWithChars(adjustedConfig.id) ? adjustedConfig.id : misc.uuid(), adjustedConfig);
        },
        recordInScreen: function(args, customEventType, config) {
          if (!misc.supportsIntersectionObserver()) {
            return adn.out.devOutput("Browser doesn't support IntersectionObserver -- cannot do timing.", "recordInScreen");
          }

          var adId = misc.getParam(args, 'id') || args;
          var adSpec = findAdSpec(null, adId);

          var pThreshold = parseFloat(misc.getParam(config, 'threshold')) / 100;
          var threshold = pThreshold >= 0 && pThreshold <= 1 ? pThreshold : 0.5;
          if (adn.util.isDefined(pThreshold) && threshold !== pThreshold) {
            adn.out.output("Threshold needs to be between 0 and 100. Using default value of " + (threshold * 100) + " instead.", "recordInScreen", config);
          }

          var oneMinute = 1000 * 60;
          var defaultTime = oneMinute * 2;
          var pMaxTime = misc.getParam(config, 'maxTime');
          var maxTime = pMaxTime >= 0 ? pMaxTime : defaultTime;
          if (adn.util.isDefined(maxTime) && pMaxTime !== maxTime) {
            adn.out.output("Max time needs to be greater than 0. Using default value of " + maxTime + " instead.", "recordInScreen", config);
          }

          if (!adn.util.isStringWithChars(adId)) {
            return adn.out.output("Cannot register in screen without an adId.", "recordInScreen", adId, customEventType, config);
          }
          if (!adn.util.isStringWithChars(customEventType)) {
            return adn.out.output("Cannot register in screen without a custom event type.", "recordInScreen", adId, customEventType, config);
          }

          var doObservation = function() {
            registerSpecs(adId, "customTiming" + customEventType + "-" + misc.uuid(), threshold, maxTime, function(data) {
              if (config && config.recordType === 'intersection') {
                return config.callback({adId: adId, id: customEventType, timeIntersect: data.timeIntersect, criteriaMet: data.timeIntersect + 500 >= maxTime});
              }
              var currentSpec = gAdSpecs[adId] ? gAdSpecs[adId] : null;
              adn.inIframe.sendCustomEvent(args, {customType: customEventType, customValue: Math.min(data.timeIntersect, maxTime)}, currentSpec);
            }, adSpec ? adSpec.creativeId : null);
          };
          if (adSpec) {
            doObservation();
          } else {
            onProcessAd.push({
              adId: adId, func: function() {
                doObservation();
              }
            });
          }
        },
        getResponseCtrId: function(hookEl) {
          var refEl = adn.util.isObject(hookEl) && adn.util.isFunction(hookEl.getElementsByTagName) ? hookEl : doc;
          var els = refEl.getElementsByTagName("div");
          var selEl;
          adn.util.forEach(els, function(el) {
            if (el.id.indexOf("adn-rsp-") === 0) {
              selEl = el;
              return false;
            }
            if (!selEl && el.id.indexOf(ENUMS.widgetIdPrefix) === 0) {
              selEl = el;
            }
          });
          return selEl ? selEl.id : "responseCtr";
        },
        blockViewability: function(adId) {
          if (!adn.util.isStringWithChars(adId)) {
            return adn.out.output("Need to supply the ad id to block viewability", "blockViewability", adId);
          }
          gAdSpecs[adId] = gAdSpecs[adId] || {};
          gAdSpecs[adId].viewabilityStatus = ENUMS.viewabilityStatus.blocked;
        },
        resizeToCreativeDimensions: function() {
          resizeToContent = ENUMS.resizeToContent.resizeCreative;
        },
        blockResizeToContent: function() {
          resizeToContent = ENUMS.resizeToContent.none;
        },
        setAsResponsive: function() {
          resizeToContent = ENUMS.resizeToContent.none;
          responseCtrStyle = "block";
        },
        isResizeToContent: function() {
          // here for backwards-compatibility
          return resizeToContent === ENUMS.resizeToContent.resize;
        },
        getResize: function() {
          return resizeToContent;
        },
        getAdRequestInfo: function(args) {
          if (!args || !adn.util.isFunction(args.onInfoReceived)) {
            return adn.out.output("Need onData function populated", "getAdRequestInfo", args);
          }
          var adUnitInfoId = args.adUnitInfoId || "adUnitInfoId-" + Math.random();
          adInfoHandlers[adUnitInfoId] = adInfoHandlers[adUnitInfoId] || [];
          adInfoHandlers[adUnitInfoId].push(args.onInfoReceived);
          misc.postMessageToParent({
            messageType: ENUMS.postMessageType.toParentGetAdUnitInfo,
            adUnitInfoId: adUnitInfoId,
            widgetId: adn.inIframe.getIframeId()
          });
        },
        registerFunction: function(argsOrName, pFunc) {
          if (!argsOrName) {
            return adn.out.output("Missing important parameters", "registerFunction", argsOrName);
          }
          var name = adn.util.isString(argsOrName) ? argsOrName : argsOrName.name;
          var func = adn.util.isFunction(pFunc) ? pFunc : argsOrName.func;
          if (!adn.util.isString(name) || !adn.util.isFunction(func)) {
            return adn.out.output("Missing important parameters", argsOrName);
          }
          regFunctions.push({name: name, func: func});
        },
        processRenderedImps: function(renderedImpsIframeUrls, network) {
          if (!adn.util.isArray(renderedImpsIframeUrls)) {
            return adn.out.devOutput("Problem with rendered imps", "processRenderedImps", renderedImpsIframeUrls, network);
          }
          try {
            var renderedInfo = adn.util.map(renderedImpsIframeUrls, function(rurls) {
              if (!adn.util.isString(rurls)) {
                return {loc: '', token: ''};
              }
              var info = rurls.split("/b/");
              if (info.length !== 2) {
                info = ["", ""];
              }
              return {
                loc: info[0] + "/b/",
                token: info[1].replace(".html", "")
              };
            });
            var validRenderedInfo = adn.util.filter(renderedInfo, function(ri) {
              return ri.loc.indexOf("http") === 0 && ri.token.indexOf(".html") < 0;
            });
            if (validRenderedInfo.length !== renderedImpsIframeUrls.length) {
              return adn.out.devOutput("Problem figuring out things on rendered imps", "processRenderedImps", renderedImpsIframeUrls, validRenderedInfo);
            }
            var tokens = adn.util.map(validRenderedInfo, function(ri) {
              return ri.token;
            });
            var renderedLoc = validRenderedInfo[0].loc + "?tzo=" + new Date().getTimezoneOffset();
            return adn.lib.sendRenderedImps(tokens, renderedLoc, network);
          } catch (e) {
            adn.out.devOutput("Problem with rendered imps", "processRenderedImps", renderedImpsIframeUrls, e);
          }
          return false;
        },
        processAdResponse: function(args) {
          if (!args || !adn.util.isNumber(args.matchedAdCount)) {
            return adn.out.output("Missing the necessary args in " + args, "resizeAds");
          }
          var iframeId = args.widgetId;
          var containerId = args.widgetId;
          if (!iframeId) {
            iframeId = adn.inIframe.getIframeId();
            containerId = adn.inIframe.getResponseCtrId();
          }
          if (!iframeId && adn.lib.isParentTopWindow()) {
            return adn.out.devOutput("Unable to find iframeId", "processAdResponse", iframeId, args);
          }
          processAd(iframeId, containerId, args.matchedAdCount);
        },
        callParentFunction: function(funcName, args) {
          if (!adn.util.isStringWithChars(funcName)) {
            return adn.out.output("Missing the necessary args in " + funcName, "callParentFunction");
          }
          misc.postMessageToParent({
            messageType: ENUMS.postMessageType.toParentFunctions,
            widgetId: adn.inIframe.getIframeId(),
            name: funcName,
            args: args
          });
        },
        registerPrebidRendered: function(adId, rt, isRendered) {
          var renderedLoc = gAdLocs.rendered || adn.lib.getRequestLocs({env: gDevMode ? 'http://localhost:8000/test/i' : adn.lib.getEnv()}, false).rendered;
          adn.out.devOutput("Prebid rendered", "registerPrebidRendered", adId, rt, isRendered, renderedLoc);
          if (isRendered && renderedLoc) {
            // this should get called when we deliver a prebid ad when we are the primary ad server
            adn.lib.sendRenderedImps([rt], renderedLoc);
          }
        },
        getIframeArgs: function(url) {
          return misc.combineArgs(misc.parseUrlArgs(url), misc.parseHashArgs(url));
        },
        getIframeId: function(widgetId) {
          if (widgetId && widgetId.indexOf(ENUMS.widgetIdPrefix) === 0) {
            return widgetId;
          }
          var iframeId = doc.getElementsByTagName("body")[0].id;
          if (iframeId && iframeId.indexOf(ENUMS.widgetIdPrefix) === 0) {
            return iframeId;
          }
          var urlIfrId = adn.inIframe.getIframeArgs().ifrId;
          if (adn.util.isStringWithChars(urlIfrId) && urlIfrId !== ENUMS.previewId) {
            return urlIfrId;
          }
          var fallbackId = "";
          if (urlIfrId === ENUMS.previewId) {
            fallbackId = ENUMS.previewId;
          }
          var iframe = adn.util.getFrameElement();
          if (adn.util.isDefined(iframe) && !iframe.id) {
            iframe.id = "adn-sup-" + Math.random();
          }
          return adn.util.isDefined(iframe) ? iframe.id : fallbackId;
        },
        parentSubscribeEvent: function(args) {
          if (!adn.util.isObject(args) || !adn.util.isString(args.event) || !adn.util.isString(args.ifrId) || !adn.util.isFunction(args.cb)) {
            return adn.out.output("Need better args", "parentSubscribeEvent", args);
          }
          misc.postMessageToParent({
            messageType: ENUMS.postMessageType.toParentSubscribe,
            event: args.event,
            widgetId: args.ifrId
          });
          windowEventSubs[args.event] = windowEventSubs[args.event] || [];
          windowEventSubs[args.event].push({widgetId: args.ifrId, cb: args.cb});
        },
        updateAd: function(args) {
          if (!args || !args.ifrId) {
            return adn.out.output("Need arguments and an iframe id", "inIframe", args);
          }
          var info = misc.getAdsInfo(args.ifrId);
          var method = args.method || 'updateIframe';
          var targetStyle = args.targetStyle || args.parentStyle; // here for backwards-compatibility
          var message = {
            messageType: ENUMS.postMessageType.toParentUpdateAd,
            method: method,
            w: args.ifrW || '',
            h: args.ifrH || '',
            ads: misc.generateAdData(null, info, gAdSpecs),
            params: adn.util.isObject(args.params) ? args.params : '',
            ifrStyle: adn.util.isObject(args.ifrStyle) ? args.ifrStyle : '',
            targetStyle: adn.util.isObject(targetStyle) ? targetStyle : '',
            widgetId: args.ifrId,
            stack: args.stack || 'static'
          };
          if (!args.el || !args.event) {
            misc.postMessageToParent(message);
            return;
          }
          adn.util.addEventListener(args.el, args.event, adn.util.createDelegate(adn.util, function(e) {
            misc.postMessageToParent(message);

            if (args.cb) {
              if (!adn.util.isFunction(args.cb)) {
                return adn.out.output("Callback supplied not a function", "inIframe");
              }
              args.cb(e, args);
            }
          }));
        }
      };
    }());

    (function() {
      var mAdUnits, mCreatives;

      var initMemberVariables = function(args) {
        var locs = adn.lib.getRequestLocs(args, true);
        mAdUnits = [];
        mCreatives = [];

        if (gKeywords.length === 0) {
          var metaKeywords = doc.querySelector("meta[name='keywords']");
          if (metaKeywords && metaKeywords.content) {
            gKeywords = adn.util.uniques(adn.util.map(metaKeywords.content.split(","), function(k) {
              return adn.util.trim(k);
            })).slice(0, 100);
          }
        }

        var initAdUnit = function(requestId, dataStore, argsAu, argsParent, requestArgs) {
          var pArgs = adn.util.isObject(argsParent) ? misc.clone(argsParent) : {};
          var randomNum = Math.random();

          var auKeywords = argsAu.keywords || pArgs.keywords || [];
          if (adn.util.isString(auKeywords)) {
            auKeywords = [auKeywords];
          }
          var kws = auKeywords.length > 0 ? adn.util.uniques(gKeywords.concat(auKeywords)) : gKeywords;
          var canonicalEl = doc.querySelector("link[rel='canonical']");
          var canonicalLink = canonicalEl ? canonicalEl.href || canonicalEl.getAttribute('href') : undefined;
          var data = {
            requestId: requestId,
            auId: argsAu.auId || argsAu.targetId || argsAu.widgetId,
            requestArgs: requestArgs,
            parentArgs: argsParent,
            auArgs: argsAu,
            mode: pArgs.mode || argsAu.mode,
            format: ENUMS.validFormats[argsAu.format || "--"],
            clickTrackingUrl: argsAu.clickTrackingUrl || "",
            clickTrackingUrlEsc: argsAu.clickTrackingUrlEsc || "",
            creativeTag: argsAu.creativeTag || false,
            lineItemId: argsAu.lineItemId,
            creativeId: argsAu.creativeId,
            creativeSetId: argsAu.creativeSetId,
            orderId: argsAu.orderId,
            targeting: argsAu.targeting,
            creativeData: argsAu.creativeData,
            creativeContent: argsAu.creativeContent,
            network: pArgs.network || argsAu.network,
            ranked: pArgs.ranked || argsAu.ranked,
            requestMode: ENUMS.requestMode[pArgs.requestMode || argsAu.requestMode] || ENUMS.requestMode.DEFAULT,
            networkId: argsAu.networkId || pArgs.networkId,
            timingFunc: argsAu.timingFunc || pArgs.timingFunc,
            widgetId: argsAu.widgetId || ENUMS.widgetIdPrefix + randomNum,
            hash: argsAu.hash,
            auW: argsAu.auW || argsAu.creativeWidth || 0,
            auH: argsAu.auH || argsAu.creativeHeight || 0,
            display: argsAu.display || undefined,
            dimensions: adn.util.isArray(argsAu.dimensions) && argsAu.dimensions.length > 0 && adn.util.isArray(argsAu.dimensions[0]) && argsAu.dimensions[0].length === 2 ? argsAu.dimensions : undefined,
            c: argsAu.c || pArgs.c || undefined,
            gdpr: argsAu.gdpr || pArgs.gdpr || undefined,
            consentString: argsAu.consentString || pArgs.consentString || undefined,
            ctx: argsAu.ctx || pArgs.ctx || win.location.href || doc.referrer,
            canonical: argsAu.canonical || pArgs.canonical || canonicalLink,
            kv: argsAu.kv || pArgs.kv || undefined,
            keywords: kws.length > 0 ? kws : undefined,
            auml: argsAu.auml || undefined,
            native: argsAu.native || pArgs.native || false,
            replacements: argsAu.replacements || pArgs.replacements,
            segments: argsAu.segments || pArgs.segments,
            userSegments: pArgs.userSegments || argsAu.userSegments,
            ps: adn.util.isNumber(argsAu.ps) ? argsAu.ps : undefined,
            adStatus: ENUMS.adStatus.init,
            displayStatus: ENUMS.displayStatus.notDisplayed,
            container: ENUMS.container[(argsAu.container || pArgs.container || 'nothing')] || ENUMS.container.iframe,
            env: argsAu.env || pArgs.env || ENUMS.env.production.id,
            dn: argsAu.dn || pArgs.dn || false,
            sdk: argsAu.sdk || pArgs.sdk || false,
            viewabilityStatus: ENUMS.viewabilityStatus.notViewed,
            visibilityStatus: ENUMS.visibilityStatus.notVisible,
            impRequestLoc: locs.imp,
            floorPrice: argsAu.floorPrice || pArgs.floorPrice || undefined,
            protocol: argsAu.protocol || pArgs.protocol || undefined,
            renderedImpRequestLoc: locs.rendered,
            viewImpRequestLoc: locs.viewable,
            visImpRequestLoc: locs.visible,
            customRequestLoc: locs.custom,
            previewLoc: locs.preview,
            headerBids: argsAu.headerBids || pArgs.headerBids,
            functionCalls: argsAu.functionCalls || pArgs.functionCalls,
            functions: argsAu.functions || pArgs.functions,
            requestParams: misc.assign(pArgs.requestParams || {}, argsAu.requestParams || {}),
            collapsible: argsAu.collapsible !== false,
            method: pArgs.method || argsAu.method,
            devScript: argsAu.devScript || false,
            excludedCreatives: pArgs.excludedCreatives || [],
            excludedLineItems: pArgs.excludedLineItems || [],
            onError: argsAu.onError || pArgs.onError || adn.util.noop,
            onVisible: argsAu.onVisible || pArgs.onVisible || adn.util.noop,
            onViewable: argsAu.onViewable || pArgs.onViewable || adn.util.noop,
            onNoMatchedAds: argsAu.onNoMatchedAds || pArgs.onNoMatchedAds,
            hasResponse: false,
            onResponse: argsAu.onResponse || pArgs.onResponse,
            onImpressionResponse: argsAu.onImpressionResponse || pArgs.onImpressionResponse,
            onPageLoad: argsAu.onPageLoad || pArgs.onPageLoad,
            onRestyle: argsAu.onRestyle || pArgs.onRestyle,
            siteId: argsAu.siteId || pArgs.siteId,
            usi: argsAu.usi || pArgs.usi,
            userId: argsAu.userId || pArgs.userId,
            useCookies: !(argsAu.useCookies === false || pArgs.useCookies === false),
            latitude: argsAu.latitude || pArgs.latitude,
            longitude: argsAu.longitude || pArgs.longitude,
            clearTarget: adn.util.isDefined(argsAu.clearTarget) ? argsAu.clearTarget : adn.util.isTrue(pArgs.clearTarget),
            targetClass: pArgs.targetClass || argsAu.targetClass,
            externalId: requestArgs.externalId,
            impReg: ENUMS.impReg[requestArgs.impReg] ? requestArgs.impReg : undefined,
            targetId: argsAu.targetId || ("adn-" + (argsAu.auId || argsAu.creativeId) + ((pArgs.targetClass || argsAu.targetClass) ? randomNum : "")),
            isolateFrame: adn.util.isDefined(argsAu.isolateFrame) ? argsAu.isolateFrame : (pArgs.isolateFrame || false),
            blockScript: adn.util.isDefined(argsAu.blockScript) ? argsAu.blockScript : (pArgs.blockScript || false),
            isolateSubFrame: adn.util.isDefined(argsAu.isolateSubFrame) ? argsAu.isolateSubFrame : (pArgs.isolateSubFrame || false),
            serverUrl: locs.imp,
            resizeOnPageLoad: adn.util.isDefined(argsAu.resizeOnPageLoad) ? argsAu.resizeOnPageLoad : pArgs.resizeOnPageLoad,
            viewability: misc.getNewViewability(),
            attention: []
          };
          if (adn.util.isStringWithChars(argsAu.scriptOverride) || adn.util.isStringWithChars(pArgs.scriptOverride)) {
            misc.getAndSetScriptOverride(false, argsAu.scriptOverride || pArgs.scriptOverride);
          }
          try {
            if ((data.ctx || "").indexOf("context.html") < 0 && (win.parent.location.href || win.parent.document.referrer)) {
              data.ctx = argsAu.ctx || pArgs.ctx || win.parent.location.href || win.parent.document.referrer;
              if ((data.ctx || "").indexOf("safeframe.googlesyndication.com") > -1) {
                data.ctx = argsAu.ctx || pArgs.ctx || win.parent.document.referrer || win.parent.location.href;
              }
            }
          } catch (e) {
            if ((data.ctx || "").indexOf("safeframe.googlesyndication.com") > -1) {
              data.ctx = argsAu.ctx || pArgs.ctx || doc.referrer || win.location.href;
            }
          }
          if (data.auId && !data.creativeTag) {
            data.serverUrl += "&auId=" + data.auId;
          }
          data.cachedFunctionCalls = data.cachedFunctionCalls || [];
          if (adn.util.isNumber(argsAu.refresh)) {
            data.refresh = {delay: parseInt(argsAu.refresh, 10), event: 'onViewable', count: 1};
          }
          if (adn.util.isObject(argsAu.refresh) && adn.util.isNumber(argsAu.refresh.delay)) {
            data.refresh = {
              delay: parseInt(argsAu.refresh.delay, 10),
              event: argsAu.refresh.event === 'onVisible' ? argsAu.refresh.event : 'onViewable',
              count: adn.util.isNumber(argsAu.refresh.count) && adn.util.isNumber(argsAu.refresh.count) > 0 ? parseInt(argsAu.refresh.count) : 1
            };
          }
          if (data.devScript) {
            data.serverUrl += "&isDevScript=true";
          }
          dataStore.push(data);

          if (!data.targetClass) {
            var duplicateIdCheck = adn.util.filter(gWidgetSpecs, function(ws) {
              return ws.targetId === data.targetId;
            });
            data.duplicateId = duplicateIdCheck.length > 0;
          }
          if (data.targetId.indexOf("adn-") === 0 && data.targetId.length !== 20) {
            var auId = data.targetId.substring(4);
            data.altTargetId = "adn-" + adn.lib.auPadStart(auId);
          }

          var el = misc.getDocEl(data);
          data.prevStyle = el ? el.getAttribute("style") : "";

          var duplicates = adn.util.filter(gWidgetSpecs, function(val) {
            return val.targetId === data.targetId && val.adStatus === ENUMS.adStatus.init;
          });
          adn.util.forEach(duplicates, function(dup) {
            delete gWidgetSpecs[dup.widgetId];
          });
          gWidgetSpecs[data.widgetId] = data;
        };

        var parentArgs = misc.assign({}, args);
        delete parentArgs.adUnits;
        delete parentArgs.creatives;

        var requestId = misc.uuid();
        if (adn.util.isArray(args.adUnits) && !args.isPreview) {
          adn.util.forEach(adn.util.isArray(args.adUnits) ? args.adUnits : [], function(lAdUnitArgs) {
            initAdUnit(requestId, mAdUnits, lAdUnitArgs, parentArgs, args);
          });
        } else if (adn.util.isArray(args.creatives)) {
          adn.util.forEach(adn.util.isArray(args.creatives) ? args.creatives : [], function(creativeArgs) {
            initAdUnit(requestId, mCreatives, creativeArgs, parentArgs, args);
          });
        } else if (adn.util.isStringWithChars(args.creativeContent)) {
          initAdUnit(requestId, mCreatives, args, undefined, args);
        } else {
          initAdUnit(requestId, mAdUnits, args, undefined, args);
        }
        if (adn.util.isFunction(args.onAllResponses)) {
          gRequestInfo[requestId] = {
            onAllResponses: args.onAllResponses
          };
          gRequestInfo[requestId].widgetIds = adn.util.map(adn.util.filter(gWidgetSpecs, function(w) {
            return w.requestId === requestId;
          }), function(w) {
            return w.widgetId;
          });
        }
      };

      var getWidgetEl = function() {
        var mAs = mAdUnits[0];
        var targetEl = misc.getDocEl(mAs);
        if (!targetEl) {
          adn.out.warn("Unable to find HTML element on page with the following id: " + mAs.targetId);
          return adn.out.output("No target element was found.", "getWidgetEl");
        }
        return targetEl.firstChild;
      };

      requestMethods = (function() {

        var loadPreviewAd = function(creative, adContent) {
          var targetEl = misc.getDocEl(creative);
          if (!targetEl) {
            return adn.out.output("Couldn't find target element", "Creative preview", creative, targetEl, creative.onError);
          }
          // foundIframeContainer protects against double rendering
          var foundIframeContainer = adn.util.find(targetEl.childNodes, function(node) {
            return node.id === creative.widgetId;
          });

          if (adContent.indexOf("adnOptionContainerDiv") > 0) {
            creative.container = ENUMS.container.div;
          }
          if (adContent.indexOf("adnOptionContainerIframe") > 0) {
            creative.container = ENUMS.container.iframe;
          }

          if (!foundIframeContainer) {

            if (creative.container === ENUMS.container.div && !creative.isolateFrame) {
              dom.showTargetDiv(targetEl, creative);
              targetEl.innerHTML = misc.getAdContentOnly(adContent, creative.widgetId);
              adn.util.loadScriptElements(targetEl, creative.widgetId);
            } else {
              creative.serverUrl = null;
              adn.lib.showAdContent(creative, {html: adContent, matchedAdCount: 1});
            }
          }
          if (creative.blockScript && adn.util.isFunction(creative.onImpressionResponse)) {
            var returnArgs = {};
            misc.copyArgValues(returnArgs, creative, PICK_DATA_PARAMETERS);
            creative.onImpressionResponse(misc.normalise(returnArgs));
          }
        };

        return {
          ifr: function() {
            var mAs = mAdUnits[0];
            if (!mAs || !mAs.auId) {
              return adn.out.output("No auId was found.", "ifr");
            }
            if (!AU_ID_REGEX.test(mAs.auId)) {
              return adn.out.output("Invalid auId.", "ifr", mAs.auId);
            }
            if (mAs.requestMode === ENUMS.requestMode.hasTarget && !misc.getDocEl(mAs)) {
              adn.out.devOutput("Skipping ad request", "ifr", mAs);
              if (adn.util.isFunction(mAs.onNoMatchedAds)) {
                mAs.onNoMatchedAds(mAs.requestArgs);
              }
              return false;
            }
            dom.insIframe(mAs);
          },
          creativeTag: function() {
            var mAs = mAdUnits[0];
            if (mAs.format === 'js' || mAs.format === 'iframe') {
              dom.insIframe(mAs);
            } else {
              requestMethods.composed(mAdUnits);
            }
          },
          previewDirect: function() {
            adn.util.forEach(mCreatives, function(creative) {
              gWidgetSpecs[creative.widgetId].preview = true;
              loadPreviewAd(creative, creative.creativeContent);
            });
          },
          preview: function(redoCreative) {
            var wCreatives = redoCreative && redoCreative.widgetId ? [redoCreative] : mCreatives;
            if (wCreatives.length < 1) {
              return adn.out.output("No creatives to make request for", "preview");
            }
            var previewLoc = wCreatives[0].previewLoc;
            var filteredCreatives = adn.util.filter(wCreatives, function(creative) {
              return !gWidgetSpecs[creative.widgetId].preview || (creative.firstPreviewFailed && !creative.apiPreviewEnabled);
            });
            adn.util.forEach(filteredCreatives, function(c) {
              gWidgetSpecs[c.widgetId].preview = true;
              c.apiPreviewEnabled = !!c.hash || !!c.firstPreviewFailed;
            });
            adn.util.forEach(filteredCreatives, function(creative) {

              if ((!adn.util.isString(creative.networkId) && !adn.util.isString(creative.network)) || !(adn.util.isString(creative.creativeId) || adn.util.isObject(creative.creativeData))) {
                return adn.out.output("Insufficient creative information for preview", "preview", creative, creative.onError);
              }

              var method = "POST",
                url = previewLoc + "context=" + (creative.networkId || creative.network);
              var ctx = gWidgetSpecs[creative.widgetId].ctx;
              if (adn.util.isStringWithChars(ctx)) {
                url += misc.encodeAsUrlParams({ctx: ctx}, true);
              }
              if (adn.util.isString(creative.creativeId)) {
                method = "GET";
                url += "&creativeId=" + creative.creativeId;
                if (creative.apiPreviewEnabled) {
                  var envType = ENUMS.env[creative.env || 'production'] || ENUMS.env.production;
                  url = envType.api + creative.creativeId + "?context=" + (creative.networkId || creative.network);
                  if (adn.util.isStringWithChars(ctx)) {
                    url += misc.encodeAsUrlParams({ctx: ctx}, true);
                  }
                  if (creative.hash) {
                    url += "&hash=" + creative.hash;
                  }
                }
              }

              var ajax = adn.util.getNewAjax(method, url, function() {
                if (ajax.readyState && ajax.readyState !== 4) {
                  return false;
                }
                if ((!ajax.status || ajax.status === 200) && adn.util.isStringWithChars(ajax.responseText)) {
                  var adContent;
                  try {
                    adContent = creative.apiPreviewEnabled ? JSON.parse(ajax.responseText) : ajax.responseText;
                  } catch (e) {
                    return adn.out.output(e, "ajax.onreadystatechange: catch block", creative.onError);
                  }
                  loadPreviewAd(creative, adContent.html || adContent);
                  return;
                }
                if (creative.apiPreviewEnabled) {
                  if (ajax.statusText === 'Preview object not found') {
                    if (adn.util.isFunction(creative.onNoMatchedAds)) {
                      creative.onNoMatchedAds(creative);
                    }
                    return;
                  }
                  return adn.out.output("Error status returned", "composed", ajax, creative.onError);
                }
                if (!creative.firstPreviewFailed) {
                  creative.firstPreviewFailed = true;
                  requestMethods.preview(creative);
                }
              });
              var jsonData;
              if (adn.util.isObject(creative.creativeData)) {
                jsonData = JSON.stringify(creative.creativeData);
              }
              ajax.send(jsonData);
            });
          },
          composed: function(aUnsentAdUnits, aAdUnitRequestData) {
            var wAdUnits = adn.util.isArray(misc.getParam(aAdUnitRequestData, 'adUnits')) ? aAdUnitRequestData.adUnits : mAdUnits;
            if (wAdUnits.length < 1) {
              return adn.out.output("No ad units to make request for", "composed");
            }
            var adUnitsCheckUnsent = adn.util.isArray(aUnsentAdUnits) ? aUnsentAdUnits : mAdUnits;
            readings.takeProximity();

            var firstAdUnitInCollection = wAdUnits[0];
            var defaultImpRequestLoc = firstAdUnitInCollection.impRequestLoc,
              headerBids = firstAdUnitInCollection.headerBids,
              network = firstAdUnitInCollection.network,
              unsentAdUnits = [],
              requestId = misc.getParam(aAdUnitRequestData, 'requestId');

            var adUnitCount = 0;
            var gatheredDataParams = misc.gatherDataParams(adUnitsCheckUnsent, function(au) {
              var theWidget = gWidgetSpecs[au.widgetId];
              if (!theWidget) {
                adn.out.devOutput("Couldn't find widget details in cache", "composed", au.widgetId, gWidgetSpecs);
                // widget might have been deleted due to its being overwritten (can't have two widgets with the same targetId if adStatus is still init)
                return false;
              }
              if (!theWidget.creativeTag && !AU_ID_REGEX.test(theWidget.auId)) {
                adn.out.output("auId is not in valid format -- check it", "composed", theWidget.auId);
                return false;
              }
              var sendRequestForThisAdUnit = (misc.getParam(theWidget.requestParams, 'load') !== ENUMS.loadEnums.lazyRequest || theWidget.withinBounds);
              if (!sendRequestForThisAdUnit) {
                unsentAdUnits.push(au);
                return false;
              }
              if (sendRequestForThisAdUnit && au.requestMode === ENUMS.requestMode.hasTarget && !misc.getDocEl(au)) {
                adn.out.devOutput("Skipping ad request", "composed", au);
                if (adn.util.isFunction(au.onNoMatchedAds)) {
                  au.onNoMatchedAds(au.requestArgs);
                }
                return false;
              }
              if (sendRequestForThisAdUnit && adUnitCount >= MAX_AD_UNITS_PER_REQUEST) {
                unsentAdUnits.push(au);
                return false;
              }
              adUnitCount++;
              return sendRequestForThisAdUnit;
            }, function(adUnit) {
              gWidgetSpecs[adUnit.widgetId].composed = true;
            });

            var voidAuIds = adn.util.map(cookies.getAllAdvStorageAsObj().voidAuIds || [], function(auEntry) {
              return auEntry.auId;
            }) || [];
            var adUnitsToSendTop = adn.util.filter(gatheredDataParams.adUnits, function(adUnit) {
              return voidAuIds.indexOf(adn.lib.auPadStart(adUnit.auId)) < 0;
            });
            var loopOfRequests = [];
            loopOfRequests.push(adUnitsToSendTop);
            adn.util.forEach(gatheredDataParams.creativeTags, function(ct) {
              loopOfRequests.push(ct);
            });
            var requestData = gatheredDataParams.params;

            adn.util.forEach(loopOfRequests, function(adUnitsToSend) {
              if (adUnitsToSend.length === 0 && !adUnitsToSend.creativeTag) {
                return;
              }
              var impRequestLoc = defaultImpRequestLoc;
              impRequestLoc += misc.encodeAsUrlParams(cookies.getIdsAsObj(firstAdUnitInCollection), true);
              impRequestLoc += misc.encodeAsUrlParams(cookies.getAllIdsAsObj() || {}, true);
              impRequestLoc += misc.encodeAsUrlParams(cookies.getEuConsentAsObj(firstAdUnitInCollection) || {}, true);
              impRequestLoc += misc.encodeAsUrlParams(cookies.getGdprAsObj(firstAdUnitInCollection) || {}, true);
              if (firstAdUnitInCollection.ranked === true) {
                impRequestLoc += misc.encodeAsUrlParams({ranked: true}, true);
              }
              var scriptOverrideId = misc.getAndSetScriptOverride(true);
              if (scriptOverrideId) {
                impRequestLoc += misc.encodeAsUrlParams({so: scriptOverrideId}, true);
              }

              if (!requestId) {
                requestId = "request-" + Math.random();
              }

              var responseStyle = gFeedback.inScreen === ENUMS.feedback.inScreen.inAdUnit || gLpLi ? "format=json" : firstAdUnitInCollection.native ? "tt=native" : "tt=multi";
              impRequestLoc += "&" + responseStyle;
              if (win.screen && win.screen.availHeight) {
                if (!misc.isUnitTest()) {
                  impRequestLoc += misc.encodeAsUrlParams({screen: win.screen.availWidth + "x" + win.screen.availHeight}, true);
                }
              }
              if (adn.util.isTopWindow()) {
                var dims = adn.util.getWindowSize();
                if (dims.width > 0 && dims.height > 0) {
                  if (!misc.isUnitTest()) {
                    impRequestLoc += misc.encodeAsUrlParams({viewport: dims.width + "x" + dims.height}, true);
                  }
                }
              }
              if (adUnitsToSend.creativeTag) {
                var rd = misc.clone(requestData);
                rd.ctx = rd.context;
                delete rd.context;
                impRequestLoc += misc.encodeAsUrlParams(rd, true);
                impRequestLoc = misc.updateSrc(adUnitsToSend, impRequestLoc);
              }
              var beforeAjax = Date.now();
              var ajax = adn.util.getNewAjax(misc.isTestAddress(impRequestLoc) || adUnitsToSend.creativeTag ? "GET" : "POST", impRequestLoc, function() {
                if (ajax.readyState && ajax.readyState !== 4) {
                  return false;
                }
                if ((!ajax.status || ajax.status === 200) && adn.util.isStringWithChars(ajax.responseText)) {
                  gComposedRequest = ENUMS.composedRequest.requestReturned;
                  var ads;
                  try {
                    ads = JSON.parse(ajax.responseText);
                  } catch (e) {
                    return adn.out.output(e, "ajax.onreadystatechange: catch block", firstAdUnitInCollection.onError);
                  }
                  if (!ads.adUnits) {
                    return adn.out.output("No ad units defined in returned data", "composed", firstAdUnitInCollection.onError);
                  }
                  if (ads.metaData) {
                    cookies.writeAdvLs(ads.metaData, ads.network);
                  }
                  if (adUnitsToSend.creativeTag && ads.adUnits.length === 1) {
                    ads.adUnits[0].targetId = adUnitsToSend.targetId;
                  }
                  adn.util.forEach(ads.adUnits, function(a) {
                    gComposedAds[a.targetId] = a;
                  });
                  gRequestFilterManager[requestId] = {
                    requestId: requestId,
                    duplicateFilter: misc.getParam(ads, 'duplicateFilter')
                  };
                  gTripTime = Date.now() - beforeAjax;
                  if (adn.util.isFunction(firstAdUnitInCollection.timingFunc)) {
                    firstAdUnitInCollection.timingFunc(ads, gTripTime);
                  }
                  dom.distributeComposedAds(ads);
                  return;
                }
                // this is the error section
                misc.ampCheck(firstAdUnitInCollection, {width: 0, height: 0});
                var resp = {};
                if (ajax.responseText) {
                  try {
                    resp = JSON.parse(ajax.responseText) || {};
                  } catch (e) {
                    adn.out.output("ajax.responseText: catch block", "composed", ajax);
                    resp = {};
                  }
                }
                if (resp.metaData) {
                  cookies.writeAdvLs(resp.metaData, resp.network);
                }
                return adn.out.output("Error status returned", "composed", ajax, firstAdUnitInCollection.onError);
              });

              ajax.withCredentials = misc.canAccessLocalStorage() && !misc.isTestAddress(impRequestLoc);
              var adUnitsRequestObject = misc.gatherExclusions(wAdUnits);

              adUnitsRequestObject.adUnits = adUnitsToSend;

              misc.setAndReturnMetaData(adUnitsRequestObject, network);

              if (adn.util.isArray(headerBids) && !adn.util.isStringWithChars(misc.getPreviewLi())) {
                adUnitsRequestObject.headerBids = headerBids;
              }
              var duplicateFilter = misc.getParam(gRequestFilterManager[requestId], 'duplicateFilter');
              if (duplicateFilter) {
                adUnitsRequestObject.duplicateFilter = duplicateFilter;
              }
              adUnitsRequestObject = misc.combineArgs(adUnitsRequestObject, requestData);
              ajax.send(adUnitsToSend.creativeTag ? undefined : JSON.stringify(adUnitsRequestObject));
              gComposedRequest = ENUMS.composedRequest.requestMade;
            });

            if (unsentAdUnits.length > 0) {
              var composedFunc = function() {
                requestMethods.composed(unsentAdUnits, {requestId: requestId, adUnits: wAdUnits});
              };
              win.setTimeout(composedFunc, 153);
            }
          }
        };
      }());

      var displayMethods = (function() {
        var onElementFound = function(callback) {
          var element = adn.util.getFrameElement() || getWidgetEl();
          if (!element) {
            return;
          }
          callback(element);
        };

        return {
          style: function(args) {
            var styleElement = function(element) {
              misc.applyStyle(element, args.style);
            };
            onElementFound(styleElement);
          },
          resize: function(args) {
            var resizeElement = function(element) {
              if (adn.util.isDefined(args.width)) {
                element.style.width = adn.util.dimension(args.width);
              }
              if (adn.util.isDefined(args.height)) {
                element.style.height = adn.util.dimension(args.height);
              }
            };
            onElementFound(resizeElement);
          }
        };
      }());

      var init = function(args, methods, defaultMethod) {
        var method = args.method || defaultMethod;
        if (!methods[method]) {
          return adn.out.output("Matching method not found for " + method, "init");
        }
        return methods[method].call(this, args);
      };

      function manualEventRegister(args, callbackEventName, keySuffix) {
        if (!args.externalId) {
          return;
        }
        var outsideKey = 'outside' + keySuffix;
        var insideKey = 'inside' + keySuffix;
        adn.util.forEach(gWidgetSpecs, function(widgetSpec) {
          if (widgetSpec.externalId !== args.externalId) {
            return;
          }
          widgetSpec[outsideKey] = true;
          if (widgetSpec.impReg === ENUMS.impReg.manual && adn.util.isObject(widgetSpec[insideKey])) {
            readings.sendEventFromParent(widgetSpec[insideKey].impRequestLoc, widgetSpec[insideKey].spec, widgetSpec[insideKey].feedbackText, widgetSpec[insideKey].network || widgetSpec[insideKey].networkId);
            misc.visibilityEventHandling(callbackEventName, widgetSpec);
            widgetSpec[insideKey] = null;
          }
        });
      }

      adn.regVisible = function(args) {
        manualEventRegister(args, 'onVisible', 'Visible');
      };

      adn.regViewable = function(args) {
        manualEventRegister(args, 'onViewable', 'Viewable');
      };

      adn.clearLocalStorage = function() {
        cookies.clearAdvLocalStorage();
      };

      adn.useLocalStorage = function(useLocalStorage) {
        gUseLocalStorage = useLocalStorage !== false;
      };

      adn.useCookies = function(useCookies) {
        gUseCookies = useCookies !== false;
      };

      adn.consent = function() {
        // leaving this method here for backwards-compatibility
      };

      adn.regTargets = function(args) {
        if (!adn.util.isString(args.network) || !adn.util.isArray(args.keyValues)) {
          return adn.out.output("Not a valid network id or array object", "adn.regTarget", args);
        }
        var verifiedTargets = [];
        adn.util.forEach(args.keyValues, function(entry) {
          if (adn.util.isString(entry.key) && adn.util.isString(entry.value)) {
            var entryCopy = {key: entry.key, value: entry.value};
            if (entry.expiry && adn.util.isInteger(entry.expiry)) {
              entryCopy.expiry = entry.expiry;
            }
            verifiedTargets.push(entryCopy);
          } else {
            adn.out.output("Missing an appropriate key and value for registering a target", "adn.regTarget", entry, args);
          }
        });
        if (verifiedTargets.length < 1) {
          return adn.out.output("Missing appropriate targets to register", "adn.regTarget", args);
        }
        var reqLoc = adn.lib.getRequestLocs(args).retargeting;
        if (!reqLoc) {
          return adn.out.output("Couldn't generate req url", "regTargets", reqLoc, args);
        }
        var ajax = adn.util.getNewAjax("POST", reqLoc, function() {
          if (ajax.readyState && ajax.readyState !== 4) {
            return false;
          }
          if (!ajax.status || ajax.status === 200) {
            return true;
          }
          var errorFamily = Math.floor(ajax.status / 100);
          if (errorFamily === 4) {
            return adn.out.output("400 error", "ajax.onreadystatechange in regTargets", ajax);
          }
          if (errorFamily === 5) {
            return adn.out.output("500 error", "ajax.onreadystatechange in regTargets", ajax);
          }
          return adn.out.output("Misc error", "ajax.onreadystatechange in regTargets", ajax);
        });
        ajax.open("POST", reqLoc);
        ajax.withCredentials = misc.canAccessLocalStorage() && !misc.isTestAddress(reqLoc);
        ajax.send(JSON.stringify({network: args.network, keyValues: verifiedTargets}));
      };

      adn.renderComposedAds = function() {
        var getErrorWidgets = function() {
          return adn.util.filter(gComposedAds, function(ca) {
            return ca.errorStatus === ENUMS.errorStatus.noTarget;
          });
        };
        if (gComposedRequest !== ENUMS.composedRequest.requestReturned) {
          return -1;
        }
        var noTargetWidgets = getErrorWidgets();
        if (noTargetWidgets.length < 1) {
          return 0;
        }
        dom.distributeComposedAds(noTargetWidgets);
        return getErrorWidgets().length;
      };

      adn.requestData = function(args) {
        if (!adn.util.isDefined(args.auId) && !adn.util.isArray(args.adUnits)) {
          return adn.out.output("Need an ad unit id or adUnits to make this work.", "adn.requestData", args);
        }
        var reqArgs = misc.assign({}, args);
        if (!adn.util.isFunction(reqArgs.onSuccess) && !adn.util.isFunction(reqArgs.onResponse)) {
          return adn.out.output("Need a callback function to make the call worthwhile", "adn.requestData", reqArgs, args);
        }
        reqArgs.onSuccess = adn.util.isFunction(reqArgs.onSuccess) ? reqArgs.onSuccess : adn.util.noop;
        reqArgs.onError = adn.util.isFunction(reqArgs.onError) ? reqArgs.onError : adn.util.noop;
        reqArgs.onResponse = adn.util.isFunction(reqArgs.onResponse) ? reqArgs.onResponse : adn.util.noop;

        var impRequestLoc = adn.lib.getRequestLocs(reqArgs, true).imp;
        var queryParams = {format: 'json'};

        var serverUrl,
          adUnits,
          userIdObj;
        if (reqArgs.auId && !adn.util.isArray(reqArgs.adUnits)) {
          adUnits = misc.gatherDataParams([reqArgs], null, null, args).adUnits;
          userIdObj = reqArgs;
        } else {
          adUnits = misc.gatherDataParams(reqArgs.adUnits).adUnits;
          userIdObj = adUnits[0];
        }
        serverUrl = misc.encodeUrlParams(impRequestLoc, queryParams, args);

        if (!serverUrl) {
          return adn.out.output("Couldn't generate server url", "requestData", serverUrl, args);
        }
        serverUrl += misc.encodeAsUrlParams(cookies.getIdsAsObj(userIdObj), true);
        serverUrl += misc.encodeAsUrlParams(cookies.getAllIdsAsObj() || {}, true);
        serverUrl += misc.encodeAsUrlParams(cookies.getEuConsentAsObj(args) || {}, true);
        if (args.gdpr) {
          serverUrl += misc.encodeAsUrlParams({gdpr: args.gdpr}, true);
        }
        var ajax = adn.util.getNewAjax("POST", serverUrl, function() {
          if (ajax.readyState && ajax.readyState !== 4) {
            return false;
          }
          var makeResponse = function(info, secondCallback) {
            var callbackArg = misc.assign(info, {
              responseCode: ajax.status,
              responseText: ajax.responseText
            });
            reqArgs.onResponse(callbackArg);

            var callback = secondCallback || reqArgs.onError;
            callback(callbackArg);
          };

          if ((!ajax.status || ajax.status === 200) && adn.util.isStringWithChars(ajax.responseText)) {
            try {
              var jsonData = JSON.parse(ajax.responseText);
              makeResponse({responseJSON: jsonData}, reqArgs.onSuccess);
              if (jsonData.metaData) {
                cookies.writeAdvLs(jsonData.metaData, jsonData.network);
              }
              return jsonData;
            } catch (e) {
              makeResponse({error: e, errorText: "Error with parsing the response text"});
              return adn.out.output("Parsing response text fail", "ajax.onreadystatechange: catch block", e);
            }
          }
          var errorFamily = Math.floor(ajax.status / 100);
          if (errorFamily === 4) {
            makeResponse({errorText: 'Likely error in request made'});
            return adn.out.output("400 error", "ajax.onreadystatechange", ajax);
          }
          if (errorFamily === 5) {
            makeResponse({errorText: 'Likely error in service'});
            return adn.out.output("500 error", "ajax.onreadystatechange", ajax);
          }
          makeResponse({errorText: 'Error'});
          return adn.out.output("Misc error", "ajax.onreadystatechange", ajax);
        });
        var adUnitsSend = misc.gatherExclusions(reqArgs);

        misc.setAndReturnMetaData(adUnitsSend, args.network);
        adUnitsSend.adUnits = adUnits;
        ajax.send(JSON.stringify(adUnitsSend));
      };

      adn.regConversion = function(args) {
        if (!adn.util.isStringWithChars(args.eventType)) {
          return adn.out.output("Missing a value for eventType", "regConversion", args);
        }
        if (args.eventValue && !adn.util.isNumber(args.eventValue)) {
          return adn.out.output("The event value must be a number", "regConversion", args);
        }
        var convLocs = adn.lib.getRequestLocs(args).conversion;
        var ajax = adn.util.getNewAjax(misc.isTestAddress(convLocs) ? "GET" : "POST", convLocs, function() {
          if (ajax.readyState && ajax.readyState !== 4) {
            return false;
          }
          if (!ajax.status || ajax.status === 200) {
            var ajaxResponse;
            try {
              ajaxResponse = JSON.parse(ajax.responseText);
            } catch (e) {
              return adn.out.output(e, "ajax.onreadystatechange: catch block", ajax);
            }
            if (ajaxResponse.metaData) {
              cookies.writeAdvLs(ajaxResponse.metaData, ajaxResponse.network);
            }
            return;
          }
          return adn.out.output("Error status returned", "composed", ajax);
        });

        ajax.withCredentials = misc.canAccessLocalStorage();
        var payload = misc.copyArgValues({}, args, ['network', 'adSource', 'eventType', 'eventValue']);
        misc.setAndReturnMetaData(payload, payload.network);
        var convStorage = cookies.getConvStorageAsObj();
        if (adn.util.isObject(convStorage) && adn.util.hasProperties(convStorage)) {
          payload.metaData = payload.metaData || {};
          payload.metaData.clicks = JSON.stringify(convStorage);
        }
        ajax.send(JSON.stringify(payload));
      };

      adn.clearDivs = function() {
        adn.util.forEach(gWidgetSpecs, function(w) {
          var el = misc.getDocEl(w);
          if (el) {
            if (adn.util.isStringWithChars(w.prevStyle)) {
              el.setAttribute("style", w.prevStyle);
            } else {
              el.style.display = "none";
            }
            el.innerHTML = "";
          }
        });
        adn.clearOut();
      };

      adn.clearOut = function() {
        gWidgetSpecs = {};
        gAdLocs = {};
        gAdSpecs = {};
        gComposedAds = {};
        gWindowStats = {};
        gRequestInfo = {};
        gRequestFilterManager = {};
        gKeywords = [];
      };

      var chbMethods = (function() {
        var chbRequests = [];

        var PREBID_TIMEOUT = 2000;
        var PBJS_LOAD_FAILSAFE_TIMEOUT = 4000;

        var isValidChbSizes = function(sizes) {
          if (!adn.util.isArray(sizes)) {
            return false;
          }
          var returnValue = true;
          adn.util.forEach(sizes, function(size) {
            if (!adn.util.isArray(size) || size.length !== 2 || !adn.util.isInteger(size[0]) || !adn.util.isInteger(size[1])) {
              returnValue = false;
            }
          });
          return returnValue;
        };

        function getChbRequest(reqId) {
          return adn.util.find(chbRequests, function(r) {
            return r.reqId === reqId;
          });
        }

        function deleteChbRequest(reqId) {
          chbRequests = adn.util.filter(chbRequests, function(r) {
            return r.reqId !== reqId;
          });
        }

        function initAdserver(locPbjs, adnRequest, config, reqId, prebidLoadTimeout) {
          if (!getChbRequest(reqId)) {
            return;
          }
          deleteChbRequest(reqId);

          var makePrebidHappen = function() {
            var setGptAsync = !prebidLoadTimeout && adn.util.isTrue(misc.getParam(config, 'gptAsync'));
            if (setGptAsync) {
              locPbjs.setTargetingForGPTAsync && locPbjs.setTargetingForGPTAsync();
            }
            var resps = adn.util.isFunction(locPbjs.getBidResponses) ? locPbjs.getBidResponses() : [];
            var noBidReqs = adn.util.isFunction(locPbjs.getNoBids) ? locPbjs.getNoBids() : [];
            var isDebugMode = adn.util.isTrue(misc.getParam(config, 'debug'));
            if (isDebugMode) {
              if (prebidLoadTimeout) {
                adn.out.output("Prebid.js load timed-out", "headerBidRequest");
              }
              adn.out.simple("Bid responses from prebid", resps);
              adn.out.simple("Responses with no bids", noBidReqs);
            }
            adnRequest.headerBids = [];
            adn.util.forEach(resps, function(resp) {
              adn.util.forEach(resp.bids, function(bid) {
                var bidClone = misc.clone(bid);

                // delete null dealId value
                if (!bidClone.dealId) {
                  delete bidClone.dealId;
                }

                delete bidClone.metrics;
                delete bidClone.ad;

                adnRequest.headerBids.push(bidClone);
              });
            });

            adn.util.forEach(noBidReqs, function(nbReq) {
              adn.util.forEach(nbReq.bids, function(bid) {
                var bidClone = misc.clone(bid);
                bidClone.cpm = 0;
                bidClone.statusMessage = "Bid returned empty or error response";

                var bidderCode = bid.bidderCode || bid.bidder;
                bidClone.bidderCode = adn.util.isStringWithChars(bidderCode) ? bidderCode : "";
                if (!adn.util.isStringWithChars(bidderCode)) {
                  adn.out.output("Invalid bidder code has been set. Needs to be a String.", "headerBidRequest", bid.bidderCode || bid.bidder, bid);
                }

                var isValid = isValidChbSizes(bid.sizes);
                if (!isValid) {
                  adn.out.output("Invalid sizes have been configured. Should be an two-dimension array of integers within an array", "headerBidRequest", bid.sizes, bid);
                }
                bidClone.sizes = isValid ? bid.sizes : [];

                // delete null dealId value
                if (!bidClone.dealId) {
                  delete bidClone.dealId;
                }

                adnRequest.headerBids.push(bidClone);
              });
            });

            if (!adnRequest.adUnits || !adn.util.isArray(adnRequest.adUnits) || adnRequest.adUnits.length === 0) {
              // no adnuntius ad units so display the prebid requests directly
              if (!adn.util.isFunction(locPbjs.getHighestCpmBids)) {
                adn.out.output("Prebid.js not loaded or could not find getHighestCpmBids", "Prebid loop", locPbjs, adnRequest);
                return;
              }
              adn.util.forEach(locPbjs.getHighestCpmBids(), function(bid) {
                if (!bid.adId || !bid.adUnitCode) {
                  adn.out.output("Could not find required adId or adUnitCode in bid", "Prebid loop", bid);
                  return;
                }

                var ifr = doc.createElement('iframe');
                var docEl = doc.getElementById(bid.adUnitCode);

                if (docEl) {
                  docEl.append(ifr);
                  var iframeDoc = ifr.contentDocument || ifr.contentWindow.document;
                  iframeDoc.open();
                  locPbjs.renderAd(iframeDoc, bid.adId);
                  iframeDoc.close();
                } else {
                  adn.out.output("Could not find target div for " + bid.adUnitCode, "Prebid", bid);
                }
              });
              return;
            }

            if (isDebugMode) {
              adn.out.output("Header bids sent through to Adnuntius", "headerBidRequest", adnRequest.headerBids);
            }

            if (doc.location && doc.location.hostname.indexOf("cosmosmagazine") > -1) {
              adnRequest.env = "cloudflare";
            }

            if (config && config.env) {
              adnRequest.env = config.env;
            }
            adn.request(adnRequest);
          };

          if (prebidLoadTimeout || !locPbjs.que) {
            makePrebidHappen();
          } else {
            locPbjs.que.push(makePrebidHappen);
          }
        }

        function recursivePrebidCheck() {
          if (chbRequests.length > 0) {
            var currentRequest = chbRequests[0];
            prebidCaller(currentRequest.prebidAdUnits, currentRequest.adnRequest, currentRequest.config, currentRequest.reqId);
          }
        }

        function prebidCaller(prebidAdUnits, pAdnRequest, config, pReqId) {
          var adnRequest = pAdnRequest || {};
          var reqId = pReqId || misc.uuid();
          if (!getChbRequest(reqId)) {
            chbRequests.push({
              reqId: reqId,
              prebidAdUnits: prebidAdUnits,
              adnRequest: adnRequest,
              config: config
            });
          }

          // if no prebid ad units, shortcut to sending the request to Adnuntius ad server
          if (!prebidAdUnits || !adn.util.isArray(prebidAdUnits) || prebidAdUnits.length < 1) {
            initAdserver({}, adnRequest, config, reqId);
            recursivePrebidCheck();
            return;
          }

          if (chbRequests.length > 1 && !adn.util.isString(pReqId)) {
            return;
          }

          win.pbjs = win.pbjs || {};
          var pbjs = win.pbjs;
          pbjs.que = pbjs.que || [];

          var prebidLoadTimeout = null;

          // in case PBJS doesn't load
          prebidLoadTimeout = win.setTimeout(function() {
            initAdserver(pbjs, adnRequest, config, reqId, true);
            recursivePrebidCheck();
          }, PBJS_LOAD_FAILSAFE_TIMEOUT);

          pbjs.que.push(function() {

            if (prebidLoadTimeout) {
              win.clearTimeout(prebidLoadTimeout);
            }
            if (!getChbRequest(reqId)) {
              adn.out.output("Prebid script loading probably timed out and only now has prebid loaded, which is after the ad request has passed through to Adnuntius", "headerBid", chbRequests);
              return;
            }

            // empty parameters clears all existing ad units before call
            pbjs.removeAdUnit();
            if (config) {
              pbjs.setConfig(config);
            }

            pbjs.addAdUnits(prebidAdUnits);

            pbjs.requestBids({
              bidsBackHandler: function() {
                initAdserver(pbjs, adnRequest, config, reqId);
                recursivePrebidCheck();
              },
              timeout: PREBID_TIMEOUT
            });
          });
        }

        return function(prebidAdUnits, adnRequest, config) {
          prebidCaller(prebidAdUnits, adnRequest, config);
        };
      })();

      var getCookieDatData = function() {
        var cookieData = cookies.getAllDatStorageAsObj();
        cookieData.browserId = adn.util.isStringWithChars(cookieData.browserId) ? cookieData.browserId : misc.uuid();
        cookieData.extSync = adn.util.isObject(cookieData.extSync) ? cookieData.extSync : {};
        cookies.writeDatLs(cookieData);
        return cookieData;
      };

      var adnDataRequest = function(folderId, aArgs, config, cb) {
        if (!adn.util.isStringWithChars(folderId)) {
          return adn.out.output("Need a folder Id", 'adnDataRequest', folderId, aArgs, config);
        }
        var args = misc.clone(aArgs || {});
        args.folderId = folderId;

        var cookieData = getCookieDatData();
        args.browserId = args.browserId || cookieData.browserId;
        args.ctx = win.location.href || doc.referrer;

        var locs = adn.lib.getAdnDataLocs(args);
        var serverUrl = locs[config.locKey];
        serverUrl += misc.encodeAsUrlParams(cookies.getEuConsentAsObj(args) || {}, true);
        var postedData;
        if (config.pick && config.pick.length) {
          var qArgs = misc.copyArgValues({}, args, config.pick) || {};
          if (config.method === 'POST') {
            postedData = JSON.stringify(qArgs);
          } else {
            serverUrl += misc.encodeAsUrlParams(qArgs, true);
          }
        }
        var ajax = adn.util.getNewAjax(config.method, serverUrl, adn.util.isFunction(cb) ? function() {
          cb(ajax);
        } : null);
        ajax.withCredentials = misc.canAccessLocalStorage() && !misc.isTestAddress(locs[config.locKey]);
        ajax.send(postedData);
      };

      adn.getSegments = function(folderId, aArgs) {
        var storedSegments = cookies.getDatSegments(folderId);
        if (storedSegments.segments) {
          if (aArgs && adn.util.isFunction(aArgs.onResponse)) {
            aArgs.onResponse(storedSegments);
          }
          return;
        }
        adnDataRequest(folderId, aArgs, {
          method: "GET",
          locKey: 'user'
        }, function(ajax) {
          if (ajax.readyState && ajax.readyState !== 4) {
            return false;
          }
          if ((!ajax.status || ajax.status === 200) && adn.util.isStringWithChars(ajax.responseText)) {
            var jsonResponse = {};
            try {
              jsonResponse = JSON.parse(ajax.responseText);
            } catch (e) {
              adn.out.output(e, "ajax.onreadystatechange: catch block send event", ajax);
            }
            jsonResponse = adn.util.isObject(jsonResponse) ? jsonResponse : {};
            delete jsonResponse.expiryEpochMillis;
            cookies.writeDatSegments(folderId, jsonResponse);
            if (aArgs && adn.util.isFunction(aArgs.onResponse)) {
              aArgs.onResponse(jsonResponse);
            }
          }
        });
      };

      adn.getBrowserId = function() {
        return getCookieDatData().browserId;
      };

      adn.visitor = function(folderId, aArgs) {
        adnDataRequest(folderId, aArgs, {
          method: "POST",
          pick: ["profileValues", "browserId", "folderId"],
          locKey: 'visitor'
        });
      };

      adn.view = function(folderId, aArgs) {
        adnDataRequest(folderId, aArgs, {
          method: "POST",
          pick: ["categories", "keywords", "domainName", "ctx"],
          locKey: 'page'
        });
      };

      adn.assignSegment = function(folderId, segmentId) {
        adnDataRequest(folderId, {segmentId: segmentId}, {
          method: "GET",
          pick: ["segmentId"],
          locKey: 'segment'
        });
      };

      adn.externalUserSync = function(folderId, extId) {
        if (!adn.util.isStringWithChars(folderId) || !ENUMS.sync[extId]) {
          return adn.out.output("Need a valid folder ID and external system ID to proceed", "externalUserSync", folderId, extId);
        }
        var cookieData = getCookieDatData();
        var extSyncUrl = ENUMS.sync[extId].replace("{BROWSER_ID}", encodeURIComponent(cookieData.browserId)).replace("{FOLDER_ID}", encodeURIComponent(folderId));

        var lastSync = cookieData.extSync[extId];
        var nowInMillis = new Date().getTime();
        if (!adn.util.isInteger(lastSync) || nowInMillis - lastSync > 1 || SYNC_BOUNDARY) {
          var img = doc.createElement("img");
          img.setAttribute('alt', '');
          img.setAttribute('src', extSyncUrl);
          img.setAttribute('class', 'adn-sync-pixel');
          img.setAttribute('style', 'position:absolute;top:-999999px;left:-9999999px;');
          img.setAttribute('height', '1');
          img.setAttribute('width', '1');
          doc.body.appendChild(img);
        }
      };

      adn.sync = function(folderId, aArgs) {
        if (!adn.util.isStringWithChars(aArgs.externalSystemType) || !adn.util.isStringWithChars(aArgs.externalSystemUserId)) {
          return adn.out.output("Need an external system type or external system user id", "sync", folderId, aArgs);
        }
        adnDataRequest(folderId, aArgs, {
          method: "POST",
          pick: ['externalSystemType', 'externalSystemUserId', 'browserId'],
          locKey: 'sync'
        });
      };

      adn.chbRequest = chbMethods;

      adn.regScriptServe = function(htmlData, widgetId) {
        var scriptEl = doc.getElementById("script-" + widgetId);
        if (scriptEl && scriptEl.src && scriptEl.src.indexOf("format=js") > -1) {
          if (gWidgetSpecs[widgetId]) {
            gWidgetSpecs[widgetId].container = 'div';
          } else {
            initMemberVariables({
              subdomain: htmlData.indexOf("data-subdomain=\"limited\"") > -1 ? "limited" : false,
              widgetId: widgetId,
              container: 'div'
            });
          }
          return misc.addWidgetIdToProcessAd(htmlData, widgetId);
        }
        return htmlData;
      };

      adn.callChildFunction = function(args) {
        if (!args || !adn.util.isStringWithChars(args.name)) {
          return adn.out.output("Not enough info to proceed", "callChildFunction", name);
        }
        var functionParams = {name: args.name, args: args.args, event: ENUMS.events.CUSTOM};
        var msgObject = {
          messageType: ENUMS.postMessageType.toChildPubs,
          event: ENUMS.events.CUSTOM,
          functionCalls: [functionParams]
        };
        adn.util.forEach(gWidgetSpecs, function(w, key) {
          if (adn.util.isStringWithChars(args.targetId) && w.targetId !== args.targetId) {
            return;
          }
          if (adn.util.isStringWithChars(args.targetClass) && w.targetClass !== args.targetClass) {
            return;
          }
          if (adn.util.isStringWithChars(args.auId) && w.auId !== args.auId) {
            return;
          }
          msgObject.widgetId = w.widgetId;
          var el = doc.getElementById(w.widgetId);
          if (!el) {
            gWidgetSpecs[key].cachedFunctionCalls = gWidgetSpecs[key].cachedFunctionCalls || [];
            gWidgetSpecs[key].cachedFunctionCalls.push(functionParams);
            return;
          }
          misc.postMessageToChild(el, msgObject);
        });
      };

      adn.request = function(args) {
        var doRequest = function() {
          var initArgs = args;
          if (args.amp && args.amp.data) {
            initArgs = args.amp.data;
            initArgs.mode = 'amp';
            initArgs.container = initArgs.container || 'div';
            initArgs.adUnits = [{
              auId: initArgs.auId,
              auW: initArgs.width,
              auH: initArgs.height
            }];

            adn.util.forEach(['c', 'kv', 'segments', 'floorPrice'], function(param) {
              if (!adn.util.isString(initArgs[param])) {
                initArgs[param] = "";
                return;
              }
              try {
                initArgs[param] = JSON.parse(initArgs[param]);
              } catch (e) {
                initArgs[param] = "";
              }
            });

            var workingId = initArgs.targetId || 'adn-' + initArgs.auId;
            if (!doc.getElementById(workingId)) {
              var d = doc.createElement('div');
              d.setAttribute('id', workingId);
              doc.getElementById('c').appendChild(d);
            }
          }

          if (adn.util.isStringWithChars(initArgs.lineItemId) || adn.util.isStringWithChars(initArgs.creativeSetId) || adn.util.isStringWithChars(initArgs.orderId)) {
            initArgs.creativeTag = true;
          }

          initMemberVariables(initArgs);
          var method = ENUMS.methodEnums.ifr;
          if (adn.util.isArray(initArgs.adUnits) && !args.isPreview) {
            method = ENUMS.methodEnums.composed;
          } else if (adn.util.isArray(initArgs.creatives)) {
            method = ENUMS.methodEnums.preview;
          } else if (adn.util.isStringWithChars(initArgs.creativeContent)) {
            method = ENUMS.methodEnums.previewDirect;
          } else if (initArgs.creativeTag) {
            method = ENUMS.methodEnums.creativeTag;
          }
          init(initArgs, requestMethods, method);
        };

        if (args.requestTiming === ENUMS.requestTiming.onReady) {
          misc.onDocReady(doRequest);
        } else if (args.requestTiming === ENUMS.requestTiming.onLoad) {
          misc.onLoad(doRequest);
        } else {
          doRequest();
        }
      };
      adn.display = function(args) {
        init(args, displayMethods, 'style');
      };
      adn.setFeedbackOptions = function(args) {
        ev.setFeedbackOptions(args);
      };
      adn.preview = function(args) {
        if (!adn.util.isArray(args.creatives)) {
          return adn.out.output("An array of creatives is required for preview", "preview", args);
        }
        if (!adn.util.isStringWithChars(args.networkId) && !adn.util.isStringWithChars(args.network)) {
          return adn.out.output("A network ID is required for a preview", "preview", args);
        }
        args.isPreview = true;
        adn.request(args);
      };
    })();

    (function() {
      if (!isDevScript && adn.util.isTopWindow()) {
        var scriptOverrideUrl = misc.getAndSetScriptOverride();
        var scriptServerOverrideId = misc.getQueryParamsByName(SCRIPT_OVERRIDE_SERVER_QSTRING);
        if (scriptOverrideUrl && !scriptServerOverrideId) {
          var loadDevScript = function() {
            var scriptEl = doc.createElement('script');
            scriptEl.id = DEV_SCRIPT_ID;
            scriptEl.src = scriptOverrideUrl;
            doc.body.appendChild(scriptEl);
          };
          if (doc.body) {
            loadDevScript();
          } else {
            adn.util.addEventListener(win, 'load', loadDevScript);
          }
          return;
        }
      }

      var blockRefreshHasValue = misc.getQueryParamsByName(BLOCK_REFRESH_QSTRING);
      if (adn.util.isString(blockRefreshHasValue) && blockRefreshHasValue.length > 0) {
        gBlockRefresh = true;
      }

      conv.regDestination();
      ev.registerListeners();
      ev.setFeedbackOptions();

      var cmpTimeout;
      var loopCounter = 0;

      function safeTopWindow() {
        try {
          return win.top.__tcfapi;
        } catch (e) {
          adn.out.devOutput("Can't reach top window", e);
        }
      }

      function checkCmpConsentString() {
        if (!cmpTimeout) {
          return;
        }
        var __tcfapi = win.__tcfapi || safeTopWindow();
        loopCounter++;

        if (loopCounter > 10) {
          clearTimeout(cmpTimeout);
          return;
        }
        if (__tcfapi && adn.util.isFunction(__tcfapi)) {
          clearTimeout(cmpTimeout);
          __tcfapi('addEventListener', 2, function(tcData, success) {
            if (success) {
              if (tcData.hasOwnProperty('gdprApplies')) {
                gGdpr = tcData.gdprApplies;
              }
              if (tcData.hasOwnProperty('tcString')) {
                gConsentString = tcData.tcString;
              }
            }
          });
        }
      }

      cmpTimeout = win.setInterval(checkCmpConsentString, 250);

      var executeCalls = function() {
        try {
          checkCmpConsentString();
          var call;
          while ((call = adn.calls.shift())) {
            try {
              call();
            } catch (e) {
              adn.out.output(e, "executeCalls: inside while catch block", call, adn.calls);
            }
          }
        } catch (e) {
          adn.out.output(e, "executeCalls: outside while catch block", adn.calls);
        }
      };
      win.setTimeout(executeCalls, 25);

      adn.calls.push = function() {
        Array.prototype.push.apply(this, arguments);
        win.setTimeout(executeCalls, 1);
        return this.length;
      };
    })();
  })(adn, document, window);
} catch (e) {
  adn.out.output(e, "Blanket catch block");
}
