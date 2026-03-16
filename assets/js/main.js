(function initAzizTradersSite(window, document) {
    'use strict';

    var utils = window.AzizUtils || {};
    var queryAll = utils.queryAll || function fallbackQueryAll(selector) {
        return Array.from(document.querySelectorAll(selector));
    };
    var toggleClass = utils.toggleClass || function fallbackToggleClass(element, className, force) {
        if (!element) return false;
        return element.classList.toggle(className, force);
    };
    var scrollToTop = utils.scrollToTop || function fallbackScrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    function checkReveal() {
        queryAll('.reveal, .reveal-left, .reveal-right').forEach(function revealElement(element) {
            var rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight - 80) {
                element.classList.add('visible');
            }
        });
    }

    function showPage(id, navElement) {
        var targetPage = document.getElementById('page-' + id);
        if (!targetPage) return;

        queryAll('.page').forEach(function hidePage(page) {
            page.classList.remove('active');
        });
        targetPage.classList.add('active');

        queryAll('.nav-link').forEach(function clearActive(link) {
            link.classList.remove('active');
        });
        if (navElement) {
            navElement.classList.add('active');
        }

        scrollToTop();
        window.setTimeout(checkReveal, 100);
    }

    function toggleMobile() {
        var mobileMenu = document.getElementById('mobile-menu');
        toggleClass(mobileMenu, 'open');
    }

    function syncNavbarOnScroll() {
        var navbar = document.getElementById('navbar');
        toggleClass(navbar, 'scrolled', window.scrollY > 60);
    }

    function syncCopyrightYear() {
        var yearNode = document.getElementById('current-year');
        if (yearNode) {
            yearNode.textContent = String(new Date().getFullYear());
        }
    }

    window.showPage = showPage;
    window.toggleMobile = toggleMobile;
    window.checkReveal = checkReveal;

    window.addEventListener('scroll', syncNavbarOnScroll, { passive: true });
    window.addEventListener('scroll', checkReveal, { passive: true });
    window.addEventListener('load', function onLoad() {
        syncNavbarOnScroll();
        checkReveal();
        syncCopyrightYear();
    });
})(window, document);
