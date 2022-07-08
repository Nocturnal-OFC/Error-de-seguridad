function assert(condition, opt_message) {
    if (!condition) {
      let message = 'Assertion failed';
      if (opt_message) {
        message = message + ': ' + opt_message;
      }
      const error = new Error(message);
      const global = function() {
        const thisOrSelf = this || self;
        thisOrSelf.traceAssertionsForTesting;
        return thisOrSelf;
      }();
      if (global.traceAssertionsForTesting) {
        console.warn(error.stack);
      }
      throw error;
    }
    return condition;
  }
   function assertNotReached(message) {
    assert(false, message || 'Unreachable code hit');
  }
   function assertInstanceof(value, type, message) {
    if (!(value instanceof type)) {
      assertNotReached(
          message ||
          'Value ' + value + ' is not a[n] ' + (type.name || typeof type));
    }
    return value;
  }
  
   console.warn('crbug/1173575, non-JS module files deprecated.');
   function $(id) {
    const el = document.getElementById(id);
    return el ? assertInstanceof(el, HTMLElement) : null;
  }
   function getSVGElement(id) {
    const el = document.getElementById(id);
    return el ? assertInstanceof(el, Element) : null;
  }
   function getDeepActiveElement() {
    let a = document.activeElement;
    while (a && a.shadowRoot && a.shadowRoot.activeElement) {
      a = a.shadowRoot.activeElement;
    }
    return a;
  }
   function findAncestorByClass(el, className) {
    return (findAncestor(el, function(el) {
      return el.classList && el.classList.contains(className);
    }));
  }
   function findAncestor(node, predicate, includeShadowHosts) {
    while (node !== null) {
      if (predicate(node)) {
        break;
      }
      node = includeShadowHosts && node instanceof ShadowRoot ? node.host :
                                                                node.parentNode;
    }
    return node;
  }
   function disableTextSelectAndDrag(
      allowSelectStart, allowDragStart) {
    document.onselectstart = function(e) {
      if (!(allowSelectStart && allowSelectStart.call(this, e))) {
        e.preventDefault();
      }
    };
  
    document.ondragstart = function(e) {
      if (!(allowDragStart && allowDragStart.call(this, e))) {
        e.preventDefault();
      }
    };
  }
   function isRTL() {
    return document.documentElement.dir === 'rtl';
  }
   function getRequiredElement(id) {
    return assertInstanceof(
        $(id), HTMLElement, 'Missing required element: ' + id);
  }
   function queryRequiredElement(selectors, context) {
    const element = (context || document).querySelector(selectors);
    return assertInstanceof(
        element, HTMLElement, 'Missing required element: ' + selectors);
  }
   function appendParam(url, key, value) {
    const param = encodeURIComponent(key) + '=' + encodeURIComponent(value);
  
    if (url.indexOf('?') === -1) {
      return url + '?' + param;
    }
    return url + '&' + param;
  }
   function createElementWithClassName(type, className) {
    const elm = document.createElement(type);
    elm.className = className;
    return elm;
  }
   function ensureTransitionEndEvent(el, timeOut) {
    if (timeOut === undefined) {
      const style = getComputedStyle(el);
      timeOut = parseFloat(style.transitionDuration) * 1000;
  
      timeOut += 50;
    }
  
    let fired = false;
    el.addEventListener('transitionend', function f(e) {
      el.removeEventListener('transitionend', f);
      fired = true;
    });
    window.setTimeout(function() {
      if (!fired) {
        cr.dispatchSimpleEvent(el, 'transitionend', true);
      }
    }, timeOut);
  }
   function scrollTopForDocument(doc) {
    return doc.documentElement.scrollTop || doc.body.scrollTop;
  }
  
   function setScrollTopForDocument(doc, value) {
    doc.documentElement.scrollTop = doc.body.scrollTop = value;
  }
   function scrollLeftForDocument(doc) {
    return doc.documentElement.scrollLeft || doc.body.scrollLeft;
  }
   function setScrollLeftForDocument(doc, value) {
    doc.documentElement.scrollLeft = doc.body.scrollLeft = value;
  }
   function HTMLEscape(original) {
    return original.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
  }
   function elide(original, maxLength) {
    if (original.length <= maxLength) {
      return original;
    }
    return original.substring(0, maxLength - 1) + '\u2026';
  }
   function quoteString(str) {
    return str.replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, '\\$1');
  }
   function listenOnce(target, eventNames, callback) {
    if (!Array.isArray(eventNames)) {
      eventNames = eventNames.split(/ +/);
    }
  
    const removeAllAndCallCallback = function(event) {
      eventNames.forEach(function(eventName) {
        target.removeEventListener(eventName, removeAllAndCallCallback, false);
      });
      return callback(event);
    };
  
    eventNames.forEach(function(eventName) {
      target.addEventListener(eventName, removeAllAndCallCallback, false);
    });
  }
  function hasKeyModifiers(e) {
    return !!(e.altKey || e.ctrlKey || e.metaKey || e.shiftKey);
  }
   function isTextInputElement(el) {
    return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA';
  }
  
  console.warn('crbug/1173575, non-JS module files deprecated.');
  const CAPTIVEPORTAL_CMD_OPEN_LOGIN_PAGE = 'openLoginPage';
  function setupSSLDebuggingInfo() {
    if (loadTimeData.getString('type') !== 'SSL') {
      return;
    }
    appendDebuggingField('Subject', loadTimeData.getString('subject'));
    appendDebuggingField('Issuer', loadTimeData.getString('issuer'));
    appendDebuggingField('Expires on', loadTimeData.getString('expirationDate'));
    appendDebuggingField('Current date', loadTimeData.getString('currentDate'));
    appendDebuggingField('PEM encoded chain', loadTimeData.getString('pem'),
                         true);
    const ctInfo = loadTimeData.getString('ct');
    if (ctInfo) {
      appendDebuggingField('Certificate Transparency', ctInfo);
    }
  
    $('error-code').addEventListener('click', toggleDebuggingInfo);
    $('error-code').setAttribute('role', 'button');
    $('error-code').setAttribute('aria-expanded', false);
  }
  'use strict';
  const SB_BOX_CHECKED = 'boxchecked';
  const SB_DISPLAY_CHECK_BOX = 'displaycheckbox';
  function setupExtendedReportingCheckbox() {
    const interstitialType = loadTimeData.getString('type');
    if (interstitialType !== 'SAFEBROWSING' && interstitialType !== 'SSL' &&
        interstitialType !== 'CAPTIVE_PORTAL') {
      return;
    }
  
    if (!loadTimeData.getBoolean(SB_DISPLAY_CHECK_BOX)) {
      return;
    }
  
    if ($('privacy-link')) {
      $('privacy-link').addEventListener('click', function() {
        sendCommand(SecurityInterstitialCommandId.CMD_OPEN_REPORTING_PRIVACY);
        return false;
      });
      $('privacy-link').addEventListener('mousedown', function() {
        return false;
      });
    }
    $('opt-in-checkbox').checked = loadTimeData.getBoolean(SB_BOX_CHECKED);
    $('extended-reporting-opt-in').classList.remove('hidden');
  
    const billing =
        interstitialType === 'SAFEBROWSING' && loadTimeData.getBoolean('billing');
  
    let className = 'ssl-opt-in';
    if (interstitialType === 'SAFEBROWSING' && !billing) {
      className = 'safe-browsing-opt-in';
    }
  
    $('extended-reporting-opt-in').classList.add(className);
  
    $('body').classList.add('extended-reporting-has-checkbox');
  
    if ($('whitepaper-link')) {
      $('whitepaper-link').addEventListener('click', function(event) {
        sendCommand(SecurityInterstitialCommandId.CMD_OPEN_WHITEPAPER);
      });
    }
  
    $('opt-in-checkbox').addEventListener('click', function() {
      sendCommand($('opt-in-checkbox').checked ?
                  SecurityInterstitialCommandId.CMD_DO_REPORT :
                  SecurityInterstitialCommandId.CMD_DONT_REPORT);
    });
  }
  'use strict';
  const SB_DISPLAY_ENHANCED_PROTECTION_MESSAGE =
      'displayEnhancedProtectionMessage';
  function setupEnhancedProtectionMessage() {
    const interstitialType = loadTimeData.getString('type');
    if (interstitialType !== 'SAFEBROWSING' && interstitialType !== 'SSL' &&
        interstitialType !== 'CAPTIVE_PORTAL') {
      return;
    }
  
    if (!loadTimeData.getBoolean(SB_DISPLAY_ENHANCED_PROTECTION_MESSAGE)) {
      return;
    }
  
    if ($('enhanced-protection-link')) {
      if (mobileNav) {
        $('enhanced-protection-message').addEventListener('click', function() {
          sendCommand(SecurityInterstitialCommandId
                          .CMD_OPEN_ENHANCED_PROTECTION_SETTINGS);
          return false;
        });
      } else {
        $('enhanced-protection-link').addEventListener('click', function() {
          sendCommand(SecurityInterstitialCommandId
                          .CMD_OPEN_ENHANCED_PROTECTION_SETTINGS);
          return false;
        });
      }
    }
    $('enhanced-protection-message').classList.remove('hidden');
  
    const billing =
        interstitialType === 'SAFEBROWSING' && loadTimeData.getBoolean('billing');
  
    let className = 'ssl-enhanced-protection-message';
    if (interstitialType === 'SAFEBROWSING' && !billing) {
      className = 'safe-browsing-enhanced-protection-message';
    }
  
    $('enhanced-protection-message').classList.add(className);
  }
  let mobileNav = false;
  function onResize() {
    const helpOuterBox = document.querySelector('#details');
    const mainContent = document.querySelector('#main-content');
    const mediaQuery = '(min-width: 240px) and (max-width: 420px) and ' +
        '(min-height: 401px), ' +
        '(max-height: 560px) and (min-height: 240px) and ' +
        '(min-width: 421px)';
  
    const detailsHidden = helpOuterBox.classList.contains(HIDDEN_CLASS);
    const runnerContainer = document.querySelector('.runner-container');
    if (mobileNav !== window.matchMedia(mediaQuery).matches) {
      mobileNav = !mobileNav;
      if (mobileNav) {
        mainContent.classList.toggle(HIDDEN_CLASS, !detailsHidden);
        helpOuterBox.classList.toggle(HIDDEN_CLASS, detailsHidden);
        if (runnerContainer) {
          runnerContainer.classList.toggle(HIDDEN_CLASS, !detailsHidden);
        }
      } else if (!detailsHidden) {
        mainContent.classList.remove(HIDDEN_CLASS);
        helpOuterBox.classList.remove(HIDDEN_CLASS);
        if (runnerContainer) {
          runnerContainer.classList.remove(HIDDEN_CLASS);
        }
      }
    }
  }
  
  function setupMobileNav() {
    window.addEventListener('resize', onResize);
    onResize();
  }
  
  document.addEventListener('DOMContentLoaded', setupMobileNav);
  var certificateErrorPageController;
  const SecurityInterstitialCommandId = {
    CMD_DONT_PROCEED: 0,
    CMD_PROCEED: 1,
    CMD_SHOW_MORE_SECTION: 2,
    CMD_OPEN_HELP_CENTER: 3,
    CMD_OPEN_DIAGNOSTIC: 4,
    CMD_RELOAD: 5,
    CMD_OPEN_DATE_SETTINGS: 6,
    CMD_OPEN_LOGIN: 7,
    CMD_DO_REPORT: 8,
    CMD_DONT_REPORT: 9,
    CMD_OPEN_REPORTING_PRIVACY: 10,
    CMD_OPEN_WHITEPAPER: 11,
    CMD_REPORT_PHISHING_ERROR: 12,
    CMD_OPEN_ENHANCED_PROTECTION_SETTINGS: 13,
  };
  
  const HIDDEN_CLASS = 'hidden';
  function sendCommand(cmd) {
    if (window.certificateErrorPageController) {
      switch (cmd) {
        case SecurityInterstitialCommandId.CMD_DONT_PROCEED:
          certificateErrorPageController.dontProceed();
          break;
        case SecurityInterstitialCommandId.CMD_PROCEED:
          certificateErrorPageController.proceed();
          break;
        case SecurityInterstitialCommandId.CMD_SHOW_MORE_SECTION:
          certificateErrorPageController.showMoreSection();
          break;
        case SecurityInterstitialCommandId.CMD_OPEN_HELP_CENTER:
          certificateErrorPageController.openHelpCenter();
          break;
        case SecurityInterstitialCommandId.CMD_OPEN_DIAGNOSTIC:
          certificateErrorPageController.openDiagnostic();
          break;
        case SecurityInterstitialCommandId.CMD_RELOAD:
          certificateErrorPageController.reload();
          break;
        case SecurityInterstitialCommandId.CMD_OPEN_DATE_SETTINGS:
          certificateErrorPageController.openDateSettings();
          break;
        case SecurityInterstitialCommandId.CMD_OPEN_LOGIN:
          certificateErrorPageController.openLogin();
          break;
        case SecurityInterstitialCommandId.CMD_DO_REPORT:
          certificateErrorPageController.doReport();
          break;
        case SecurityInterstitialCommandId.CMD_DONT_REPORT:
          certificateErrorPageController.dontReport();
          break;
        case SecurityInterstitialCommandId.CMD_OPEN_REPORTING_PRIVACY:
          certificateErrorPageController.openReportingPrivacy();
          break;
        case SecurityInterstitialCommandId.CMD_OPEN_WHITEPAPER:
          certificateErrorPageController.openWhitepaper();
          break;
        case SecurityInterstitialCommandId.CMD_REPORT_PHISHING_ERROR:
          certificateErrorPageController.reportPhishingError();
          break;
        case SecurityInterstitialCommandId.CMD_OPEN_ENHANCED_PROTECTION_SETTINGS:
          certificateErrorPageController.openEnhancedProtectionSettings();
          break;
      }
      return;
    }
    // 
    window.domAutomationController.send(cmd);
    // 
    // 
  }
  
  /**
   * Call this to stop clicks on <a href="#"> links from scrolling to the top of
   * the page (and possibly showing a # in the link).
   */
  function preventDefaultOnPoundLinkClicks() {
    document.addEventListener('click', function(e) {
      const anchor = findAncestor(/** @type {Node} */ (e.target), function(el) {
        return el.tagName === 'A';
      });
      // Use getAttribute() to prevent URL normalization.
      if (anchor && anchor.getAttribute('href') === '#') {
        e.preventDefault();
      }
    });
  }
  let expandedDetails = false;
  let keyPressState = 0;
  function handleKeypress(e) {
    // HTTPS errors are serious and should not be ignored. For testing purposes,
    // other approaches are both safer and have fewer side-effects.
    // See https://goo.gl/ZcZixP for more details.
    const BYPASS_SEQUENCE = window.atob('dGhpc2lzdW5zYWZl');
    if (BYPASS_SEQUENCE.charCodeAt(keyPressState) === e.keyCode) {
      keyPressState++;
      if (keyPressState === BYPASS_SEQUENCE.length) {
        sendCommand(SecurityInterstitialCommandId.CMD_PROCEED);
        keyPressState = 0;
      }
    } else {
      keyPressState = 0;
    }
  }
  function appendDebuggingField(title, value, fixedWidth) {
    const spanTitle = document.createElement('span');
    spanTitle.classList.add('debugging-title');
    spanTitle.innerText = title + ': ';
  
    const spanValue = document.createElement('span');
    spanValue.classList.add('debugging-content');
    if (fixedWidth) {
      spanValue.classList.add('debugging-content-fixed-width');
    }
    spanValue.innerText = value;
  
    const pElem = document.createElement('p');
    pElem.classList.add('debugging-content');
    pElem.appendChild(spanTitle);
    pElem.appendChild(spanValue);
    $('error-debugging-info').appendChild(pElem);
  }
  
  function toggleDebuggingInfo() {
    const hiddenDebug = $('error-debugging-info').classList.toggle(HIDDEN_CLASS);
    $('error-code').setAttribute('aria-expanded', !hiddenDebug);
  }
  
  function setupEvents() {
    const overridable = loadTimeData.getBoolean('overridable');
    const interstitialType = loadTimeData.getString('type');
    const ssl = interstitialType === 'SSL';
    const captivePortal = interstitialType === 'CAPTIVE_PORTAL';
    const badClock = ssl && loadTimeData.getBoolean('bad_clock');
    const lookalike = interstitialType === 'LOOKALIKE';
    const billing =
        interstitialType === 'SAFEBROWSING' && loadTimeData.getBoolean('billing');
    const originPolicy = interstitialType === 'ORIGIN_POLICY';
    const blockedInterception = interstitialType === 'BLOCKED_INTERCEPTION';
    const insecureForm = interstitialType == 'INSECURE_FORM';
    const httpsOnly = interstitialType == 'HTTPS_ONLY';
    const hidePrimaryButton = loadTimeData.getBoolean('hide_primary_button');
    const showRecurrentErrorParagraph = loadTimeData.getBoolean(
      'show_recurrent_error_paragraph');
  
    if (ssl || originPolicy || blockedInterception) {
      $('body').classList.add(badClock ? 'bad-clock' : 'ssl');
      if (loadTimeData.valueExists('errorCode')) {
        $('error-code').textContent = loadTimeData.getString('errorCode');
        $('error-code').classList.remove(HIDDEN_CLASS);
      }
    } else if (captivePortal) {
      $('body').classList.add('captive-portal');
    } else if (billing) {
      $('body').classList.add('safe-browsing-billing');
    } else if (lookalike) {
      $('body').classList.add('lookalike-url');
    } else if (insecureForm) {
      $('body').classList.add('insecure-form');
    } else if (httpsOnly) {
      $('body').classList.add('https-only');
    } else {
      $('body').classList.add('safe-browsing');
      // Override the default theme color.
      document.querySelector('meta[name=theme-color]').setAttribute('content',
        'rgb(217, 48, 37)');
    }
  
    $('icon').classList.add('icon');
  
    if (hidePrimaryButton) {
      $('primary-button').classList.add(HIDDEN_CLASS);
    } else {
      $('primary-button').addEventListener('click', function() {
        switch (interstitialType) {
          case 'CAPTIVE_PORTAL':
            sendCommand(SecurityInterstitialCommandId.CMD_OPEN_LOGIN);
            break;
  
          case 'SSL':
            if (badClock) {
              sendCommand(SecurityInterstitialCommandId.CMD_OPEN_DATE_SETTINGS);
            } else if (overridable) {
              sendCommand(SecurityInterstitialCommandId.CMD_DONT_PROCEED);
            } else {
              sendCommand(SecurityInterstitialCommandId.CMD_RELOAD);
            }
            break;
  
          case 'SAFEBROWSING':
          case 'ORIGIN_POLICY':
            sendCommand(SecurityInterstitialCommandId.CMD_DONT_PROCEED);
            break;
          case 'HTTPS_ONLY':
          case 'INSECURE_FORM':
          case 'LOOKALIKE':
            sendCommand(SecurityInterstitialCommandId.CMD_DONT_PROCEED);
            break;
  
          default:
            throw new Error('Invalid interstitial type');
        }
      });
    }
  
    if (lookalike || insecureForm || httpsOnly) {
      const proceedButton = 'proceed-button';
      $(proceedButton).classList.remove(HIDDEN_CLASS);
      $(proceedButton).textContent = loadTimeData.getString('proceedButtonText');
      $(proceedButton).addEventListener('click', function(event) {
        sendCommand(SecurityInterstitialCommandId.CMD_PROCEED);
      });
    }
    if (lookalike) {
      const dontProceedLink = 'dont-proceed-link';
      if ($(dontProceedLink)) {
        $(dontProceedLink).addEventListener('click', function(event) {
          sendCommand(SecurityInterstitialCommandId.CMD_DONT_PROCEED);
        });
      }
    }
  
    if (overridable) {
      const overrideElement = billing ? 'proceed-button' : 'proceed-link';
      // Captive portal page isn't overridable.
      $(overrideElement).addEventListener('click', function(event) {
        sendCommand(SecurityInterstitialCommandId.CMD_PROCEED);
      });
  
      if (ssl) {
        $(overrideElement).classList.add('small-link');
      } else if (billing) {
        $(overrideElement).classList.remove(HIDDEN_CLASS);
        $(overrideElement).textContent =
            loadTimeData.getString('proceedButtonText');
      }
    } else if (!ssl) {
      $('final-paragraph').classList.add(HIDDEN_CLASS);
    }
  
  
    if (!ssl || !showRecurrentErrorParagraph) {
      $('recurrent-error-message').classList.add(HIDDEN_CLASS);
    } else {
      $('body').classList.add('showing-recurrent-error-message');
    }
  
    if ($('diagnostic-link')) {
      $('diagnostic-link').addEventListener('click', function(event) {
        sendCommand(SecurityInterstitialCommandId.CMD_OPEN_DIAGNOSTIC);
      });
    }
  
    if ($('learn-more-link')) {
      $('learn-more-link').addEventListener('click', function(event) {
        sendCommand(SecurityInterstitialCommandId.CMD_OPEN_HELP_CENTER);
      });
    }
  
    if (captivePortal || billing || lookalike || insecureForm || httpsOnly) {
      // Captive portal, billing, lookalike pages, insecure form, and
      // HTTPS only mode interstitials don't have details buttons.
      $('details-button').classList.add('hidden');
    } else {
      $('details-button')
          .setAttribute(
              'aria-expanded', !$('details').classList.contains(HIDDEN_CLASS));
      $('details-button').addEventListener('click', function(event) {
        const hiddenDetails = $('details').classList.toggle(HIDDEN_CLASS);
        $('details-button').setAttribute('aria-expanded', !hiddenDetails);
  
        if (mobileNav) {
          // Details appear over the main content on small screens.
          $('main-content').classList.toggle(HIDDEN_CLASS, !hiddenDetails);
        } else {
          $('main-content').classList.remove(HIDDEN_CLASS);
        }
  
        $('details-button').innerText = hiddenDetails ?
            loadTimeData.getString('openDetails') :
            loadTimeData.getString('closeDetails');
        if (!expandedDetails) {
          // Record a histogram entry only the first time that details is opened.
          sendCommand(SecurityInterstitialCommandId.CMD_SHOW_MORE_SECTION);
          expandedDetails = true;
        }
      });
    }
  
    if ($('report-error-link')) {
      $('report-error-link').addEventListener('click', function(event) {
        sendCommand(SecurityInterstitialCommandId.CMD_REPORT_PHISHING_ERROR);
      });
    }
  
    if (lookalike) {
      console.warn(
          'Chrome has determined that ' +
          loadTimeData.getString('lookalikeRequestHostname') +
          ' could be fake or fraudulent.\n\n' +
          'If you believe this is shown in error please visit ' +
          'https://g.co/chrome/lookalike-warnings');
    }
  
    preventDefaultOnPoundLinkClicks();
    setupExtendedReportingCheckbox();
    setupEnhancedProtectionMessage();
    setupSSLDebuggingInfo();
    document.addEventListener('keypress', handleKeypress);
  }
  
  document.addEventListener('DOMContentLoaded', setupEvents);
  
  