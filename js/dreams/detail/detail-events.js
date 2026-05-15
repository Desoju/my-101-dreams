function setupDetailEvents(dream, dreams, dreamId, viewMode, editMode) {
  let isEditDirty = false;
  let autosaveTimeout;

  const autosaveStatus = document.getElementById("editAutosaveStatus");

  function setAutosaveStatus(message) {
    if (!autosaveStatus) {
      return;
    }

    autosaveStatus.textContent = message;
  }

  function clearAutosaveStatusLater() {
    setTimeout(function () {
      setAutosaveStatus("");
    }, 1500);
  }

  function autosaveDreamEdit() {
    clearTimeout(autosaveTimeout);

    setAutosaveStatus("Ukládám…");

    autosaveTimeout = setTimeout(function () {
      if (!isEditDirty) {
        setAutosaveStatus("");
        return;
      }

      const wasSaved = saveDreamEditChanges(dream);

      if (!wasSaved) {
        setAutosaveStatus("");
        return;
      }

      saveDreams(dreams);
      renderDreamViewMode(dream, dreams);

      isEditDirty = false;
      setAutosaveStatus("Uloženo");
      clearAutosaveStatusLater();
    }, 700);
  }

  const backLink = document.querySelector(".back-link");

  if (backLink) {
    backLink.addEventListener("click", async function (event) {
      if (!isEditDirty) {
        return;
      }

      event.preventDefault();

      const shouldLeave = await showConfirm(
        "Máš neuložené změny.\nOpravdu chceš odejít?",
      );

      if (shouldLeave) {
        isEditDirty = false;
        window.location.href = backLink.href;
      }
    });
  }

  document
    .getElementById("editDreamButton")
    .addEventListener("click", function () {
      fillDreamEditMode(dream);
      isEditDirty = false;
      setAutosaveStatus("");
      viewMode.style.display = "none";
      editMode.style.display = "grid";
    });

  document
    .getElementById("cancelEditButton")
    .addEventListener("click", async function () {
      clearTimeout(autosaveTimeout);

      if (isEditDirty) {
        const shouldCancel = await showConfirm(
          "Máš neuložené změny.\nOpravdu chceš zrušit úpravy?",
        );

        if (!shouldCancel) {
          return;
        }
      }

      isEditDirty = false;
      setAutosaveStatus("");
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

      isEditDirty = true;
      autosaveDreamEdit();
    });

  editMode.addEventListener("input", function () {
    isEditDirty = true;
    autosaveDreamEdit();
  });

  editMode.addEventListener("change", function () {
    isEditDirty = true;
    autosaveDreamEdit();
  });

  document
    .getElementById("saveDreamButton")
    .addEventListener("click", function () {
      clearTimeout(autosaveTimeout);

      const wasSaved = saveDreamEditChanges(dream);

      if (!wasSaved) {
        setAutosaveStatus("Neuloženo");
        return;
      }

      saveDreams(dreams);
      renderDreamViewMode(dream, dreams);

      isEditDirty = false;
      setAutosaveStatus("");
      viewMode.style.display = "block";
      editMode.style.display = "none";
    });

  document
    .getElementById("deleteDreamButton")
    .addEventListener("click", function () {
      clearTimeout(autosaveTimeout);
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
      isEditDirty = false;
      setAutosaveStatus("");
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
