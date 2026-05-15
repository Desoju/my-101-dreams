function createAppDataExport() {
  return {
    version: BACKUP.FORMAT_VERSION,
    exportedAt: new Date().toISOString(),
    dreams: getDreams(),
    customCategories: getCustomCategories(),
  };
}

function isValidImportedData(importedData) {
  return (
    importedData &&
    typeof importedData === "object" &&
    Array.isArray(importedData.dreams) &&
    Array.isArray(importedData.customCategories)
  );
}

function mergeDreams(currentDreams, importedDreams) {
  const dreamsById = new Map();

  currentDreams.forEach(function (dream) {
    dreamsById.set(dream.id, dream);
  });

  let added = 0;
  let updated = 0;

  importedDreams.forEach(function (importedDream) {
    if (!importedDream.id) {
      importedDream.id =
        crypto.randomUUID?.() || `dream_${Date.now()}_${Math.random()}`;
    }

    if (dreamsById.has(importedDream.id)) {
      dreamsById.set(importedDream.id, {
        ...dreamsById.get(importedDream.id),
        ...importedDream,
      });

      updated += 1;

      return;
    }

    dreamsById.set(importedDream.id, importedDream);

    added += 1;
  });

  return {
    items: Array.from(dreamsById.values()),
    added,
    updated,
  };
}

function mergeCustomCategories(currentCategories, importedCategories) {
  const categorySet = new Set(currentCategories);

  let added = 0;

  importedCategories.forEach(function (category) {
    if (!categorySet.has(category)) {
      categorySet.add(category);

      added += 1;
    }
  });

  return {
    items: Array.from(categorySet),
    added,
  };
}