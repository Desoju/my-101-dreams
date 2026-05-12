function setupStatCardFilters(currentFilters, renderDreams) {
  document.querySelectorAll(".stat-card").forEach(function (statCard) {
    statCard.addEventListener("click", function () {
      const isAlreadyActive = statCard.classList.contains("stat-card-active");

      document.querySelectorAll(".stat-card").forEach(function (card) {
        card.classList.remove("stat-card-active");
      });

      currentFilters.statuses = [];
      currentFilters.priorities = [];

      if (isAlreadyActive) {
        renderDreams();

        return;
      }

      statCard.classList.add("stat-card-active");

      const filterType = statCard.dataset.filterType;

      const filterValue = statCard.dataset.filterValue;

      if (filterType === "status") {
        currentFilters.statuses = [filterValue];
      }

      if (filterType === "priority") {
        currentFilters.priorities = [filterValue];
      }

      renderDreams();
    });
  });
}
