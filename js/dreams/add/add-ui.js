function setupDreamCategorySelect() {
  const dreamCategory = document.getElementById("dreamCategory");

  if (dreamCategory) {
    fillCategorySelect(dreamCategory);
  }
}

function setupDatePickerOpenOnClick() {
  document.addEventListener("click", function (event) {
    if (event.target.type === "datetime-local" && event.target.showPicker) {
      event.target.showPicker();
    }
  });
}