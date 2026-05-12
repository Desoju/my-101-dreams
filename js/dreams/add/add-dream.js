let isFormDirty = false;

function setupDreamCategorySelect() {
  const dreamCategory = document.getElementById("dreamCategory");

  if (dreamCategory) {
    fillCategorySelect(dreamCategory);
  }
}

function updateSubgoalDateLimits() {
  const dreamDate = document.getElementById("dreamDate").value;
  const subgoalDateInputs = document.querySelectorAll(".subgoal-date");

  subgoalDateInputs.forEach(function (input) {
    input.max = dreamDate || "";

    if (dreamDate && input.value && input.value > dreamDate) {
      input.value = "";
    }
  });
}

function createSubgoalForm() {
  const subgoalForm = document.createElement("div");

  subgoalForm.classList.add("subgoal-form");

  subgoalForm.innerHTML = `
    <div class="form-field">
      <label>Co mě přiblíží ke splnění snu</label>

      <input
        type="text"
        class="subgoal-name"
        placeholder="Např. Najít kurz surfování"
      >
    </div>

    <div class="form-field">
      <label>Do kdy to chci zvládnout</label>

      <input
        type="datetime-local"
        class="subgoal-date"
      >
    </div>

    <button type="button" class="remove-subgoal-button button-danger">
      Smazat krok
    </button>
  `;

  subgoalForm
    .querySelector(".remove-subgoal-button")
    .addEventListener("click", function () {
      subgoalForm.remove();
    });

  return subgoalForm;
}

function setupAddSubgoalButton() {
  const addSubgoalButton = document.getElementById("addSubgoalButton");

  const subgoalsContainer = document.getElementById("subgoalsContainer");

  if (!addSubgoalButton || !subgoalsContainer) {
    return;
  }

  addSubgoalButton.addEventListener("click", function () {
    const subgoalForm = createSubgoalForm();

    subgoalsContainer.appendChild(subgoalForm);
    updateSubgoalDateLimits();
  });
}

function collectSubgoals() {
  return Array.from(document.querySelectorAll(".subgoal-form")).map(
    function (subgoalForm) {
      return {
        name: subgoalForm.querySelector(".subgoal-name").value,
        date: subgoalForm.querySelector(".subgoal-date").value,
        completed: false,
      };
    },
  );
}

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
      category: document.getElementById("dreamCategory").value,
      priority: finalPriority,
      completionDate: dreamDate,
      status: document.getElementById("dreamStatus").value,
      subgoals: subgoals,
    };

    dreams.push(newDream);

    saveDreams(dreams);

    isFormDirty = false;

    window.location.href = "../index.html";
  });
}

function setupDatePickerOpenOnClick() {
  document.addEventListener("click", function (event) {
    if (event.target.type === "datetime-local" && event.target.showPicker) {
      event.target.showPicker();
    }
  });
}

window.addEventListener("beforeunload", function (event) {
  if (!isFormDirty) {
    return;
  }

  event.preventDefault();
  event.returnValue = "";
});

const backLink = document.querySelector(".back-link");

if (backLink) {
  backLink.addEventListener("click", function (event) {
    if (!isFormDirty) {
      return;
    }

    const shouldLeave = confirm("Máš neuložené změny. Opravdu chceš odejít?");

    if (!shouldLeave) {
      event.preventDefault();
    }
  });
}

function checkIfDreamFormIsDirty() {
  const hasDreamName = document.getElementById("dreamName").value.trim() !== "";

  const hasDescription =
    document.getElementById("dreamDescription").value.trim() !== "";

  const hasDate = document.getElementById("dreamDate").value !== "";

  const hasSubgoal = Array.from(
    document.querySelectorAll(".subgoal-name"),
  ).some(function (input) {
    return input.value.trim() !== "";
  });

  isFormDirty = hasDreamName || hasDescription || hasDate || hasSubgoal;
}

setupDreamCategorySelect();
setupAddSubgoalButton();
setupDreamForm();
setupDatePickerOpenOnClick();
