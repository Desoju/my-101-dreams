function scrollToElement(element, options = {}) {
  if (!element) return;

  const {
    block = "center",
    behavior = "smooth",
  } = options;

  element.scrollIntoView({
    behavior,
    block,
  });
}

function scrollToFirstInvalidField(form) {
  if (!form) return;

  const invalidField = form.querySelector(":invalid");

  if (!invalidField) return;

  scrollToElement(invalidField, {
    block: "center",
  });

  invalidField.focus({ preventScroll: true });
}