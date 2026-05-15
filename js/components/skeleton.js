function renderDreamSkeletonList(container, count = 5) {
  container.innerHTML = "";

  for (let i = 0; i < count; i += 1) {
    const card = document.createElement("div");
    card.className = "dream-card dream-card-skeleton";
    card.setAttribute("aria-hidden", "true");

    card.innerHTML = `
      <div class="skeleton-row skeleton-row-top">
        <span class="skeleton-line skeleton-title"></span>
        <span class="skeleton-pill"></span>
      </div>
      <span class="skeleton-line skeleton-date"></span>
      <span class="skeleton-line skeleton-progress"></span>
      <span class="skeleton-line skeleton-small"></span>
    `;

    container.appendChild(card);
  }
}