/**
 * Portfolio Filter Module
 * Handles project filtering by category with aria-live announcements
 */

/**
 * Get tag array from a project card
 */
function getCardTags(card) {
  const tagsAttr = card.getAttribute('data-tags');
  return tagsAttr ? tagsAttr.split(/\s+/).filter(Boolean) : [];
}

/**
 * Show or hide a project card based on active filter
 */
function toggleCard(card, activeFilter) {
  const tags = getCardTags(card);
  const shouldShow = activeFilter === 'all' || tags.includes(activeFilter);

  if (shouldShow) {
    card.removeAttribute('hidden');
  } else {
    card.setAttribute('hidden', '');
  }
}

/**
 * Apply filter to all cards and announce changes
 */
function applyFilter(activeFilter, cards, statusRegion) {
  let visibleCount = 0;

  cards.forEach((card) => {
    toggleCard(card, activeFilter);
    if (!card.hasAttribute('hidden')) {
      visibleCount++;
    }
  });

  announceCount(visibleCount, cards.length, activeFilter, statusRegion);
}

/**
 * Update aria-pressed state on filter buttons
 */
function updateButtonStates(activeFilter, filterBtns) {
  filterBtns.forEach((btn) => {
    const filter = btn.getAttribute('data-filter');
    const isActive = filter === activeFilter;

    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    if (isActive) {
      btn.classList.add('filter-btn--active');
    } else {
      btn.classList.remove('filter-btn--active');
    }
  });
}

/**
 * Announce filter results to screen readers
 * Uses rAF trick to ensure live region announcements are picked up
 */
function announceCount(visibleCount, totalCount, activeFilter, statusRegion) {
  // Clear the region to trigger re-announcement
  statusRegion.textContent = '';

  // Use rAF to set content on next frame
  requestAnimationFrame(() => {
    let message = '';

    if (activeFilter === 'all') {
      message = `Showing all ${totalCount} projects`;
    } else {
      const categoryLabel = {
        'theme-dev': 'Theme Development',
        'store-setup': 'Store Setup',
        'ai-integration': 'AI Integration',
        'shopify-20': 'Shopify 2.0',
        'shopify-flow': 'Shopify Flow',
      }[activeFilter] || activeFilter;

      message = `Showing ${visibleCount} of ${totalCount} projects in ${categoryLabel}`;
    }

    statusRegion.textContent = message;
  });
}

/**
 * Initialize portfolio filters
 */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.card--project');
  const statusRegion = document.getElementById('filter-status');

  if (!filterBtns.length || !cards.length || !statusRegion) {
    return;
  }

  // Initial state: show all
  let currentFilter = 'all';

  // Bind click handlers to filter buttons
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Only update if filter actually changed
      if (filter !== currentFilter) {
        currentFilter = filter;
        updateButtonStates(currentFilter, filterBtns);
        applyFilter(currentFilter, cards, statusRegion);

        // Scroll filter bar into view for better UX
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      }
    });
  });

  // Initialize with all shown
  updateButtonStates(currentFilter, filterBtns);
  announceCount(cards.length, cards.length, currentFilter, statusRegion);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPortfolioFilters);
} else {
  initPortfolioFilters();
}
