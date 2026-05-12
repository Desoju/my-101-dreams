function showConfirm(message) {
  return new Promise(function (resolve) {
    let modal = document.getElementById("confirmModal");

    if (!modal) {
      modal = document.createElement("div");

      modal.id = "confirmModal";
      modal.className = "confirm-modal-overlay";

      modal.innerHTML = `
        <div class="confirm-modal">
          <p id="confirmModalMessage"></p>

          <div class="confirm-modal-actions">
            <button
              type="button"
              id="confirmModalCancelButton"
              class="button-soft"
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

    const messageElement = document.getElementById(
      "confirmModalMessage",
    );

    const confirmButton = document.getElementById(
      "confirmModalConfirmButton",
    );

    const cancelButton = document.getElementById(
      "confirmModalCancelButton",
    );

    messageElement.textContent = message;

    modal.classList.add("confirm-modal-visible");

    function cleanup(result) {
      modal.classList.remove("confirm-modal-visible");

      confirmButton.removeEventListener("click", handleConfirm);
      cancelButton.removeEventListener("click", handleCancel);

      resolve(result);
    }

    function handleConfirm() {
      cleanup(true);
    }

    function handleCancel() {
      cleanup(false);
    }

    confirmButton.addEventListener("click", handleConfirm);

    cancelButton.addEventListener("click", handleCancel);
  });
}
