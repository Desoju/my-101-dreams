function renderDreamProgress(dream) {
  const progress = getDreamProgress(dream);
  const progressFill = document.getElementById("dreamProgressFill");

  document.getElementById("dreamProgressText").textContent =
    `${progress.completed} / ${progress.total} ` +
    `kroků splněno (${progress.percent} %)`;

  progressFill.style.width = `${progress.percent}%`;
  progressFill.setAttribute("role", "progressbar");
  progressFill.setAttribute("aria-valuemin", "0");
  progressFill.setAttribute("aria-valuemax", "100");
  progressFill.setAttribute("aria-valuenow", String(progress.percent));
  progressFill.setAttribute("aria-label", "Průběh splnění snu");

  const completedDreamNotice = document.getElementById("completedDreamNotice");

  if (
    completedDreamNotice &&
    progress.percent === 100 &&
    dream.status !== "dream_completed"
  ) {
    completedDreamNotice.style.display = "block";

    return;
  }

  if (completedDreamNotice) {
    completedDreamNotice.style.display = "none";
  }
}