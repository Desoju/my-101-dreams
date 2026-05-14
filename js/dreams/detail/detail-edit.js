function updateEditSubgoalDateLimits() {
  const dreamDateInput = document.getElementById("dreamCompletionDateInput");

  if (!dreamDateInput) {
    return;
  }

  const dreamDate = dreamDateInput.value;
  const subgoalDateInputs = document.querySelectorAll(".edit-subgoal-date");

  subgoalDateInputs.forEach(function (input) {
    input.max = dreamDate || "";

    if (dreamDate && input.value && input.value > dreamDate) {
      input.value = "";
    }
  });
}

function fillDreamEditMode(dream) {
  document.getElementById("dreamTitleInput").value = dream.name || "";

  document.getElementById("dreamDescriptionInput").value =
    dream.description || "";

  document.getElementById("dreamPinterestBoardInput").value =
    dream.pinterestBoardUrl || "";

  document.getElementById("dreamPriorityInput").value = dream.priority || "C";

  document.getElementById("dreamCompletionDateInput").value =
    dream.completionDate || "";

  document.getElementById("dreamStatusInput").value =
    dream.status || "dream_active";

  fillCategorySelect(
    document.getElementById("dreamCategoryInput"),
    dream.category || "other",
  );

  const editSubgoalsContainer = document.getElementById(
    "editSubgoalsContainer",
  );

  editSubgoalsContainer.innerHTML = "";

  dream.subgoals.forEach(function (subgoal) {
    editSubgoalsContainer.appendChild(createSubgoalEditField(subgoal));
  });

  updateEditSubgoalDateLimits();
}

const dreamCompletionDateInput = document.getElementById(
  "dreamCompletionDateInput",
);

if (dreamCompletionDateInput) {
  dreamCompletionDateInput.addEventListener(
    "change",
    updateEditSubgoalDateLimits,
  );
}

function saveDreamEditChanges(dream) {
  const selectedPriority = document.getElementById("dreamPriorityInput").value;
  const dreams = getDreams();

  const dreamTitleInput = document.getElementById("dreamTitleInput");

  clearFieldError(dreamTitleInput);
  dreamTitleInput.classList.remove("field-invalid");

  if (!dreamTitleInput.value.trim()) {
    dreamTitleInput.classList.add("field-invalid");
    showFieldError(dreamTitleInput, "Název snu je povinný.");

    scrollToElement(dreamTitleInput, {
      block: "center",
    });

    dreamTitleInput.focus();

    return false;
  }

  const newDreamName = dreamTitleInput.value.trim();

  if (selectedPriority === "A" && !canSetPriorityA(dreams, dream.id)) {
    showToast("Priorita A je omezená na 10 snů.", "error");
    return false;
  }

  if (dreamExistsByName(dreams, newDreamName, dream.id)) {
    dreamTitleInput.classList.add("field-invalid");
    showFieldError(dreamTitleInput, "Sen s tímto názvem už existuje.");

    scrollToElement(dreamTitleInput, {
      block: "center",
    });

    dreamTitleInput.focus();

    return false;
  }

  const dreamCompletionDate = document.getElementById(
    "dreamCompletionDateInput",
  ).value;

  const editedSubgoals = collectEditedSubgoals();

  if (dreamCompletionDate) {
    const hasSubgoalAfterDreamDeadline = editedSubgoals.some(
      function (subgoal) {
        return subgoal.date && subgoal.date > dreamCompletionDate;
      },
    );

    if (hasSubgoalAfterDreamDeadline) {
      showToast(
        "Deadline kroku nemůže být později než hlavní deadline snu.",
        "error",
      );
      return false;
    }
  }

  dream.name = newDreamName;
  dream.description = document.getElementById("dreamDescriptionInput").value;
  dream.pinterestBoardUrl = document.getElementById(
    "dreamPinterestBoardInput",
  ).value;
  dream.completionDate = dreamCompletionDate;
  dream.status = document.getElementById("dreamStatusInput").value;

  if (
    dream.status === "dream_completed" ||
    dream.status === "dream_not_attractive_anymore"
  ) {
    dream.priority = null;
  } else {
    dream.priority = selectedPriority;
  }

  if (dream.status === "dream_completed") {
    dream.pinned = false;

    editedSubgoals.forEach(function (subgoal) {
      subgoal.completed = true;
    });
  }

  dream.category = document.getElementById("dreamCategoryInput").value;
  dream.subgoals = editedSubgoals;

  return true;
}
