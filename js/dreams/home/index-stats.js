function updateHomeStats(dreams) {
  const completedDreamsCount = countDreamsByStatus(dreams, "dream_completed");

  const visibleDreams = dreams.filter(function (dream) {
    return dream.status !== "dream_not_attractive_anymore";
  });

  updateStatCard(
    "globalDreamProgress",
    `${completedDreamsCount} / ${visibleDreams.length}`,
  );

  updateStatCard("activeDreams", countDreamsByStatus(dreams, "dream_active"));

  updateStatCard("futureDreams", countDreamsByStatus(dreams, "dream_to_be_completed"));

  updateStatCard("priorityACount", getPriorityDreamCount(dreams, "A"));

  updateStatCard("priorityBCount", getPriorityDreamCount(dreams, "B"));

  updateStatCard("priorityCCount", getPriorityDreamCount(dreams, "C"));
}
