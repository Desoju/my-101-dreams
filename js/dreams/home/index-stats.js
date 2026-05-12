function updateHomeStats(dreams) {
  const completedDreamsCount = countDreamsByStatus(dreams, "dream_completed");

  updateStatCard(
    "globalDreamProgress",
    `${completedDreamsCount} / ${dreams.length}`,
  );

  updateStatCard("activeDreams", countDreamsByStatus(dreams, "dream_active"));

  updateStatCard("priorityACount", getPriorityDreamCount(dreams, "A"));

  updateStatCard("priorityBCount", getPriorityDreamCount(dreams, "B"));

  updateStatCard("priorityCCount", getPriorityDreamCount(dreams, "C"));
}
