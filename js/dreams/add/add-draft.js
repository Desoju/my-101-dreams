const ADD_DREAM_DRAFT_KEY = "my101dreams_add_dream_draft";

function getDreamDraftData() {
  return {
    name: document.getElementById("dreamName")?.value || "",
    description: document.getElementById("dreamDescription")?.value || "",
    pinterestBoardUrl:
      document.getElementById("dreamPinterestBoard")?.value || "",
    category: document.getElementById("dreamCategory")?.value || "",
    priority: document.getElementById("dreamPriority")?.value || "C",
    status: document.getElementById("dreamStatus")?.value || "dream_active",
    completionDate: document.getElementById("dreamDate")?.value || "",
    subgoals: collectSubgoals(),
    updatedAt: Date.now(),
  };
}

function hasUsefulDreamDraft(draft) {
  if (!draft) {
    return false;
  }

  return (
    draft.name.trim() ||
    draft.description.trim() ||
    draft.pinterestBoardUrl.trim() ||
    draft.completionDate ||
    draft.subgoals.some(function (subgoal) {
      return subgoal.name.trim() || subgoal.date;
    })
  );
}

function saveDreamDraft() {
  const draft = getDreamDraftData();

  if (!hasUsefulDreamDraft(draft)) {
    localStorage.removeItem(ADD_DREAM_DRAFT_KEY);
    return;
  }

  localStorage.setItem(ADD_DREAM_DRAFT_KEY, JSON.stringify(draft));
}

function clearDreamDraft() {
  localStorage.removeItem(ADD_DREAM_DRAFT_KEY);
}

function restoreDreamDraft(draft) {
  document.getElementById("dreamName").value = draft.name || "";
  document.getElementById("dreamDescription").value = draft.description || "";
  document.getElementById("dreamPinterestBoard").value =
    draft.pinterestBoardUrl || "";
  document.getElementById("dreamCategory").value = draft.category || "";
  document.getElementById("dreamPriority").value = draft.priority || "C";
  document.getElementById("dreamStatus").value =
    draft.status || "dream_active";
  document.getElementById("dreamDate").value = draft.completionDate || "";

  const subgoalsContainer = document.getElementById("subgoalsContainer");
  if (subgoalsContainer) {
    subgoalsContainer.innerHTML = "";

    draft.subgoals.forEach(function (subgoal) {
      const subgoalForm = createSubgoalForm();
      subgoalForm.querySelector(".subgoal-name").value = subgoal.name || "";
      subgoalForm.querySelector(".subgoal-date").value = subgoal.date || "";
      subgoalsContainer.appendChild(subgoalForm);
    });
  }

  updateSubgoalDateLimits();
  checkIfDreamFormIsDirty();
}

function setupDreamDraftAutosave() {
  const dreamForm = document.getElementById("dreamForm");

  if (!dreamForm) {
    return;
  }

  let saveTimeout;

  dreamForm.addEventListener("input", function () {
    clearTimeout(saveTimeout);

    saveTimeout = setTimeout(function () {
      saveDreamDraft();
    }, 300);
  });

  dreamForm.addEventListener("change", function () {
    saveDreamDraft();
  });
}

async function setupDreamDraftRestore() {
  const savedDraft = localStorage.getItem(ADD_DREAM_DRAFT_KEY);

  if (!savedDraft) {
    return;
  }

  const draft = JSON.parse(savedDraft);

  if (!hasUsefulDreamDraft(draft)) {
    clearDreamDraft();
    return;
  }

  const shouldRestore = await showConfirm(
    "Našli jsme neuložený koncept.\nChceš ho obnovit?",
  );

  if (shouldRestore) {
    restoreDreamDraft(draft);
    showToast("Koncept byl obnoven.", "success");
    return;
  }

  clearDreamDraft();
}