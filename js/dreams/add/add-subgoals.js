function updateSubgoalDateLimits() {
  const dreamDate = document.getElementById("dreamDate")?.value || "";
  const subgoalDateInputs = document.querySelectorAll(".subgoal-date");

  subgoalDateInputs.forEach(function (input) {
    input.max = dreamDate;

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

      <div class="date-time-row">
        <input
          type="date"
          class="subgoal-date"
        >

        <input
          type="time"
          class="subgoal-time"
        >
      </div>
    </div>

    <button type="button" class="remove-subgoal-button button-danger">
      Smazat krok
    </button>
  `;

  subgoalForm
    .querySelector(".remove-subgoal-button")
    .addEventListener("click", function () {
      subgoalForm.remove();
      checkIfDreamFormIsDirty();
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
    checkIfDreamFormIsDirty();

    scrollToElement(subgoalForm, {
      block: "center",
    });
  });
}

function collectSubgoals() {
  return Array.from(document.querySelectorAll(".subgoal-form")).map(
    function (subgoalForm) {
      const date = subgoalForm.querySelector(".subgoal-date").value;
      const time = subgoalForm.querySelector(".subgoal-time").value;

      return {
        name: subgoalForm.querySelector(".subgoal-name").value,
        date: date ? `${date}T${time || "00:00"}` : "",
        completed: false,
      };
    },
  );
}