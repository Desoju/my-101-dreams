const dreamStatusLabels = {
  dream_active: "Aktivní",
  dream_completed: "Splněný",
  dream_to_be_completed: "Do budoucna",
  dream_not_attractive_anymore: "Už mě neláká"
};

function getDreamStatusLabel(status) {
  return dreamStatusLabels[status] || "Aktivní";
}