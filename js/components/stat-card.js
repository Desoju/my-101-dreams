function updateStatCard(elementId, value) {
  const statElement = document.getElementById(elementId);

  if (statElement) {
    statElement.textContent = value;
  }
}
