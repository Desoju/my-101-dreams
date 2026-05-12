function createEmptyState(message) {
  const emptyState = document.createElement("p");
  emptyState.classList.add("empty-state");
  emptyState.textContent = message;
  return emptyState;
}
