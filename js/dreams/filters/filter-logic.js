function getFilteredDreams(dreams, filters) {
  const filteredDreams = dreams.filter(function (dream) {
    const matchesStatus =
      filters.statuses.length === 0 || filters.statuses.includes(dream.status);

    const matchesCategory =
      filters.categories.length === 0 ||
      filters.categories.includes(dream.category);

    const isFilteringCompleted = filters.statuses.includes("dream_completed");

    const isFilteringInactive = filters.statuses.includes(
      "dream_not_attractive_anymore",
    );

    const matchesVisibility =
      isFilteringCompleted ||
      isFilteringInactive ||
      filters.showInactive ||
      (dream.status !== "dream_completed" &&
        dream.status !== "dream_not_attractive_anymore");

    const searchText = normalizeText(filters.search || "");
    const dreamName = normalizeText(dream.name || "");

    const matchesSearch =
      searchText === "" ||
      dreamName.split(" ").some(function (word) {
        return word.startsWith(searchText);
      });

    const dreamPriority = dream.priority || "C";

    const matchesPriority =
      !filters.priorities ||
      filters.priorities.length === 0 ||
      filters.priorities.includes(dreamPriority);

    return (
      matchesPriority &&
      matchesStatus &&
      matchesCategory &&
      matchesVisibility &&
      matchesSearch
    );
  });

  return sortDreamsByPinnedAndPriority(filteredDreams);
}
