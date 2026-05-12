let activeToastTimeout = null;

function showToast(message, type = "info") {
  let toast = document.getElementById("appToast");

  if (!toast) {
    toast = document.createElement("div");

    toast.id = "appToast";
    toast.className = "toast";

    document.body.appendChild(toast);
  }

  toast.textContent = message;

  toast.className = `toast toast-${type} toast-visible`;

  clearTimeout(activeToastTimeout);

  activeToastTimeout = setTimeout(function () {
    toast.classList.remove("toast-visible");
  }, 3000);
}