function setupDetailEvents(dream, dreams, dreamId, viewMode, editMode) {
  const autosave = createDreamEditAutosave(dream, dreams);

  setupBackLinkGuard(autosave);

  document
    .getElementById("editDreamButton")
    .addEventListener("click", function () {
      fillDreamEditMode(dream);
      autosave.markClean();
      viewMode.style.display = "none";
      editMode.style.display = "grid";
    });

  document
    .getElementById("cancelEditButton")
    .addEventListener("click", async function () {
      const canLeaveEdit = await confirmCancelEdit(autosave);

      if (!canLeaveEdit) {
        return;
      }

      viewMode.style.display = "block";
      editMode.style.display = "none";
    });

  document
    .getElementById("addEditSubgoalButton")
    .addEventListener("click", function () {
      const editSubgoalsContainer = document.getElementById(
        "editSubgoalsContainer",
      );

      const subgoalForm = createSubgoalEditField();

      editSubgoalsContainer.appendChild(subgoalForm);

      scrollToElement(subgoalForm, {
        block: "center",
      });

      autosave.markDirty();
      autosave.runAutosave();
    });

  editMode.addEventListener("input", function () {
    autosave.markDirty();
    autosave.runAutosave();
  });

  editMode.addEventListener("change", function () {
    autosave.markDirty();
    autosave.runAutosave();
  });

  document
    .getElementById("saveDreamButton")
    .addEventListener("click", function () {
      const wasSaved = autosave.saveNow();

      if (!wasSaved) {
        return;
      }

      viewMode.style.display = "block";
      editMode.style.display = "none";
    });

  document
    .getElementById("deleteDreamButton")
    .addEventListener("click", function () {
      autosave.cancelPendingAutosave();
      deleteDream(dreams, dreamId);
    });

  document
    .getElementById("completeDreamButton")
    .addEventListener("click", function () {
      completeDream(dream, dreams);
      renderDreamViewMode(dream, dreams);
    });

  document
    .getElementById("completeDreamFromDetailButton")
    .addEventListener("click", function () {
      completeDream(dream, dreams);
      renderDreamViewMode(dream, dreams);
    });

  document
    .getElementById("pinDreamButton")
    .addEventListener("click", function (event) {
      event.preventDefault();

      toggleDreamPin(dream, dreams);
      renderDreamViewMode(dream, dreams);
    });

  document
    .getElementById("dreamCompletionDateCard")
    .addEventListener("click", function () {
      if (dream.completionDate) {
        return;
      }

      fillDreamEditMode(dream);

      autosave.markClean();

      viewMode.style.display = "none";
      editMode.style.display = "grid";

      document.getElementById("dreamCompletionDateInput").focus();
    });

  document.addEventListener("click", function (event) {
    if (event.target.type === "datetime-local" && event.target.showPicker) {
      event.target.showPicker();
    }
  });
}