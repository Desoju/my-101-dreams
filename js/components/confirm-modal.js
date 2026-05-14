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
    cancelText: options.cancelText || "Zrušit",
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

      modal.innerHTML = `
        <div class="confirm-modal">
          <h2 id="confirmModalTitle" class="confirm-modal-title"></h2>
          <p id="confirmModalMessage"></p>

          <div class="confirm-modal-actions">
            <button type="button" id="confirmModalCancelButton" class="button-soft">
              Zrušit
            </button>

            <button type="button" id="confirmModalConfirmButton" class="button-primary">
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

    titleElement.textContent = config.title;
    titleElement.style.display = config.title ? "block" : "none";

    messageElement.textContent = config.message;

    confirmButton.textContent = config.confirmText;
    cancelButton.textContent = config.cancelText;

    confirmButton.className =
      config.variant === "danger" ? "button-danger" : "button-primary";

    modal.classList.add("confirm-modal-visible");
    if (config.variant === "danger") {
      cancelButton.focus();
    } else {
      confirmButton.focus();
    }

    document.body.classList.add("modal-open");

    function handleEscape(event) {
      if (event.key === "Escape") {
        cleanup(false);
      }
    }

    function handleTabKey(event) {
      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = modal.querySelectorAll("button");
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

    function handleOverlayClick(event) {
      if (event.target === modal) {
        cleanup(false);
      }
    }

    document.addEventListener("keydown", handleEscape);

    document.addEventListener("keydown", handleTabKey);

    modal.addEventListener("click", handleOverlayClick);

    function cleanup(result) {
      modal.classList.remove("confirm-modal-visible");

      confirmButton.removeEventListener("click", handleConfirm);
      cancelButton.removeEventListener("click", handleCancel);

      document.removeEventListener("keydown", handleEscape);

      document.removeEventListener("keydown", handleTabKey);

      document.body.classList.remove("modal-open");

      modal.removeEventListener("click", handleOverlayClick);

      confirmButton.disabled = false;
      cancelButton.disabled = false;

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

    confirmButton.addEventListener("click", handleConfirm);
    cancelButton.addEventListener("click", handleCancel);
  });
}
