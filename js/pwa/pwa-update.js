if ("serviceWorker" in navigator) {
  let newWorker;

  const updateBanner = document.getElementById("updateBanner");
  const updateAppButton = document.getElementById("updateAppButton");

  navigator.serviceWorker
    .register("./service-worker.js")
    .then(function (registration) {
      registration.addEventListener("updatefound", function () {
        newWorker = registration.installing;

        newWorker.addEventListener("statechange", function () {
          if (
            newWorker.state === "installed" &&
            navigator.serviceWorker.controller
          ) {
            updateBanner.classList.remove("hidden");
          }
        });
      });
    });

  updateAppButton.addEventListener("click", function () {
    if (!newWorker) {
      return;
    }

    newWorker.postMessage({
      type: "SKIP_WAITING",
    });
  });

  navigator.serviceWorker.addEventListener(
    "controllerchange",
    function () {
      window.location.reload();
    },
  );
}