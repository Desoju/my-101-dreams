function getDreamProgress(dream) {
  const subgoals = dream.subgoals || [];

  if (dream.status === "dream_completed") {
    return {
      completed: subgoals.length,
      total: subgoals.length,
      percent: 100,
    };
  }

  const totalSubgoals = subgoals.length;

  if (totalSubgoals === 0) {
    return {
      completed: 0,
      total: 0,
      percent: 0,
    };
  }

  const completedSubgoals = subgoals.filter(function (subgoal) {
    return subgoal.completed === true;
  }).length;

  return {
    completed: completedSubgoals,
    total: totalSubgoals,
    percent: Math.round((completedSubgoals / totalSubgoals) * 100),
  };
}