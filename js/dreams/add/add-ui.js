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

function setupDateTimePickerOpenOnClick() {
  document.addEventListener("click", function (event) {
    const input = event.target;

    if (
      input.tagName !== "INPUT" ||
      (input.type !== "date" && input.type !== "time")
    ) {
      return;
    }

    if (typeof input.showPicker === "function") {
      input.showPicker();
    }
  });
}