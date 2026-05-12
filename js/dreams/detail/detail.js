const viewMode = document.getElementById("viewMode");
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

if (viewMode) {
  const params = new URLSearchParams(window.location.search);
  const dreamId = Number(params.get("id"));

  const dreams = getDreams();

  const dream = dreams.find(function (item) {
    return item.id === dreamId;
  });

  const editMode = document.getElementById("editMode");

  if (dream) {
    if (!dream.subgoals && dream.subgoal) {
      dream.subgoals = [dream.subgoal];
      delete dream.subgoal;
      saveDreams(dreams);
    }

    if (!dream.subgoals) {
      dream.subgoals = [];
    }

    function renderViewMode() {
      document.getElementById("dreamTitleText").textContent =
        dream.name || "Bez názvu";

      document.getElementById("dreamDescriptionText").textContent =
        dream.description || "Bez popisu";

      document.getElementById("completeDreamFromDetailButton").style.display =
        dream.status === "dream_completed" ? "none" : "inline-flex";

      const dreamPriorityText = document.getElementById("dreamPriorityText");
      const shouldShowPriority =
        dream.status !== "dream_completed" &&
        dream.status !== "dream_not_attractive_anymore" &&
        dream.priority;

      if (shouldShowPriority) {
        dreamPriorityText.style.display = "inline-flex";
        dreamPriorityText.textContent = dream.priority;
        dreamPriorityText.className = `dream-priority priority-${dream.priority}`;
      } else {
        dreamPriorityText.style.display = "none";
      }

      const pinDreamButton = document.getElementById("pinDreamButton");

      pinDreamButton.textContent = dream.pinned ? "📌" : "📍";

      const dreamCategoryText = document.getElementById("dreamCategoryText");

      dreamCategoryText.textContent = getCategoryLabel(dream.category);

      dreamCategoryText.className = `dream-category category-${getCategoryColor(dream.category)}`;

      const dreamCompletionDateText = document.getElementById(
        "dreamCompletionDateText",
      );

      dreamCompletionDateText.textContent = dream.completionDate
        ? formatDate(dream.completionDate)
        : "Nastavit datum";

      dreamCompletionDateText.classList.toggle(
        "clickable-detail-value",
        !dream.completionDate,
      );

      document.getElementById("dreamRemainingTime").textContent =
        getRemainingTime(dream.completionDate);

      const dreamStatusText = document.getElementById("dreamStatusText");

      dreamStatusText.textContent = getDreamStatusLabel(dream.status);

      dreamStatusText.className = `dream-status status-${dream.status}`;

      renderDreamProgress(dream);
      renderSubgoals(dream, dreams, renderViewMode);
    }

    renderViewMode();

    setInterval(function () {
      renderViewMode();
    }, 60000);

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
        renderViewMode();

        isEditDirty = false;
        viewMode.style.display = "block";
        editMode.style.display = "none";
      });

    document
      .getElementById("deleteDreamButton")
      .addEventListener("click", function () {
        const confirmDelete = confirm("Opravdu chceš tento sen smazat?");

        if (confirmDelete) {
          const updatedDreams = dreams.filter(function (item) {
            return item.id !== dreamId;
          });

          saveDreams(updatedDreams);

          window.location.href = "../index.html";
        }
      });

    document
      .getElementById("completeDreamButton")
      .addEventListener("click", function () {
        dream.status = "dream_completed";
        dream.pinned = false;
        dream.subgoals.forEach(function (subgoal) {
          subgoal.completed = true;
        });

        saveDreams(dreams);
        renderViewMode();
      });

    document
      .getElementById("pinDreamButton")
      .addEventListener("click", function () {
        dream.pinned = !dream.pinned;

        saveDreams(dreams);
        renderViewMode();
      });

    document
      .getElementById("completeDreamFromDetailButton")
      .addEventListener("click", function () {
        dream.status = "dream_completed";
        dream.pinned = false;

        dream.subgoals.forEach(function (subgoal) {
          subgoal.completed = true;
        });

        saveDreams(dreams);

        renderViewMode();
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
  } else {
    document.body.innerHTML = "<h1>Sen nebyl nalezen</h1>";
  }
}
