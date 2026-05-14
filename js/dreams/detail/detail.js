const viewMode = document.getElementById("viewMode");

if (viewMode) {
  const dreamId = getDreamIdFromUrl();
  const dreams = getDreams();
  const dream = findDreamById(dreams, dreamId);
  const editMode = document.getElementById("editMode");

  scrollToElement(editMode, {
    block: "start",
  });

  if (dream) {
    normalizeDreamSubgoals(dream, dreams);

    renderDreamViewMode(dream, dreams);

    setInterval(function () {
      renderDreamViewMode(dream, dreams);
    }, 60000);

    setupDetailEvents(dream, dreams, dreamId, viewMode, editMode);
  } else {
    document.body.innerHTML = "<h1>Sen nebyl nalezen</h1>";
  }
}
