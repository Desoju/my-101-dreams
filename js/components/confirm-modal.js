function normalizeConfirmOptions(options) {
  if (typeof options === "string") {
    return {
      title: "",
      message: options,
      confirmText: "Potvrdit",
      cancelText: "Zrušit",
      variant: "primary",
    };
  }

  return {
    title: options.title || "",
    message: options.message || "",
    confirmText: options.confirmText || "Potvrdit",
    cancelText: Object.prototype.hasOwnProperty.call(options, "cancelText")
      ? options.cancelText
      : "Zrušit",
    variant: options.variant || "primary",
  };
}

function showConfirm(options) {
  const config = normalizeConfirmOptions(options);

  return new Promise(function (resolve) {
    let modal = document.getElementById("confirmModal");

    if (!modal) {
      modal = document.createElement("div");
      modal.id = "confirmModal";
      modal.className = "confirm-modal-overlay";

      modal.setAttribute("role", "dialog");
      modal.setAttribute("aria-modal", "true");
      modal.setAttribute("aria-labelledby", "confirmModalTitle");
      modal.setAttribute("aria-describedby", "confirmModalMessage");

      modal.innerHTML = `
        <div class="confirm-modal">
          <h2 id="confirmModalTitle"></h2>
          <p id="confirmModalMessage"></p>

          <div class="confirm-modal-actions">
            <button
              type="button"
              id="confirmModalCancelButton"
              class="button-secondary"
            >
              Zrušit
            </button>

            <button
              type="button"
              id="confirmModalConfirmButton"
              class="button-primary"
            >
              Potvrdit
            </button>
          </div>
        </div>
      `;

      document.body.appendChild(modal);
    }

    const titleElement = document.getElementById("confirmModalTitle");
    const messageElement = document.getElementById("confirmModalMessage");
    const confirmButton = document.getElementById("confirmModalConfirmButton");
    const cancelButton = document.getElementById("confirmModalCancelButton");
    const previouslyFocusedElement = document.activeElement;

    titleElement.textContent = config.title;
    titleElement.style.display = config.title ? "block" : "none";

    messageElement.textContent = config.message;

    confirmButton.textContent = config.confirmText;

    if (config.cancelText) {
      cancelButton.hidden = false;
      cancelButton.style.display = "inline-flex";
      cancelButton.textContent = config.cancelText;
    } else {
      cancelButton.hidden = true;
    }

    confirmButton.className =
      config.variant === "danger" ? "button-danger" : "button-primary";

    modal.classList.add("confirm-modal-visible");
    document.body.classList.add("modal-open");

    if (config.variant === "danger") {
      cancelButton.focus();
    } else {
      confirmButton.focus();
    }

    function cleanup(result) {
      modal.classList.remove("confirm-modal-visible");

      confirmButton.removeEventListener("click", handleConfirm);
      cancelButton.removeEventListener("click", handleCancel);
      modal.removeEventListener("click", handleOverlayClick);
      document.removeEventListener("keydown", handleKeydown);

      document.body.classList.remove("modal-open");

      confirmButton.disabled = false;
      cancelButton.disabled = false;

      if (previouslyFocusedElement && previouslyFocusedElement.focus) {
        previouslyFocusedElement.focus();
      }

      resolve(result);
    }

    function handleConfirm() {
      confirmButton.disabled = true;
      cleanup(true);
    }

    function handleCancel() {
      cancelButton.disabled = true;
      cleanup(false);
    }

    function handleOverlayClick(event) {
      if (event.target === modal) {
        cleanup(false);
      }
    }

    function handleKeydown(event) {
      if (event.key === "Escape") {
        cleanup(false);
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = Array.from(
        modal.querySelectorAll("button:not([hidden])"),
      );

      if (focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    confirmButton.addEventListener("click", handleConfirm);
    cancelButton.addEventListener("click", handleCancel);
    modal.addEventListener("click", handleOverlayClick);
    document.addEventListener("keydown", handleKeydown);
  });
}