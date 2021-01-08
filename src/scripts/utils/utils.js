//utils
/**
 * Shows a message in the console of the given type.
 */
function showError(type, text) {
	window.console && window.console[type] && window.console[type]('message: ' + text);
}

/**
 * Equivalent or jQuery function $().
 */
function $(selector, context) {
	context = arguments.length > 1 ? context : document;
	return context ? context.querySelectorAll(selector) : null;
}

/**
 * Extends a given Object properties and its childs.
 */
function deepExtend(out) {
	out = out || {};
	for (var i = 1, len = arguments.length; i < len; ++i) {
		var obj = arguments[i];

		if (!obj) {
			continue;
		}

		for (var key in obj) {
			if (!Object.prototype.hasOwnProperty.call(obj, key)) {
				continue;
			}

			// based on https://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
			if (Object.prototype.toString.call(obj[key]) === '[object Object]') {
				out[key] = deepExtend(out[key], obj[key]);
				continue;
			}

			out[key] = obj[key];
		}
	}
	return out;
}

/**
 * Checks if the passed element contains the passed class.
 */
function hasClass(el, className) {
	if (el == null) {
		return false;
	}
	if (el.classList) {
		return el.classList.contains(className);
	}
	return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
}

/**
 * Gets the window height. Crossbrowser.
 */
function getWindowHeight() {
	return 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
}

/**
 * Set's the CSS properties for the passed item/s.
 * @param {NodeList|HTMLElement} items
 * @param {Object} props css properties and values.
 */
function css(items, props) {
	items = getList(items);

	var key;
	for (key in props) {
		if (props.hasOwnProperty(key)) {
			if (key !== null) {
				for (var i = 0; i < items.length; i++) {
					var item = items[i];
					item.style[key] = props[key];
				}
			}
		}
	}

	return items;
}

/**
 * Generic function to get the previous or next element.
 */
function until(item, selector, fn) {
	var sibling = item[fn];
	while (sibling && !matches(sibling, selector)) {
		sibling = sibling[fn];
	}

	return sibling;
}

/**
 * Gets the previous element to the passed element that matches the passed selector.
 */
function prevUntil(item, selector) {
	return until(item, selector, 'previousElementSibling');
}

/**
 * Gets the next element to the passed element that matches the passed selector.
 */
function nextUntil(item, selector) {
	return until(item, selector, 'nextElementSibling');
}

/**
 * Gets the previous element to the passed element.
 */
function prev(item) {
	return item.previousElementSibling;
}

/**
 * Gets the next element to the passed element.
 */
function next(item) {
	return item.nextElementSibling;
}

/**
 * Gets the last element from the passed list of elements.
 */
function last(item) {
	return item[item.length - 1];
}

/**
 * Gets index from the passed element.
 * @param {String} selector is optional.
 */
function index(item, selector) {
	item = isArrayOrList(item) ? item[0] : item;
	var children = selector != null ? $(selector, item.parentNode) : item.parentNode.childNodes;
	var num = 0;
	for (var i = 0; i < children.length; i++) {
		if (children[i] == item) return num;
		if (children[i].nodeType == 1) num++;
	}
	return -1;
}

/**
 * Gets an iterable element for the passed element/s
 */
function getList(item) {
	return !isArrayOrList(item) ? [item] : item;
}

/**
 * Adds the display=none property for the passed element/s
 */
function hide(el) {
	el = getList(el);

	for (var i = 0; i < el.length; i++) {
		el[i].style.display = 'none';
	}
	return el;
}

/**
 * Adds the display=block property for the passed element/s
 */
function show(el) {
	el = getList(el);

	for (var i = 0; i < el.length; i++) {
		el[i].style.display = 'block';
	}
	return el;
}

/**
 * Checks if the passed element is an iterable element or not
 */
function isArrayOrList(el) {
	return Object.prototype.toString.call(el) === '[object Array]' ||
		Object.prototype.toString.call(el) === '[object NodeList]';
}

/**
 * Adds the passed class to the passed element/s
 */
function addClass(el, className) {
	el = getList(el);

	for (var i = 0; i < el.length; i++) {
		var item = el[i];
		if (item.classList) {
			item.classList.add(className);
		} else {
			item.className += ' ' + className;
		}
	}
	return el;
}

