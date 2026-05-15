const DREAMS_STORAGE_KEY = "dreams";
const DREAMS_BACKUP_KEYS = [
  "dreams_backup_1",
  "dreams_backup_2",
  "dreams_backup_3",
];

function safelyParseDreams(rawValue) {
  try {
    const parsedDreams = JSON.parse(rawValue);

    if (!Array.isArray(parsedDreams)) {
      return null;
    }

    return parsedDreams;
  } catch {
    return null;
  }
}

function getDreams() {
  const dreams = safelyParseDreams(localStorage.getItem(DREAMS_STORAGE_KEY));

  if (dreams) {
    return dreams;
  }

  return getDreamsFromBackup();
}

function getDreamsFromBackup() {
  for (const backupKey of DREAMS_BACKUP_KEYS) {
    const backupDreams = safelyParseDreams(localStorage.getItem(backupKey));

    if (backupDreams) {
      return backupDreams;
    }
  }

  return [];
}

function rotateDreamBackups() {
  const currentDreams = localStorage.getItem(DREAMS_STORAGE_KEY);

  if (!currentDreams) {
    return;
  }

  localStorage.setItem(DREAMS_BACKUP_KEYS[2], localStorage.getItem(DREAMS_BACKUP_KEYS[1]) || "");
  localStorage.setItem(DREAMS_BACKUP_KEYS[1], localStorage.getItem(DREAMS_BACKUP_KEYS[0]) || "");
  localStorage.setItem(DREAMS_BACKUP_KEYS[0], currentDreams);
}

function saveDreams(dreams) {
  rotateDreamBackups();
  localStorage.setItem(DREAMS_STORAGE_KEY, JSON.stringify(dreams));
}