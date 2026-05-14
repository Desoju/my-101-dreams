function completeDream(dream, dreams) {
  dream.status = "dream_completed";
  dream.pinned = false;

  dream.subgoals.forEach(function (subgoal) {
    subgoal.completed = true;
  });

  saveDreams(dreams);
}

function toggleDreamPin(dream, dreams) {
  dream.pinned = !dream.pinned;

  saveDreams(dreams);
}

async function deleteDream(dreams, dreamId) {
  const confirmDelete = await showConfirm({
    title: "Smazat sen?",
    message: "Opravdu chceš tento sen smazat?",
    confirmText: "Smazat",
    cancelText: "Zrušit",
    variant: "danger",
  });

  if (!confirmDelete) {
    return;
  }

  const updatedDreams = dreams.filter(function (item) {
    return item.id !== dreamId;
  });

  saveDreams(updatedDreams);

  showToast("Sen byl smazán.", "success");

  window.location.href = "../index.html";
}
