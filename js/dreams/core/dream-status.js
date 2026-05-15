const dreamStatusLabels = {
  [DREAM_STATUS.ACTIVE]: "Aktivní",
  [DREAM_STATUS.COMPLETED]: "Splněný",
  [DREAM_STATUS.FUTURE]: "Do budoucna",
  [DREAM_STATUS.INACTIVE]: "Už mě neláká",
};

function getDreamStatusLabel(status) {
  return (
    dreamStatusLabels[status] ||
    dreamStatusLabels[DREAM_STATUS.ACTIVE]
  );
}