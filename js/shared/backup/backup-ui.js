function setupBackupButtons() {
  const exportButton = document.getElementById("exportDataButton");
  const importInput = document.getElementById("importDataInput");
  const importButton = document.getElementById("importDataButton");
  const restoreButton = document.getElementById("restoreBackupButton");

  if (restoreButton) {
    restoreButton.addEventListener("click", restoreRecoveryBackup);

    if (hasRecoveryBackup()) {
      restoreButton.classList.remove("hidden");
    }
  }

  if (exportButton) {
    exportButton.addEventListener("click", exportAppData);
  }

  if (importButton && importInput) {
    importButton.addEventListener("click", function () {
      importInput.click();
    });
  }

  if (importInput) {
    importInput.addEventListener("change", function () {
      const file = importInput.files[0];

      if (!file) {
        return;
      }

      importAppData(file);

      importInput.value = "";
    });
  }
}

function showPostImportToast() {
  const postImportToast = sessionStorage.getItem(
    STORAGE_KEYS.POST_IMPORT_TOAST,
  );

  if (!postImportToast) {
    return;
  }

  setTimeout(function () {
    if (typeof showToast === "function") {
      showToast(postImportToast, "success");

      sessionStorage.removeItem(
        STORAGE_KEYS.POST_IMPORT_TOAST,
      );
    }
  }, TIMING.POST_IMPORT_TOAST_DELAY);
}