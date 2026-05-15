function setupBackLinkGuard(autosave) {
  const backLink = document.querySelector(".back-link");

  if (!backLink) {
    return;
  }

  backLink.addEventListener("click", async function (event) {
    if (!autosave.isDirty()) {
      return;
    }

    event.preventDefault();

    const shouldStay = await showConfirm({
      title: "Pokračovat v úpravách?",
      message:
        "Máš rozepsané změny. Pokud odejdeš, můžeš přijít o poslední neupravené změny.",
      confirmText: "Pokračovat v úpravách",
      cancelText: "Odejít",
      variant: "primary",
    });

    if (shouldStay) {
      return;
    }

    autosave.markClean();
    window.location.href = backLink.href;
  });
}

async function confirmCancelEdit(autosave) {
  autosave.cancelPendingAutosave();

  if (!autosave.isDirty()) {
    return true;
  }

  const shouldStay = await showConfirm({
    title: "Pokračovat v úpravách?",
    message:
      "Máš rozepsané změny. Pokud odejdeš, můžeš přijít o poslední neupravené změny.",
    confirmText: "Pokračovat v úpravách",
    cancelText: "Zahodit změny",
    variant: "primary",
  });

  if (shouldStay) {
    return false;
  }

  autosave.markClean();
  return true;
}