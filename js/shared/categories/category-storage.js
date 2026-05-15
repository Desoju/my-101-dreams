function createId() {
  if (crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function loadCustomCategories() {
  return (
    JSON.parse(
      localStorage.getItem(STORAGE_KEYS.CUSTOM_CATEGORIES),
    ) || []
  );
}

function getCustomCategories() {
  const categories =
    JSON.parse(
      localStorage.getItem(STORAGE_KEYS.CUSTOM_CATEGORIES),
    ) || [];

  let changed = false;

  const migratedCategories = categories.map(function (category) {
    if (!category.id) {
      changed = true;

      return {
        ...category,
        id: createId(),
      };
    }

    return category;
  });

  if (changed) {
    saveCustomCategories(migratedCategories);
  }

  return migratedCategories;
}

function saveCustomCategories(categories) {
  localStorage.setItem(
    STORAGE_KEYS.CUSTOM_CATEGORIES,
    JSON.stringify(categories),
  );
}

function getAllCategories() {
  return [...defaultCategories, ...getCustomCategories()];
}

function addCustomCategory(label, color = "blue") {
  const categories = getCustomCategories();

  const newCategory = {
    id: createId(),
    value: createCategoryValue(label),
    label: label,
    color: color,
  };

  categories.push(newCategory);

  saveCustomCategories(categories);

  return newCategory;
}

function updateCustomCategory(categoryId, newLabel, newColor) {
  const categories = getCustomCategories();

  const updatedCategories = categories.map(function (category) {
    if (category.id === categoryId) {
      return {
        ...category,
        value: createCategoryValue(newLabel),
        label: newLabel,
        color: newColor,
      };
    }

    return category;
  });

  saveCustomCategories(updatedCategories);
}

function deleteCustomCategory(categoryId) {
  const categories = getCustomCategories();

  const updatedCategories = categories.filter(function (category) {
    return category.id !== categoryId;
  });

  saveCustomCategories(updatedCategories);
}

function categoryExists(label, ignoredCategoryId = null) {
  const newValue = createCategoryValue(label);

  return getCustomCategories().some(function (category) {
    return (
      category.value === newValue &&
      category.id !== ignoredCategoryId
    );
  });
}