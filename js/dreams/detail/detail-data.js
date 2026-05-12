function getDreamIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return Number(params.get("id"));
}

function findDreamById(dreams, dreamId) {
  return dreams.find(function (item) {
    return item.id === dreamId;
  });
}

function normalizeDreamSubgoals(dream, dreams) {
  if (!dream.subgoals && dream.subgoal) {
    dream.subgoals = [dream.subgoal];
    delete dream.subgoal;
    saveDreams(dreams);
  }

  if (!dream.subgoals) {
    dream.subgoals = [];
  }
}
