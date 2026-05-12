function exportAppData() {
  const appData = {
    dreams: getDreams(),
    customCategories: getCustomCategories(),
    exportedAt: new Date().toISOString(),
  };

  const dataBlob = new Blob(
    [JSON.stringify(appData, null, 2)],
    { type: "application/json" }
  );

  const downloadUrl = URL.createObjectURL(dataBlob);

  const downloadLink = document.createElement("a");

  downloadLink.href = downloadUrl;
  downloadLink.download = "my-101-dreams-backup.json";

  downloadLink.click();

  URL.revokeObjectURL(downloadUrl);
}

function importAppData(file) {
  const reader = new FileReader();

  reader.addEventListener("load", function () {
    try {
      const importedData = JSON.parse(reader.result);

      if (
        !Array.isArray(importedData.dreams) ||
        !Array.isArray(importedData.customCategories)
      ) {
        alert("Soubor nemá správný formát.");

        return;
      }

      const confirmImport = confirm(
        "Import přepíše současná data. Chceš pokračovat?"
      );

      if (!confirmImport) {
        return;
      }

      localStorage.setItem(
        "dreams",
        JSON.stringify(importedData.dreams)
      );

      localStorage.setItem(
        "customCategories",
        JSON.stringify(importedData.customCategories)
      );

      window.location.reload();
    } catch {
      alert("Soubor se nepodařilo načíst.");
    }
  });

  reader.readAsText(file);
}

function setupBackupButtons() {
  const exportButton = document.getElementById("exportDataButton");
  const importInput = document.getElementById("importDataInput");

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
    });
  }
}

setupBackupButtons();