function getPriorityADreamCount(dreams, ignoredDreamId = null) {
  return dreams.filter(function (dream) {
    return (
      dream.priority === DREAM_PRIORITY.A &&
      dream.status !== DREAM_STATUS.COMPLETED &&
      dream.status !== DREAM_STATUS.INACTIVE &&
      dream.id !== ignoredDreamId
    );
  }).length;
}

function canSetPriorityA(dreams, ignoredDreamId = null) {
  return (
    getPriorityADreamCount(dreams, ignoredDreamId) <
    DREAM_LIMITS.MAX_PRIORITY_A_DREAMS
  );
}

function getPriorityDreamCount(dreams, priority) {
  return dreams.filter(function (dream) {
    return (
      dream.status !== DREAM_STATUS.COMPLETED &&
      dream.status !== DREAM_STATUS.INACTIVE &&
      (dream.priority || DREAM_PRIORITY.C) === priority
    );
  }).length;
}