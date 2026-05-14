function createEmptyState(title, description = "") {
  const emptyState = document.createElement("div");

  emptyState.classList.add("empty-state");

  emptyState.innerHTML = `
    <h2 class="empty-state-title">
      ${title}
    </h2>

    ${
      description
        ? `
          <p class="empty-state-description">
            ${description}
          </p>
        `
        : ""
    }
  `;

  return emptyState;
}