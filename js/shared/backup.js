const BACKUP_FORMAT_VERSION = 1;
const RECOVERY_BACKUP_KEY = "my101dreams_recovery_backup";
const BACKUP_REMINDER_KEY = "my101dreams_last_backup_reminder";
const BACKUP_REMINDER_INTERVAL_DAYS = 14;

function createAppDataExport() {
  return {
    version: BACKUP_FORMAT_VERSION,
    exportedAt: new Date().toISOString(),
    dreams: getDreams(),
    customCategories: getCustomCategories(),
  };
}

function exportAppData() {
  const appData = createAppDataExport();

  const dataBlob = new Blob([JSON.stringify(appData, null, 2)], {
    type: "application/json",
  });

  const downloadUrl = URL.createObjectURL(dataBlob);
  const downloadLink = document.createElement("a");

  downloadLink.href = downloadUrl;
  downloadLink.download = `my-101-dreams-backup-${new Date()
    .toISOString()
    .slice(0, 10)}.json`;

  downloadLink.click();

  URL.revokeObjectURL(downloadUrl);
}

function isValidImportedData(importedData) {
  return (
    importedData &&
    Array.isArray(importedData.dreams) &&
    Array.isArray(importedData.customCategories)
  );
}

function saveRecoveryBackup() {
  const currentData = createAppDataExport();

  localStorage.setItem(RECOVERY_BACKUP_KEY, JSON.stringify(currentData));
}

async function importAppData(file) {
  const reader = new FileReader();

  reader.addEventListener("load", async function () {
    try {
      const importedData = JSON.parse(reader.result);

      if (!isValidImportedData(importedData)) {
        showToast("Soubor nemá správný formát.", "error");
        return;
      }

      const confirmImport = await showConfirm(
        "Import přepíše současná data. Před importem vytvořím záchrannou zálohu. Chceš pokračovat?",
      );

      if (!confirmImport) {
        return;
      }

      saveRecoveryBackup();

      localStorage.setItem("dreams", JSON.stringify(importedData.dreams));
      localStorage.setItem(
        "customCategories",
        JSON.stringify(importedData.customCategories),
      );

      showToast("Import hotový. Záchranná záloha byla uložena.", "success");

      window.location.reload();
    } catch {
      showToast("Soubor se nepodařilo načíst.", "error");
    }
  });

  reader.readAsText(file);
}

function hasRecoveryBackup() {
  return Boolean(localStorage.getItem(RECOVERY_BACKUP_KEY));
}

async function restoreRecoveryBackup() {
  const recoveryBackup = localStorage.getItem(RECOVERY_BACKUP_KEY);

  if (!recoveryBackup) {
    showToast("Žádná záchranná záloha není k dispozici.", "info");
    return;
  }

  const confirmRestore = await showConfirm(
    "Obnovíš data ze záchranné zálohy vytvořené před posledním importem. Pokračovat?",
  );

  if (!confirmRestore) {
    return;
  }

  try {
    const parsedBackup = JSON.parse(recoveryBackup);

    if (!isValidImportedData(parsedBackup)) {
      showToast("Záchranná záloha je poškozená.", "error");
      return;
    }

    localStorage.setItem("dreams", JSON.stringify(parsedBackup.dreams));
    localStorage.setItem(
      "customCategories",
      JSON.stringify(parsedBackup.customCategories),
    );

    showToast("Záchranná záloha byla obnovena.", "success");

    window.location.reload();
  } catch {
    showToast("Záchrannou zálohu se nepodařilo obnovit.", "error");
  }
}

function shouldShowBackupReminder() {
  const dreams = getDreams();

  if (dreams.length === 0) {
    return false;
  }

  const lastReminder = localStorage.getItem(BACKUP_REMINDER_KEY);

  if (!lastReminder) {
    return true;
  }

  const lastReminderDate = new Date(lastReminder);
  const currentDate = new Date();

  const differenceInDays =
    (currentDate - lastReminderDate) / (1000 * 60 * 60 * 24);

  return differenceInDays >= BACKUP_REMINDER_INTERVAL_DAYS;
}

function showBackupReminder() {
  if (!shouldShowBackupReminder()) {
    return;
  }

  setTimeout(function () {
    showToast("Doporučujeme pravidelně exportovat zálohu dat.", "info");

    localStorage.setItem(BACKUP_REMINDER_KEY, new Date().toISOString());
  }, 2000);
}

function setupBackupButtons() {
  const exportButton = document.getElementById("exportDataButton");
  const importInput = document.getElementById("importDataInput");
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

setupBackupButtons();
showBackupReminder();
