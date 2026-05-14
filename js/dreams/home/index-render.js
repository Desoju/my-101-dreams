function renderDreamList(dreamList, dreams, filters) {
  dreamList.innerHTML = "";

  const filteredDreams = getFilteredDreams(dreams, filters);

  if (filteredDreams.length === 0) {
    const emptyState = dreamList.appendChild(
      createEmptyState(
        "Zatím tu nemáš žádné sny",
        "Začni prvním snem, který si chceš splnit.",
        {
          label: "Přidat první sen",
          href: "pages/add-dream.html",
        },
      ),
    );

    return;
  }

  filteredDreams.forEach(function (dream) {
    const dreamCard = createDreamCard(dream);

    dreamList.appendChild(dreamCard);
  });
}