/**
 * Removes the passed class to the passed element/s
 * @param {String} `className` can be multiple classnames separated by whitespace
 */
function removeClass(el, className) {
	el = getList(el);

	var classNames = className.split(' ');

	for (var a = 0; a < classNames.length; a++) {
		className = classNames[a];
		for (var i = 0; i < el.length; i++) {
			var item = el[i];
			if (item.classList) {
				item.classList.remove(className);
			} else {
				item.className = item.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
			}
		}
	}
	return el;
}

/**
 * Appends the given element ot the given parent.
 */
function appendTo(el, parent) {
	parent.appendChild(el);
}

/**
Usage:

var wrapper = document.createElement('div');
wrapper.className = 'fp-slides';
wrap($('.slide'), wrapper);

https://jsfiddle.net/qwzc7oy3/15/ (vanilla)
https://jsfiddle.net/oya6ndka/1/ (jquery equivalent)
*/
function wrap(toWrap, wrapper, isWrapAll) {
	var newParent;
	wrapper = wrapper || document.createElement('div');
	for (var i = 0; i < toWrap.length; i++) {
		var item = toWrap[i];
		if (isWrapAll && !i || !isWrapAll) {
			newParent = wrapper.cloneNode(true);
			item.parentNode.insertBefore(newParent, item);
		}
		newParent.appendChild(item);
	}
	return toWrap;
}

/**
Usage:
var wrapper = document.createElement('div');
wrapper.className = 'fp-slides';
wrap($('.slide'), wrapper);

https://jsfiddle.net/qwzc7oy3/27/ (vanilla)
https://jsfiddle.net/oya6ndka/4/ (jquery equivalent)
*/
function wrapAll(toWrap, wrapper) {
	wrap(toWrap, wrapper, true);
}

/**
 * Usage:
 * wrapInner(document.querySelector('#pepe'), '<div class="test">afdas</div>');
 * wrapInner(document.querySelector('#pepe'), element);
 *
 * https://jsfiddle.net/zexxz0tw/6/
 *
 * https://stackoverflow.com/a/21817590/1081396
 */
function wrapInner(parent, wrapper) {
	if (typeof wrapper === "string") {
		wrapper = createElementFromHTML(wrapper);
	}

	parent.appendChild(wrapper);

	while (parent.firstChild !== wrapper) {
		wrapper.appendChild(parent.firstChild);
	}
}

/**
 * Usage:
 * unwrap(document.querySelector('#pepe'));
 * unwrap(element);
 *
 * https://jsfiddle.net/szjt0hxq/1/
 *
 */
function unwrap(wrapper) {
	var wrapperContent = document.createDocumentFragment();
	while (wrapper.firstChild) {
		wrapperContent.appendChild(wrapper.firstChild);
	}

	wrapper.parentNode.replaceChild(wrapperContent, wrapper);
}

/**
 * http://stackoverflow.com/questions/22100853/dom-pure-javascript-solution-to-jquery-closest-implementation
 * Returns the element or `false` if there's none
 */
function closest(el, selector) {
	if (el && el.nodeType === 1) {
		if (matches(el, selector)) {
			return el;
		}
		return closest(el.parentNode, selector);
	}
	return null;
}

/**
 * Places one element (rel) after another one or group of them (reference).
 * @param {HTMLElement} reference
 * @param {HTMLElement|NodeList|String} el
 * https://jsfiddle.net/9s97hhzv/1/
 */
function after(reference, el) {
	insertBefore(reference, reference.nextSibling, el);
}

/**
 * Places one element (rel) before another one or group of them (reference).
 * @param {HTMLElement} reference
 * @param {HTMLElement|NodeList|String} el
 * https://jsfiddle.net/9s97hhzv/1/
 */
function before(reference, el) {
	insertBefore(reference, reference, el);
}

/**
 * Based in https://stackoverflow.com/a/19316024/1081396
 * and https://stackoverflow.com/a/4793630/1081396
 */
function insertBefore(reference, beforeElement, el) {
	if (!isArrayOrList(el)) {
		if (typeof el == 'string') {
			el = createElementFromHTML(el);
		}
		el = [el];
	}

	for (var i = 0; i < el.length; i++) {
		reference.parentNode.insertBefore(el[i], beforeElement);
	}
}

