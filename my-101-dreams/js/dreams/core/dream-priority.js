function getPriorityADreamCount(dreams, ignoredDreamId = null) {
  return dreams.filter(function (dream) {
    return (
      dream.priority === "A" &&
      dream.status !== "dream_completed" &&
      dream.status !== "dream_not_attractive_anymore" &&
      dream.id !== ignoredDreamId
    );
  }).length;
}

function canSetPriorityA(dreams, ignoredDreamId = null) {
  return getPriorityADreamCount(dreams, ignoredDreamId) < 10;
}

function getPriorityDreamCount(dreams, priority) {
  return dreams.filter(function (dream) {
    return (
      dream.status !== "dream_completed" &&
      dream.status !== "dream_not_attractive_anymore" &&
      (dream.priority || "C") === priority
    );
  }).length;
}
