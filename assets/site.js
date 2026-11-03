/* ============================================================================
   Blue Knight — shared site script
   - Demo account/session handling (browser-only, no server, no passwords kept)
   - Header account chip
   - Mobile navigation
   - Scroll reveal + footer year
   ============================================================================ */
(function () {
  'use strict';

  var ACCOUNTS_KEY = 'blueknight.accounts';
  var SESSION_KEY = 'blueknight.session';

  function area(kind) {
    try { return window[kind]; } catch (err) { return null; }
  }

  function readJSON(store, key) {
    if (!store) return null;
    try {
      var raw = store.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (err) {
      return null;
    }
  }

  function writeJSON(store, key, value) {
    if (!store) return false;
    try {
      store.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      return false;
    }
  }

  function remove(store, key) {
    if (!store) return;
    try { store.removeItem(key); } catch (err) { /* ignore */ }
  }

  function normaliseEmail(email) {
    return String(email || '').trim().toLowerCase();
  }

  /* ------------------------------------------------------------------
     Demo auth: accounts live in localStorage, sessions in
     sessionStorage ("remember me" moves the session to localStorage).
     No password is ever stored or transmitted.
     ------------------------------------------------------------------ */
  var Auth = {
    storageAvailable: function () {
      var store = area('localStorage');
      if (!store) return false;
      try {
        var probe = '__bk_probe__';
        store.setItem(probe, '1');
        store.removeItem(probe);
        return true;
      } catch (err) {
        return false;
      }
    },

    getUser: function () {
      return readJSON(area('sessionStorage'), SESSION_KEY) ||
             readJSON(area('localStorage'), SESSION_KEY);
    },

    accounts: function () {
      return readJSON(area('localStorage'), ACCOUNTS_KEY) || {};
    },

    findAccount: function (email) {
      var accounts = Auth.accounts();
      return accounts[normaliseEmail(email)] || null;
    },

    createAccount: function (name, email) {
      var accounts = Auth.accounts();
      var account = {
        name: String(name || '').trim(),
        email: String(email || '').trim(),
        createdAt: new Date().toISOString()
      };
      accounts[normaliseEmail(email)] = account;
      writeJSON(area('localStorage'), ACCOUNTS_KEY, accounts);
      return account;
    },

    signIn: function (user, remember) {
      var payload = { name: user.name, email: user.email };
      remove(area('localStorage'), SESSION_KEY);
      remove(area('sessionStorage'), SESSION_KEY);
      var store = remember ? area('localStorage') : area('sessionStorage');
      if (!writeJSON(store, SESSION_KEY, payload)) {
        /* storage blocked: keep the session in memory for this page only */
        Auth._memory = payload;
        return payload;
      }
      Auth._memory = null;
      return payload;
    },

    signOut: function () {
      Auth._memory = null;
      remove(area('localStorage'), SESSION_KEY);
      remove(area('sessionStorage'), SESSION_KEY);
    }
  };

  /* keep a memory fallback for privacy modes that block storage */
  var originalGetUser = Auth.getUser;
  Auth.getUser = function () {
    return Auth._memory || originalGetUser();
  };

  window.BKAuth = Auth;

  /* ------------------------------------------------------------------
     Helpers
     ------------------------------------------------------------------ */
  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (ch) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch];
    });
  }

  function initials(name, email) {
    var source = String(name || '').trim() || String(email || '').trim();
    if (!source) return '?';
    var parts = source.split(/[\s._-]+/).filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return source.slice(0, 2).toUpperCase();
  }

  /* ------------------------------------------------------------------
     Header account chip
     ------------------------------------------------------------------ */
  function renderAuthAreas() {
    var slots = document.querySelectorAll('[data-auth]');
    if (!slots.length) return;

    var user = Auth.getUser();

    Array.prototype.forEach.call(slots, function (slot) {
      if (user) {
        slot.innerHTML =
          '<span class="auth-chip">' +
            '<span class="auth-avatar" aria-hidden="true">' + escapeHtml(initials(user.name, user.email)) + '</span>' +
            '<span class="auth-name">' + escapeHtml(user.name || user.email) + '</span>' +
            '<button class="auth-logout" type="button">Log out</button>' +
          '</span>';

        var button = slot.querySelector('.auth-logout');
        if (button) {
          button.addEventListener('click', function () {
            Auth.signOut();
            renderAuthAreas();
            document.dispatchEvent(new CustomEvent('bk:signout'));
          });
        }
      } else {
        slot.innerHTML = '<a class="auth-link" href="login.html">Log in</a>';
      }
    });

    document.documentElement.classList.toggle('signed-in', !!user);
  }

  /* ------------------------------------------------------------------
     Mobile navigation
     ------------------------------------------------------------------ */
  function initNav() {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('siteNav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.textContent = open ? '\u2715' : '\u2630';
    });

    nav.addEventListener('click', function (event) {
      if (event.target.tagName === 'A') {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = '\u2630';
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = '\u2630';
        toggle.focus();
      }
    });
  }

  /* ------------------------------------------------------------------
     Scroll reveal (only applied when JS runs, so content is never hidden)
     ------------------------------------------------------------------ */
  function initReveal() {
    var items = document.querySelectorAll('[data-reveal]');
    if (!items.length) return;

    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    Array.prototype.forEach.call(items, function (item, index) {
      item.classList.add('reveal');
      item.style.transitionDelay = Math.min(index * 60, 240) + 'ms';
      observer.observe(item);
    });
  }

  function initYear() {
    var slots = document.querySelectorAll('[data-year]');
    var year = String(new Date().getFullYear());
    Array.prototype.forEach.call(slots, function (slot) { slot.textContent = year; });
  }

  function boot() {
    renderAuthAreas();
    initNav();
    initReveal();
    initYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  document.addEventListener('bk:signin', renderAuthAreas);
})();
