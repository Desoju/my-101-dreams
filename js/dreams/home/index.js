const dreamList = document.getElementById("dreamList");
const homeStats = document.querySelector(".home-stats");
const filtersPanel = document.getElementById("filtersPanel");

function updateHomeStatsVisibility() {
  if (!homeStats || !filtersPanel) {
    return;
  }

  const isFilterOpen = !filtersPanel.classList.contains("hidden");

  homeStats.classList.toggle("home-stats-hidden", isFilterOpen);
}

window.addEventListener("resize", updateHomeStatsVisibility);

updateHomeStatsVisibility();

if (dreamList) {
  const dreams = getDreams();

  let currentFilters = {
    search: "",
    statuses: [],
    categories: [],
    showInactive: false,
    priorities: [],
  };

  updateHomeStats(dreams);

  setupStatCardFilters(currentFilters, renderDreams);

  function renderDreams() {
    renderDreamList(dreamList, dreams, currentFilters);
  }

  setupDreamFilters(function (newFilters) {
    currentFilters.search = newFilters.search;
    currentFilters.categories = newFilters.categories;
    currentFilters.showInactive = newFilters.showInactive;
    currentFilters.statuses = newFilters.statuses;
    currentFilters.priorities = newFilters.priorities;

    document.querySelectorAll(".stat-card").forEach(function (card) {
      card.classList.remove("stat-card-active");
    });

    updateHomeStatsVisibility();
    renderDreams();
  });

  renderDreams();
}
