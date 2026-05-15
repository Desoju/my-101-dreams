function updateHomeStatsVisibility() {
  const homeStats = document.querySelector(".home-stats");
  const filtersPanel = document.getElementById("filtersPanel");

  if (!homeStats || !filtersPanel) {
    return;
  }

  const isFilterOpen = !filtersPanel.classList.contains("hidden");

  homeStats.classList.toggle("home-stats-hidden", isFilterOpen);
}

function setupHomeLayout() {
  window.addEventListener("resize", updateHomeStatsVisibility);

  updateHomeStatsVisibility();
}