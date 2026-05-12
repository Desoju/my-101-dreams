function getCheckedValues(selector) {
  return Array.from(
    document.querySelectorAll(`${selector}:checked`)
  ).map(function (checkbox) {
    return checkbox.value;
  });
}

function setupCheckboxFilter(
  selector,
  updateFilter,
  onFilterChange,
  filters
) {
  document.querySelectorAll(selector).forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      updateFilter(getCheckedValues(selector));
      onFilterChange(filters);
    });
  });
}

function clearFilterCheckboxes() {
  document
    .querySelectorAll(
      ".status-filter-checkbox, .category-filter-checkbox, .priority-filter-checkbox"
    )
    .forEach(function (checkbox) {
      checkbox.checked = false;
    });
}

function setupDreamFilters(onFilterChange) {
  const searchInput = document.getElementById("dreamSearchInput");
  const toggleFiltersButton = document.getElementById("toggleFiltersButton");
  const filtersPanel = document.getElementById("filtersPanel");
  const showInactiveDreams = document.getElementById("showInactiveDreams");
  const clearFiltersButton = document.getElementById("clearFiltersButton");

  const filters = {
    search: "",
    statuses: [],
    categories: [],
    priorities: [],
    showInactive: false,
  };

  fillCategoryFilter();

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      filters.search = searchInput.value;
      onFilterChange(filters);
    });
  }

  if (toggleFiltersButton && filtersPanel) {
    toggleFiltersButton.addEventListener("click", function () {
      filtersPanel.classList.toggle("hidden");

      if (typeof updateHomeStatsVisibility === "function") {
        updateHomeStatsVisibility();
      }
    });
  }

  setupCheckboxFilter(".status-filter-checkbox", function (values) {
    filters.statuses = values;
  }, onFilterChange, filters);

  setupCheckboxFilter(".category-filter-checkbox", function (values) {
    filters.categories = values;
  }, onFilterChange, filters);

  setupCheckboxFilter(".priority-filter-checkbox", function (values) {
    filters.priorities = values;
  }, onFilterChange, filters);

  if (showInactiveDreams) {
    showInactiveDreams.addEventListener("change", function () {
      filters.showInactive = showInactiveDreams.checked;
      onFilterChange(filters);
    });
  }

  if (clearFiltersButton) {
    clearFiltersButton.addEventListener("click", function () {
      filters.search = "";
      filters.statuses = [];
      filters.categories = [];
      filters.priorities = [];
      filters.showInactive = false;

      if (searchInput) {
        searchInput.value = "";
      }

      if (showInactiveDreams) {
        showInactiveDreams.checked = false;
      }

      clearFilterCheckboxes();

      onFilterChange(filters);
    });
  }

  return filters;
}