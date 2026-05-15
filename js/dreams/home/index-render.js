let wasEmptyStateVisible = false;

function renderDreamList(dreamList, dreams, filters) {
  const filteredDreams = getFilteredDreams(dreams, filters);

  const floatingAddButton = document.querySelector(".floating-add-button");
  if (floatingAddButton) {
    floatingAddButton.classList.toggle("is-empty-state", dreams.length === 0);
  }

  if (filteredDreams.length === 0) {
    if (wasEmptyStateVisible) {
      return;
    }

    dreamList.innerHTML = "";

    const emptyState = createEmptyState(
      "Zatím tu nemáš žádné sny",
      "Začni prvním snem, který si chceš splnit.",
      {
        label: "Přidat první sen",
        href: "pages/add-dream.html",
      },
    );

    emptyState.classList.add("empty-state-animated");
    wasEmptyStateVisible = true;
    dreamList.appendChild(emptyState);
    return;
  }

  wasEmptyStateVisible = false;
  dreamList.innerHTML = "";

  filteredDreams.forEach(function (dream) {
    const dreamCard = createDreamCard(dream);
    dreamList.appendChild(dreamCard);
  });
}