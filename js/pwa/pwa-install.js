let deferredInstallPrompt = null;

const installButton = document.getElementById("installAppButton");

window.addEventListener("beforeinstallprompt", function (event) {
  event.preventDefault();

  deferredInstallPrompt = event;

  if (installButton) {
    installButton.classList.remove("hidden");
  }
});

if (installButton) {
  installButton.addEventListener("click", async function () {
    if (!deferredInstallPrompt) {
      return;
    }

    deferredInstallPrompt.prompt();

    const choice = await deferredInstallPrompt.userChoice;

    if (choice.outcome === "accepted") {
      installButton.classList.add("hidden");
    }

    deferredInstallPrompt = null;
  });
}

window.addEventListener("appinstalled", function () {
  if (installButton) {
    installButton.classList.add("hidden");
  }

  console.log("PWA installed");
});