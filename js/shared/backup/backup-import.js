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
        "Import přidá nové sny a aktualizuje existující podle ID. Současná data zůstanou zachována. Před importem vytvořím záchrannou zálohu. Chceš pokračovat?",
      );

      if (!confirmImport) {
        return;
      }

      saveRecoveryBackup();

      const currentDreams = getDreams();
      const currentCategories = getCustomCategories();

      const mergedDreams = mergeDreams(
        currentDreams,
        importedData.dreams,
      );

      const mergedCategories = mergeCustomCategories(
        currentCategories,
        importedData.customCategories,
      );

      saveDreams(mergedDreams.items);
      saveCustomCategories(mergedCategories.items);

      sessionStorage.setItem(
        STORAGE_KEYS.POST_IMPORT_TOAST,
        `Import hotový: ${mergedDreams.added} nových, ${mergedDreams.updated} aktualizovaných.`,
      );

      window.location.reload();
    } catch {
      showToast("Soubor se nepodařilo načíst.", "error");
    }
  });

  reader.readAsText(file);
}