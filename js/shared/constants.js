const DREAM_STATUS = {
  ACTIVE: "dream_active",
  COMPLETED: "dream_completed",
  FUTURE: "dream_to_be_completed",
  INACTIVE: "dream_not_attractive_anymore",
};

const DREAM_PRIORITY = {
  A: "A",
  B: "B",
  C: "C",
};

const DREAM_LIMITS = {
  MAX_PRIORITY_A_DREAMS: 10,
};

const STORAGE_KEYS = {
  DREAMS: "dreams",
  DREAMS_BACKUP_1: "dreams_backup_1",
  DREAMS_BACKUP_2: "dreams_backup_2",
  DREAMS_BACKUP_3: "dreams_backup_3",
  CUSTOM_CATEGORIES: "customCategories",
  RECOVERY_BACKUP: "my101dreams_recovery_backup",
  BACKUP_REMINDER: "my101dreams_last_backup_reminder",
  POST_IMPORT_TOAST: "postImportToast",
};

const TIMING = {
  AUTOSAVE_DELAY: 700,
  AUTOSAVE_STATUS_CLEAR_DELAY: 1500,
  BACKUP_REMINDER_DELAY: 2000,
  POST_IMPORT_TOAST_DELAY: 300,
};

const BACKUP = {
  FORMAT_VERSION: 1,
  REMINDER_INTERVAL_DAYS: 14,
};