window.showFieldError = function (input, message) {
  if (!input) {
    return;
  }

  window.clearFieldError(input);

  const error = document.createElement("p");

  error.className = "field-error";
  error.textContent = message;

  input.insertAdjacentElement("afterend", error);
};

window.clearFieldError = function (input) {
  if (!input) {
    return;
  }

  const nextElement = input.nextElementSibling;

  if (nextElement && nextElement.classList.contains("field-error")) {
    nextElement.remove();
  }
};