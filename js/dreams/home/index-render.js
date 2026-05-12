function renderDreamList(dreamList, dreams, filters) {
  dreamList.innerHTML = "";

  const filteredDreams = getFilteredDreams(dreams, filters);

  if (filteredDreams.length === 0) {
    const emptyState = createEmptyState("Žádné sny neodpovídají filtru.");

    dreamList.appendChild(emptyState);

    return;
  }

  filteredDreams.forEach(function (dream) {
    const dreamCard = createDreamCard(dream);

    dreamList.appendChild(dreamCard);
  });
}
