function categoryExists(
  label,
  ignoredCategoryId = null
) {
  const normalizedValue =
    createCategoryValue(label);

  return getCustomCategories().some(function (category) {
    return (
      category.value === normalizedValue &&
      category.id !== ignoredCategoryId
    );
  });
}