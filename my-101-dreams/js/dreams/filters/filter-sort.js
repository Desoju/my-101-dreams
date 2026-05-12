function sortDreamsByPinnedAndPriority(dreams) {
  const priorityOrder = {
    A: 0,
    B: 1,
    C: 2,
  };

  dreams.sort(function (firstDream, secondDream) {
    const pinnedDifference =
      Number(secondDream.pinned === true) - Number(firstDream.pinned === true);

    if (pinnedDifference !== 0) {
      return pinnedDifference;
    }

    return (
      priorityOrder[firstDream.priority || "C"] -
      priorityOrder[secondDream.priority || "C"]
    );
  });

  return dreams;
}
