function renderDreamViewMode(dream, dreams) {
  document.getElementById("dreamTitleText").textContent =
    dream.name || "Bez názvu";

  document.getElementById("dreamDescriptionText").textContent =
    dream.description || "Bez popisu";

  const pinterestLink = document.getElementById("dreamPinterestBoardLink");

  if (dream.pinterestBoardUrl) {
    pinterestLink.href = dream.pinterestBoardUrl;
    pinterestLink.style.display = "inline-flex";
  } else {
    pinterestLink.style.display = "none";
  }

  document.getElementById("completeDreamFromDetailButton").style.display =
    dream.status === "dream_completed" ? "none" : "inline-flex";

  const dreamPriorityText = document.getElementById("dreamPriorityText");

  const shouldShowPriority =
    dream.status !== "dream_completed" &&
    dream.status !== "dream_not_attractive_anymore" &&
    dream.priority;

  if (shouldShowPriority) {
    dreamPriorityText.style.display = "inline-flex";
    dreamPriorityText.textContent = dream.priority;
    dreamPriorityText.className = `dream-priority priority-${dream.priority}`;
  } else {
    dreamPriorityText.style.display = "none";
  }

  const pinDreamButton = document.getElementById("pinDreamButton");

  pinDreamButton.textContent = dream.pinned ? "📌" : "📍";

  const dreamCategoryText = document.getElementById("dreamCategoryText");

  dreamCategoryText.textContent = getCategoryLabel(dream.category);
  dreamCategoryText.className = `dream-category category-${getCategoryColor(
    dream.category,
  )}`;

  const dreamCompletionDateText = document.getElementById(
    "dreamCompletionDateText",
  );

  dreamCompletionDateText.textContent = dream.completionDate
    ? formatDate(dream.completionDate)
    : "Nastavit datum";

  dreamCompletionDateText.classList.toggle(
    "clickable-detail-value",
    !dream.completionDate,
  );

  document.getElementById("dreamRemainingTime").textContent = getRemainingTime(
    dream.completionDate,
  );

  const dreamStatusText = document.getElementById("dreamStatusText");

  dreamStatusText.textContent = getDreamStatusLabel(dream.status);
  dreamStatusText.className = `dream-status status-${dream.status}`;

  renderDreamProgress(dream);

  renderSubgoals(dream, dreams, function () {
    renderDreamViewMode(dream, dreams);
  });
}
