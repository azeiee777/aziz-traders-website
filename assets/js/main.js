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
    var currentPageId = 'home';

    function checkReveal() {
        queryAll('.reveal, .reveal-left, .reveal-right').forEach(function revealElement(element) {
            var rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight - 80) {
                element.classList.add('visible');
            }
        });
    }

    function syncActiveNav(id) {
        queryAll('.nav-link[data-page]').forEach(function setActiveState(link) {
            link.classList.toggle('active', link.getAttribute('data-page') === id);
        });
    }

    function showPage(id, navElement, options) {
        var targetPage = document.getElementById('page-' + id);
        if (!targetPage) return;

        currentPageId = id;
        queryAll('.page').forEach(function hidePage(page) {
            page.classList.remove('active');
        });
        targetPage.classList.add('active');

        syncActiveNav(id);
        if (navElement) {
            navElement.classList.add('active');
        }

        var shouldUpdateHash = !options || options.updateHash !== false;
        if (shouldUpdateHash) {
            window.history.replaceState(null, '', '#' + id);
        }

        toggleClass(document.getElementById('mobile-menu'), 'open', false);
        syncNavbarOnScroll();
        scrollToTop();
        window.setTimeout(checkReveal, 100);
    }

    function toggleMobile() {
        var mobileMenu = document.getElementById('mobile-menu');
        toggleClass(mobileMenu, 'open');
    }

    function syncNavbarOnScroll() {
        var navbar = document.getElementById('navbar');
        toggleClass(navbar, 'scrolled', window.scrollY > 60 || currentPageId !== 'home');
    }

    function syncCopyrightYear() {
        var yearNode = document.getElementById('current-year');
        if (yearNode) {
            yearNode.textContent = String(new Date().getFullYear());
        }
    }

    function hardenExternalLinks() {
        queryAll('a[target="_blank"]').forEach(function setLinkSecurity(link) {
            var rel = link.getAttribute('rel') || '';
            if (rel.indexOf('noopener') === -1 || rel.indexOf('noreferrer') === -1) {
                link.setAttribute('rel', 'noopener noreferrer');
            }
        });
    }

    function setImageLoadingStrategy() {
        queryAll('img').forEach(function optimizeImage(img) {
            if (!img.classList.contains('hero-img')) {
                img.setAttribute('loading', 'lazy');
                img.setAttribute('decoding', 'async');
            }
        });
    }

    function openPageFromHash() {
        var hash = window.location.hash.replace('#', '');
        if (hash && document.getElementById('page-' + hash)) {
            showPage(hash, null, { updateHash: false });
        } else {
            syncActiveNav(currentPageId);
        }
    }

    window.showPage = showPage;
    window.toggleMobile = toggleMobile;
    window.checkReveal = checkReveal;

    window.addEventListener('scroll', syncNavbarOnScroll, { passive: true });
    window.addEventListener('scroll', checkReveal, { passive: true });
    window.addEventListener('load', function onLoad() {
        openPageFromHash();
        syncNavbarOnScroll();
        checkReveal();
        syncCopyrightYear();
        hardenExternalLinks();
        setImageLoadingStrategy();
    });
})(window, document);
