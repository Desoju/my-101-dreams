function countDreamsByStatus(dreams, status) {
  return dreams.filter(function (dream) {
    return dream.status === status;
  }).length;
}
