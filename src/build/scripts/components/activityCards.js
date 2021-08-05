// Init layout
const elem = document.querySelector('.activities__wrapper');
let iso = elem ? new Isotope( elem, {
  itemSelector: '.activities__card',
  layoutMode: 'fitRows',
  fitRows: {
    gutter: '.gutter-sizer',
  },
  getSortData: {
    name: '[data-sort]',
  },
  sortBy: 'name',
}) : false;

// Filters
const filterEls = document.querySelectorAll('.activities__filters .activities__filter');
let filtersActive = [];

filterEls.forEach(function(el) {
  el.addEventListener('click', function(e) {
    const filterEl = e.currentTarget;
    const filter = filterEl.getAttribute('data-filter');
    filterEl.classList.toggle('activities__filter--active');
    setFiltersHeight(filterEl.parentNode);

    if (filterEl.classList.contains('activities__filter--active')) {
      addFilter(filter);
    } else {
      removeFilter(filter);
    }

    if (filtersActive.length < filterEls.length) {
      iso.arrange({
        filter: filtersActive.join(','),
      });
    } else {
      disableAllFilters();
      iso.arrange({
        filter: '*',
      });
    }

    forceZIndexChange();
  });
});

function addFilter(filter) {
  if (filtersActive.indexOf(filter) == -1) {
    filtersActive.push('.' + filter);
  }
}

function removeFilter(filter) {
  const index = filtersActive.indexOf('.' + filter);
  if (index != -1) {
    filtersActive.splice(index, 1);
  }
}

function disableAllFilters() {
  filtersActive = [];
  filterEls.forEach(function(el) {
    el.classList.remove('activities__filter--active');
  });
}

// Toggle button
document.querySelectorAll('.activities__filter--toggle').forEach(function(el) {
  el.addEventListener('click', function() {
    const parent = el.parentNode;
    parent.classList.toggle('activities__filter--hidden');
    el.innerHTML = parent.classList.contains('activities__filter--hidden') ? 'Show filters' : 'Hide filters';
    setFiltersHeight(parent);
    forceZIndexChange();
  });
});

function setFiltersHeight(wrapper) {
  const hidden = wrapper.classList.contains('activities__filter--hidden') ? true : false;

  if (hidden) {
    const filterHeight = wrapper.querySelector('.activities__filter--toggle').offsetHeight;
    const activeFilters = wrapper.querySelectorAll('.activities__filter--active');
    let lastFilter = activeFilters.length ? activeFilters[activeFilters.length -1] : null;
    wrapper.style.height = lastFilter ? lastFilter.offsetTop + filterHeight + 'px' : filterHeight + 'px';
  } else {
    //const last = wrapper.lastElementChild;
    //wrapper.style.height = last.offsetHeight + last.offsetTop + 'px';
    wrapper.style.height = 'auto';
  }
}

/* 'Fix' for Safari z-index draw bug.
*  Footer z-index didn't play well with z-index content inside main if main resized (mainly triggered from toggling filters.)
*  Force setting z-index each time seems to 'remind' the footer of it's proper z-index.
*/
function forceZIndexChange() {
  const footerEl = document.querySelector('.footer');
  footerEl.style.zIndex = footerEl.style.zIndex === '0' ? '1' : '0';
}
