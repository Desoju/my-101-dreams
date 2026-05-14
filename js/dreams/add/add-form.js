function setupDreamForm() {
  const dreamForm = document.getElementById("dreamForm");

  if (!dreamForm) {
    return;
  }

  dreamForm.addEventListener("input", function () {
    checkIfDreamFormIsDirty();
  });

  dreamForm.addEventListener("change", function () {
    checkIfDreamFormIsDirty();
    updateSubgoalDateLimits();
  });

  dreamForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const dreams = getDreams();

    const selectedPriority = document.getElementById("dreamPriority").value;
    const selectedStatus = document.getElementById("dreamStatus").value;

    const finalPriority =
      selectedStatus === "dream_completed" ||
      selectedStatus === "dream_not_attractive_anymore"
        ? null
        : selectedPriority;

    if (finalPriority === "A" && !canSetPriorityA(dreams)) {
      showToast("Priorita A je omezená na 10 snů.", "error");
      return;
    }

    const dreamName = document.getElementById("dreamName").value.trim();

    if (dreamExistsByName(dreams, dreamName)) {
      showToast("Sen s tímto názvem už existuje.", "error");
      return;
    }

    const dreamDate = document.getElementById("dreamDate").value;
    const subgoals = collectSubgoals();

    if (dreamDate) {
      const hasSubgoalAfterDreamDeadline = subgoals.some(function (subgoal) {
        return subgoal.date && subgoal.date > dreamDate;
      });

      if (hasSubgoalAfterDreamDeadline) {
        showToast(
          "Deadline kroku nemůže být později než hlavní deadline snu.",
          "error",
        );
        return;
      }
    }

    const newDream = {
      id: Date.now(),
      name: dreamName,
      description: document.getElementById("dreamDescription").value,
      pinterestBoardUrl: document.getElementById("dreamPinterestBoard").value,
      category: document.getElementById("dreamCategory").value,
      priority: finalPriority,
      completionDate: dreamDate,
      status: document.getElementById("dreamStatus").value,
      subgoals: subgoals,
    };

    dreams.push(newDream);

    const submitButton = dreamForm.querySelector("button[type='submit']");

    submitButton.disabled = true;
    submitButton.textContent = "Ukládám...";

    saveDreams(dreams);

    showToast("Sen byl uložen.", "success");

    markDreamFormClean();

    setTimeout(function () {
      window.location.href = "../index.html";
    }, 600);
  });
}