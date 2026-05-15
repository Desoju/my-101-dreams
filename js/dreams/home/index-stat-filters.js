function updateStatCardAriaPressed() {
  document.querySelectorAll(".stat-card").forEach(function (card) {
    card.setAttribute(
      "aria-pressed",
      card.classList.contains("stat-card-active") ? "true" : "false",
    );
  });
}

function applyStatCardFilter(statCard, currentFilters, renderDreams) {
  const isAlreadyActive = statCard.classList.contains("stat-card-active");

  document.querySelectorAll(".stat-card").forEach(function (card) {
    card.classList.remove("stat-card-active");
  });

  currentFilters.statuses = [];
  currentFilters.priorities = [];

  if (isAlreadyActive) {
    updateStatCardAriaPressed();
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

  updateStatCardAriaPressed();
  renderDreams();
}

function setupStatCardFilters(currentFilters, renderDreams) {
  document.querySelectorAll(".stat-card").forEach(function (statCard) {
    statCard.setAttribute("role", "button");
    statCard.tabIndex = 0;
    statCard.setAttribute("aria-pressed", "false");

    statCard.addEventListener("click", function () {
      applyStatCardFilter(statCard, currentFilters, renderDreams);
    });

    statCard.addEventListener("keydown", function (event) {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }

      event.preventDefault();
      applyStatCardFilter(statCard, currentFilters, renderDreams);
    });
  });
}
