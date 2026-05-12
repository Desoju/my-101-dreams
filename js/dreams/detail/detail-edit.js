function fillDreamEditMode(dream) {
  document.getElementById("dreamTitleInput").value = dream.name || "";

  document.getElementById("dreamDescriptionInput").value =
    dream.description || "";

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
}

function saveDreamEditChanges(dream) {
  const selectedPriority = document.getElementById("dreamPriorityInput").value;

  const dreams = getDreams();

  if (selectedPriority === "A" && !canSetPriorityA(dreams, dream.id)) {
    alert("Priorita A je omezená na 10 snů.");

    return false;
  }

  const newDreamName = document.getElementById("dreamTitleInput").value.trim();

  if (dreamExistsByName(dreams, newDreamName, dream.id)) {
    alert("Sen s tímto názvem už existuje.");

    return false;
  }

  dream.name = newDreamName;

  dream.description = document.getElementById("dreamDescriptionInput").value;

  dream.completionDate = document.getElementById(
    "dreamCompletionDateInput",
  ).value;

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

    dream.subgoals.forEach(function (subgoal) {
      subgoal.completed = true;
    });
  }

  dream.category = document.getElementById("dreamCategoryInput").value;

  dream.subgoals = collectEditedSubgoals();

  return true;
}
