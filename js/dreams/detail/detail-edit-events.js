function setupDetailEvents(dream, dreams, dreamId, viewMode, editMode) {
  let isEditDirty = false;

  const backLink = document.querySelector(".back-link");

  if (backLink) {
    backLink.addEventListener("click", function (event) {
      if (!isEditDirty) {
        return;
      }

      const shouldLeave = confirm("Máš neuložené změny. Opravdu chceš odejít?");

      if (!shouldLeave) {
        event.preventDefault();
      }
    });
  }

  document
    .getElementById("editDreamButton")
    .addEventListener("click", function () {
      fillDreamEditMode(dream);
      isEditDirty = false;

      viewMode.style.display = "none";
      editMode.style.display = "grid";
    });

  document
    .getElementById("cancelEditButton")
    .addEventListener("click", function () {
      if (isEditDirty) {
        const shouldCancel = confirm(
          "Máš neuložené změny. Opravdu chceš zrušit úpravy?",
        );

        if (!shouldCancel) {
          return;
        }
      }

      isEditDirty = false;

      viewMode.style.display = "block";
      editMode.style.display = "none";
    });

  document
    .getElementById("addEditSubgoalButton")
    .addEventListener("click", function () {
      document
        .getElementById("editSubgoalsContainer")
        .appendChild(createSubgoalEditField());

      updateEditSubgoalDateLimits();

      isEditDirty = true;
    });

  editMode.addEventListener("input", function () {
    isEditDirty = true;
  });

  editMode.addEventListener("change", function () {
    isEditDirty = true;
  });

  document
    .getElementById("saveDreamButton")
    .addEventListener("click", function () {
      const wasSaved = saveDreamEditChanges(dream);

      if (!wasSaved) {
        return;
      }

      saveDreams(dreams);
      renderDreamViewMode(dream, dreams);

      isEditDirty = false;

      viewMode.style.display = "block";
      editMode.style.display = "none";
    });

  document
    .getElementById("deleteDreamButton")
    .addEventListener("click", function () {
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
    .addEventListener("click", function () {
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
      isEditDirty = false;

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
