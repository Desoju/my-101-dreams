function saveRecoveryBackup() {
  const currentData = createAppDataExport();

  localStorage.setItem(
    STORAGE_KEYS.RECOVERY_BACKUP,
    JSON.stringify(currentData),
  );
}

function hasRecoveryBackup() {
  return Boolean(
    localStorage.getItem(STORAGE_KEYS.RECOVERY_BACKUP),
  );
}

async function restoreRecoveryBackup() {
  const recoveryBackup = localStorage.getItem(
    STORAGE_KEYS.RECOVERY_BACKUP,
  );

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

    localStorage.setItem(
      STORAGE_KEYS.DREAMS,
      JSON.stringify(parsedBackup.dreams),
    );

    localStorage.setItem(
      STORAGE_KEYS.CUSTOM_CATEGORIES,
      JSON.stringify(parsedBackup.customCategories),
    );

    showToast("Záchranná záloha byla obnovena.", "success");

    window.location.reload();
  } catch {
    showToast("Záchrannou zálohu se nepodařilo obnovit.", "error");
  }
}