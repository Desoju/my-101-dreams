function getDreams() {
  try {
    return JSON.parse(localStorage.getItem("dreams")) || [];
  } catch {
    return [];
  }
}

function saveDreams(dreams) {
  localStorage.setItem("dreams", JSON.stringify(dreams));
}
