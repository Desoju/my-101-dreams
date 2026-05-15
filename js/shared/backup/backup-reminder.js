function shouldShowBackupReminder() {
  const dreams = getDreams();

  if (dreams.length === 0) {
    return false;
  }

  const lastReminder = localStorage.getItem(
    STORAGE_KEYS.BACKUP_REMINDER,
  );

  if (!lastReminder) {
    return true;
  }

  const lastReminderDate = new Date(lastReminder);
  const currentDate = new Date();

  const differenceInDays =
    (currentDate - lastReminderDate) / (1000 * 60 * 60 * 24);

  return differenceInDays >= BACKUP.REMINDER_INTERVAL_DAYS;
}

function showBackupReminder() {
  if (!shouldShowBackupReminder()) {
    return;
  }

  setTimeout(function () {
    showToast("Doporučujeme pravidelně exportovat zálohu dat.", "info");

    localStorage.setItem(
      STORAGE_KEYS.BACKUP_REMINDER,
      new Date().toISOString(),
    );
  }, TIMING.BACKUP_REMINDER_DELAY);
}