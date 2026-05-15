const ONBOARDING_SEEN_KEY = "my101dreams_onboarding_seen";

function shouldShowOnboarding() {
  return localStorage.getItem(ONBOARDING_SEEN_KEY) !== "true";
}

async function showOnboarding() {
  if (!shouldShowOnboarding()) {
    return;
  }

  const started = await showConfirm({
    title: "Vítej v My 101 Dreams",
    message:
      "Zapisuj si sny, cíle a zážitky, které chceš v životě splnit. Rozděl si je na menší kroky, sleduj progress a buduj si vlastní dream list.",
    confirmText: "Začít",
    cancelText: "",
    variant: "primary",
  });

  localStorage.setItem(ONBOARDING_SEEN_KEY, "true");

  if (started) {
    document.getElementById("installAppButton")?.focus();
  }
}

showOnboarding();