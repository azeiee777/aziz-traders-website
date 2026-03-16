(function attachAzizUtils(window, document) {
    'use strict';

    function query(selector, root) {
        return (root || document).querySelector(selector);
    }

    function queryAll(selector, root) {
        return Array.from((root || document).querySelectorAll(selector));
    }

    function toggleClass(element, className, force) {
        if (!element) return false;
        return element.classList.toggle(className, force);
    }

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    window.AzizUtils = {
        query: query,
        queryAll: queryAll,
        toggleClass: toggleClass,
        scrollToTop: scrollToTop,
    };
})(window, document);