//http://stackoverflow.com/questions/3464876/javascript-get-window-x-y-position-for-scroll
function getScrollTop() {
	var doc = document.documentElement;
	return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
}

/**
 * Gets the siblings of the passed element
 */
function siblings(el) {
	return Array.prototype.filter.call(el.parentNode.children, function(child) {
		return child !== el;
	});
}

//for IE 9 ?
function preventDefault(event) {
	if (event.preventDefault) {
		event.preventDefault();
	} else {
		event.returnValue = false;
	}
}

/**
 * Determines whether the passed item is of function type.
 */
function isFunction(item) {
	if (typeof item === 'function') {
		return true;
	}
	var type = Object.prototype.toString(item);
	return type === '[object Function]' || type === '[object GeneratorFunction]';
}

/**
 * Trigger custom events
 */
function trigger(el, eventName, data) {
	var event;
	data = typeof data === 'undefined' ? {} : data;

	// Native
	if (typeof window.CustomEvent === "function") {
		event = new CustomEvent(eventName, { detail: data });
	} else {
		event = document.createEvent('CustomEvent');
		event.initCustomEvent(eventName, true, true, data);
	}

	el.dispatchEvent(event);
}

/**
 * Polyfill of .matches()
 */
function matches(el, selector) {
	return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
}

/**
 * Toggles the visibility of the passed element el.
 */
function toggle(el, value) {
	if (typeof value === "boolean") {
		for (var i = 0; i < el.length; i++) {
			el[i].style.display = value ? 'block' : 'none';
		}
	}
	//we don't use it in other way, so no else :)

	return el;
}

/**
 * Creates a HTMLElement from the passed HTML string.
 * https://stackoverflow.com/a/494348/1081396
 */
function createElementFromHTML(htmlString) {
	var div = document.createElement('div');
	div.innerHTML = htmlString.trim();

	// Change this to div.childNodes to support multiple top-level nodes
	return div.firstChild;
}

/**
 * Removes the passed item/s from the DOM.
 */
function remove(items) {
	items = getList(items);
	for (var i = 0; i < items.length; i++) {
		var item = items[i];
		if (item && item.parentElement) {
			item.parentNode.removeChild(item);
		}
	}
}

/**
 * Filters an array by the passed filter funtion.
 */
function filter(el, filterFn) {
	Array.prototype.filter.call(el, filterFn);
}

//https://jsfiddle.net/w1rktecz/
function untilAll(item, selector, fn) {
	var sibling = item[fn];
	var siblings = [];
	while (sibling) {
		if (matches(sibling, selector) || selector == null) {
			siblings.push(sibling);
		}
		sibling = sibling[fn];
	}

	return siblings;
}

/**
 * Gets all next elements matching the passed selector.
 */
function nextAll(item, selector) {
	return untilAll(item, selector, 'nextElementSibling');
}

/**
 * Gets all previous elements matching the passed selector.
 */
function prevAll(item, selector) {
	return untilAll(item, selector, 'previousElementSibling');
}

/**
 * Converts an object to an array.
 */
function toArray(objectData) {
	return Object.keys(objectData).map(function(key) {
		return objectData[key];
	});
}

/**
 * forEach polyfill for IE
 * https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach#Browser_Compatibility
 */
function forEachPolyfill() {
	if (window.NodeList && !NodeList.prototype.forEach) {
		NodeList.prototype.forEach = function(callback, thisArg) {
			thisArg = thisArg || window;
			for (var i = 0; i < this.length; i++) {
				callback.call(thisArg, this[i], i, this);
			}
		};
	}
}

//utils are public, so we can use it wherever we want
export {
	$,
	deepExtend,
	hasClass,
	getWindowHeight,
	css,
	until,
	prevUntil,
	nextUntil,
	prev,
	next,
	last,
	index,
	getList,
	hide,
	show,
	isArrayOrList,
	addClass,
	removeClass,
	appendTo,
	wrap,
	wrapAll,
	wrapInner,
	unwrap,
	closest,
	after,
	before,
	insertBefore,
	getScrollTop,
	siblings,
	preventDefault,
	isFunction,
	trigger,
	matches,
	toggle,
	createElementFromHTML,
	remove,
	filter,
	untilAll,
	nextAll,
	prevAll,
	showError,
	forEachPolyfill
};