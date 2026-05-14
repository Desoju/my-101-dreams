function createEmptyState(title, description = "", action = null) {
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

    ${
      action
        ? `
          <a href="${action.href}" class="empty-state-action button-primary">
            ${action.label}
          </a>
        `
        : ""
    }
  `;

  return emptyState;
}