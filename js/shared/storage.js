const DREAMS_BACKUP_KEYS = [
  STORAGE_KEYS.DREAMS_BACKUP_1,
  STORAGE_KEYS.DREAMS_BACKUP_2,
  STORAGE_KEYS.DREAMS_BACKUP_3,
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
  const dreams = safelyParseDreams(
    localStorage.getItem(STORAGE_KEYS.DREAMS),
  );

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
  const currentDreams = localStorage.getItem(STORAGE_KEYS.DREAMS);

  if (!currentDreams) {
    return;
  }

  localStorage.setItem(
    DREAMS_BACKUP_KEYS[2],
    localStorage.getItem(DREAMS_BACKUP_KEYS[1]) || "",
  );

  localStorage.setItem(
    DREAMS_BACKUP_KEYS[1],
    localStorage.getItem(DREAMS_BACKUP_KEYS[0]) || "",
  );

  localStorage.setItem(DREAMS_BACKUP_KEYS[0], currentDreams);
}

function saveDreams(dreams) {
  rotateDreamBackups();

  localStorage.setItem(
    STORAGE_KEYS.DREAMS,
    JSON.stringify(dreams),
  );
}