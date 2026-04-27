/**
 * Navigation Module
 * Handles mobile menu toggle, keyboard accessibility, and aria-current assignment
 */

/**
 * Get all focusable elements within a container
 */
function getFocusableElements(container) {
  if (!container) return [];
  return container.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
}

/**
 * Set aria-current="page" on the nav link matching the current pathname
 */
function setAriaCurrent() {
  const pathname = window.location.pathname.replace(/\/$/, '') || '/';
  const links = document.querySelectorAll('nav a');

  links.forEach((link) => {
    const href = link.getAttribute('href');
    // Handle both absolute paths and relative paths
    const linkPath = href.replace(/\/$/, '') || '/';

    // Check if current page matches this link
    if (pathname.endsWith(linkPath) || linkPath === '/' && pathname === '/') {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

/**
 * Open the mobile navigation menu
 */
function openMenu(toggleBtn, mobileNav) {
  mobileNav.removeAttribute('hidden');
  toggleBtn.setAttribute('aria-expanded', 'true');
  toggleBtn.setAttribute('aria-label', 'Close navigation menu');

  // Move focus to the first link
  const firstLink = mobileNav.querySelector('a');
  if (firstLink) {
    setTimeout(() => firstLink.focus(), 0);
  }
}

/**
 * Close the mobile navigation menu
 */
function closeMenu(toggleBtn, mobileNav) {
  mobileNav.setAttribute('hidden', '');
  toggleBtn.setAttribute('aria-expanded', 'false');
  toggleBtn.setAttribute('aria-label', 'Open navigation menu');

  // Return focus to toggle button
  toggleBtn.focus();
}

/**
 * Handle keydown events on mobile menu
 */
function handleMenuKeydown(event, toggleBtn, mobileNav) {
  // Escape closes the menu
  if (event.key === 'Escape') {
    closeMenu(toggleBtn, mobileNav);
    return;
  }

  // Tab trap within menu
  if (event.key === 'Tab') {
    const focusableElements = getFocusableElements(mobileNav);
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement;

    // Shift+Tab from first element → focus last
    if (event.shiftKey && activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    }
    // Tab from last element → focus first
    else if (!event.shiftKey && activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }
}

/**
 * Initialize navigation
 */
function initNav() {
  const toggleBtn = document.querySelector('.nav__toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (!toggleBtn || !mobileNav) return;

  // Set initial aria-current
  setAriaCurrent();

  // Toggle button click handler
  toggleBtn.addEventListener('click', () => {
    const isOpen = toggleBtn.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu(toggleBtn, mobileNav);
    } else {
      openMenu(toggleBtn, mobileNav);
    }
  });

  // Close menu when clicking on a link
  const navLinks = mobileNav.querySelectorAll('a');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu(toggleBtn, mobileNav);
    });
  });

  // Keyboard handling for menu
  let keydownListener = null;
  const setupKeydownListener = () => {
    keydownListener = (event) => handleMenuKeydown(event, toggleBtn, mobileNav);
    document.addEventListener('keydown', keydownListener);
  };

  const removeKeydownListener = () => {
    if (keydownListener) {
      document.removeEventListener('keydown', keydownListener);
      keydownListener = null;
    }
  };

  // Watch aria-expanded to toggle keydown listener
  const observer = new MutationObserver(() => {
    const isOpen = toggleBtn.getAttribute('aria-expanded') === 'true';
    if (isOpen && !keydownListener) {
      setupKeydownListener();
    } else if (!isOpen && keydownListener) {
      removeKeydownListener();
    }
  });

  observer.observe(toggleBtn, { attributes: true, attributeFilter: ['aria-expanded'] });

  // Cleanup on unload
  window.addEventListener('beforeunload', () => {
    observer.disconnect();
    removeKeydownListener();
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNav);
} else {
  initNav();
}
