let isFormDirty = false;

function checkIfDreamFormIsDirty() {
  const hasDreamName = document.getElementById("dreamName").value.trim() !== "";

  const hasDescription =
    document.getElementById("dreamDescription").value.trim() !== "";

  const hasPinterestBoard =
    document.getElementById("dreamPinterestBoard").value.trim() !== "";

  const hasDate = document.getElementById("dreamDate")?.value !== "";

  const hasSubgoal = Array.from(
    document.querySelectorAll(".subgoal-name"),
  ).some(function (input) {
    return input.value.trim() !== "";
  });

  isFormDirty =
    hasDreamName ||
    hasDescription ||
    hasPinterestBoard ||
    hasDate ||
    hasSubgoal;
}

function markDreamFormClean() {
  isFormDirty = false;
}

function setupAddDreamBeforeUnloadProtection() {
  window.addEventListener("beforeunload", function (event) {
    if (!isFormDirty) {
      return;
    }

    event.preventDefault();
    event.returnValue = "";
  });
}

function setupAddDreamBackLinkProtection() {
  const backLink = document.querySelector(".back-link");

  if (!backLink) {
    return;
  }

  backLink.addEventListener("click", async function (event) {
    if (!isFormDirty) {
      return;
    }

    event.preventDefault();

    const shouldStay = await showConfirm({
      title: "Pokračovat v psaní?",
      message:
        "Máš rozepsaný sen. Pokud odejdeš, můžeš přijít o poslední neupravené změny.",
      confirmText: "Pokračovat v psaní",
      cancelText: "Odejít",
      variant: "primary",
    });

    if (shouldStay) {
      return;
    }

    markDreamFormClean();
    window.location.href = backLink.href;
  });
}

function setupAddDreamNavigationProtection() {
  setupAddDreamBeforeUnloadProtection();
  setupAddDreamBackLinkProtection();
}
