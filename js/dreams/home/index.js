const dreamList = document.getElementById("dreamList");

setupHomeLayout();

if (dreamList) {
  renderDreamSkeletonList(dreamList);

  requestAnimationFrame(function () {
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

      updateStatCardAriaPressed();
      updateHomeStatsVisibility();
      renderDreams();
    });

    renderDreams();
  });
}