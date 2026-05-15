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

  if (typeof showToast === "function") {
    showToast("Export byl stažen.", "success");
  }
}