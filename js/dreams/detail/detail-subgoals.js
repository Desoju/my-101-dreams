function renderSubgoals(dream, dreams, renderViewMode) {
  const subgoalsList = document.getElementById("subgoalsList");

  subgoalsList.innerHTML = "";

  const visibleSubgoals = dream.subgoals
    .map(function (subgoal, index) {
      return {
        ...subgoal,
        originalIndex: index,
      };
    })
    .filter(function (subgoal) {
      return subgoal.name || subgoal.date;
    });

    if (visibleSubgoals.length === 0) {
      subgoalsList.innerHTML = `
        <div class="empty-subgoals">
          <p>Zatím nemáš žádné kroky ke splnění.</p>

          <button
            type="button"
            id="createFirstSubgoalButton"
          >
            Přidat první krok
          </button>
        </div>
      `;

      document
        .getElementById("createFirstSubgoalButton")
        .addEventListener("click", function () {
          fillDreamEditMode(dream);

          document.getElementById("viewMode").style.display = "none";
          document.getElementById("editMode").style.display = "grid";
        });

      return;
    }


  visibleSubgoals.forEach(function (subgoal) {
    const subgoalItem = document.createElement("div");

    subgoalItem.classList.add("subgoal");

    subgoalItem.innerHTML = `
      <label>
        <input
          type="checkbox"
          class="subgoal-completed-checkbox"
          data-index="${subgoal.originalIndex}"
          ${subgoal.completed ? "checked" : ""}
        >

        <span>${subgoal.name || "Krok není nastavený"}</span>
      </label>

      <p>Termín: ${formatDate(subgoal.date)}</p>
      <p>Zbývá: ${getRemainingTime(subgoal.date)}</p>
    `;

    subgoalsList.appendChild(subgoalItem);
  });

  document
    .querySelectorAll(".subgoal-completed-checkbox")
    .forEach(function (checkbox) {
      checkbox.addEventListener("change", function () {
        const index = Number(checkbox.dataset.index);

        dream.subgoals[index].completed = checkbox.checked;

        saveDreams(dreams);

        renderViewMode();
      });
    });
}

function createSubgoalEditField(
  subgoal = {
    name: "",
    date: "",
    completed: false,
  },
) {
  const subgoalForm = document.createElement("div");

  subgoalForm.classList.add("subgoal-edit-form");

  subgoalForm.innerHTML = `
    <div class="form-field">
      <label>Co mě přiblíží ke splnění snu</label>

      <input
        type="text"
        class="edit-subgoal-name"
        value="${subgoal.name || ""}"
      >
    </div>

    <div class="form-field">
      <label>Do kdy to chci zvládnout</label>

      <input
        type="datetime-local"
        class="edit-subgoal-date"
        value="${subgoal.date || ""}"
      >
    </div>

    <label class="checkbox-row">
      <input
        type="checkbox"
        class="edit-subgoal-completed"
        ${subgoal.completed ? "checked" : ""}
      >

      Splněno
    </label>

    <button type="button" class="remove-subgoal-button">
      Odebrat krok
    </button>
  `;

  subgoalForm
    .querySelector(".remove-subgoal-button")
    .addEventListener("click", function () {
      subgoalForm.remove();
    });

  return subgoalForm;
}

function collectEditedSubgoals() {
  return Array.from(document.querySelectorAll(".subgoal-edit-form")).map(
    function (subgoalForm) {
      return {
        name: subgoalForm.querySelector(".edit-subgoal-name").value,
        date: subgoalForm.querySelector(".edit-subgoal-date").value,
        completed: subgoalForm.querySelector(".edit-subgoal-completed").checked,
      };
    },
  );
}
