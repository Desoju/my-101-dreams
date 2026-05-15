function createDreamEditAutosave(dream, dreams) {
  let isEditDirty = false;
  let autosaveTimeout;

  const autosaveStatus = document.getElementById("editAutosaveStatus");

  function setStatus(message) {
    if (!autosaveStatus) {
      return;
    }

    autosaveStatus.textContent = message;
  }

  function clearStatusLater() {
    setTimeout(function () {
      setStatus("");
    }, 1500);
  }

  function markDirty() {
    isEditDirty = true;
  }

  function markClean() {
    isEditDirty = false;
    setStatus("");
  }

  function isDirty() {
    return isEditDirty;
  }

  function cancelPendingAutosave() {
    clearTimeout(autosaveTimeout);
  }

  function runAutosave() {
    clearTimeout(autosaveTimeout);

    setStatus("Ukládám…");

    autosaveTimeout = setTimeout(function () {
      if (!isEditDirty) {
        setStatus("");
        return;
      }

      const wasSaved = saveDreamEditChanges(dream);

      if (!wasSaved) {
        setStatus("");
        return;
      }

      saveDreams(dreams);
      renderDreamViewMode(dream, dreams);

      isEditDirty = false;
      setStatus("Uloženo");
      clearStatusLater();
    }, 700);
  }

  function saveNow() {
    clearTimeout(autosaveTimeout);

    const wasSaved = saveDreamEditChanges(dream);

    if (!wasSaved) {
      setStatus("Neuloženo");
      return false;
    }

    saveDreams(dreams);
    renderDreamViewMode(dream, dreams);

    isEditDirty = false;
    setStatus("");

    return true;
  }

  return {
    markDirty,
    markClean,
    isDirty,
    runAutosave,
    saveNow,
    setStatus,
    cancelPendingAutosave,
  };
}