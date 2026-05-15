function toggleDreamPin(dreamId) {
  const dreams = getDreams();

  const selectedDream = dreams.find(function (dream) {
    return dream.id === dreamId;
  });

  if (!selectedDream) {
    return null;
  }

  selectedDream.pinned = !selectedDream.pinned;

  saveDreams(dreams);

  return selectedDream.pinned;
}

function openDreamDetail(dreamId) {
  window.location.href = `pages/dream-detail.html?id=${dreamId}`;
}

function createDreamCard(dream) {
  const progress = getDreamProgress(dream);

  const dreamCard = document.createElement("div");

  dreamCard.classList.add("dream-card");
  dreamCard.dataset.id = dream.id;
  dreamCard.tabIndex = 0;
  dreamCard.setAttribute("role", "link");
  dreamCard.setAttribute(
    "aria-label",
    `Otevřít detail snu: ${dream.name || "Bez názvu"}`,
  );

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
        <span aria-hidden="true">
          ${dream.pinned ? "📌" : "📍"}
        </span>
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
        role="progressbar"
        aria-label="Postup plnění snu"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="${progress.percent}"
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

    const isPinned = toggleDreamPin(dream.id);

    if (isPinned === null) {
      return;
    }

    dream.pinned = isPinned;

    pinButton.setAttribute(
      "aria-label",
      isPinned ? "Odepnout sen" : "Připnout sen",
    );

    pinButton.innerHTML = `
    <span aria-hidden="true">
      ${isPinned ? "📌" : "📍"}
    </span>
  `;
  });

  dreamCard.addEventListener("click", function () {
    openDreamDetail(dream.id);
  });

  dreamCard.addEventListener("keydown", function (event) {
    if (event.target === pinButton) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openDreamDetail(dream.id);
    }
  });

  return dreamCard;
}
