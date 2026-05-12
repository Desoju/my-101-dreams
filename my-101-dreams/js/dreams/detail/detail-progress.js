function renderDreamProgress(dream) {
  const progress = getDreamProgress(dream);

  document.getElementById("dreamProgressText").textContent =
    `${progress.completed} / ${progress.total} ` +
    `kroků splněno (${progress.percent} %)`;

  document.getElementById("dreamProgressFill").style.width =
    `${progress.percent}%`;

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
