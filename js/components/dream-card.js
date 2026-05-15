function toggleDreamPin(dreamId) {
  const dreams = getDreams();

  const selectedDream = dreams.find(function (dream) {
    return dream.id === dreamId;
  });

  if (!selectedDream) {
    return;
  }

  selectedDream.pinned = !selectedDream.pinned;

  saveDreams(dreams);

  window.location.reload();
}

function openDreamDetail(dreamId) {
  window.location.href = `pages/dream-detail.html?id=${dreamId}`;
}

function createDreamCard(dream) {
  const progress = getDreamProgress(dream);

  const dreamCard = document.createElement("div");

  dreamCard.classList.add("dream-card");

  dreamCard.dataset.id = dream.id;

  const displayPriority = dream.priority || "C";

  const shouldShowPriority =
    dream.status !== "dream_completed" &&
    dream.status !== "dream_not_attractive_anymore";

  dreamCard.innerHTML = `
    <div class="dream-card-top">
      <button
        type="button"
        class="pin-dream-button"
      >
        ${dream.pinned ? "📌" : "📍"}
      </button>

      <h3>${dream.name || "Bez názvu"}</h3>

      <div class="dream-card-tags">
        ${
          shouldShowPriority
            ? `
              <span class="dream-priority priority-${displayPriority}">
                ${displayPriority}
              </span>
            `
            : ""
        }

        <span class="dream-status status-${dream.status}">
          ${getDreamStatusLabel(dream.status)}
        </span>

        <span
          class="
            dream-category
            category-${getCategoryColor(dream.category)}
          "
        >
          ${getCategoryLabel(dream.category)}
        </span>
      </div>
    </div>
    <p class="dream-card-date">
      ${getRemainingTime(dream.completionDate)}
    </p>

    <div class="progress-bar">
      <div
        class="progress-fill"
        style="width: ${progress.percent}%"
      ></div>
    </div>

    <p class="dream-progress-preview">
      ${progress.completed} / ${progress.total}
      kroků splněno
    </p>
  `;

  const pinButton = dreamCard.querySelector(".pin-dream-button");

  pinButton.setAttribute(
    "aria-label",
    dream.pinned ? "Odepnout sen" : "Připnout sen",
  );

  pinButton.addEventListener("click", function (event) {
    event.stopPropagation();
    toggleDreamPin(dream.id);
  });

  dreamCard.addEventListener("click", function () {
    openDreamDetail(dream.id);
  });

  return dreamCard;
}
