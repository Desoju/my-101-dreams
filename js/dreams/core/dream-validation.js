function dreamExistsByName(
  dreams,
  dreamName,
  ignoredDreamId = null
) {
  const normalizedDreamName =
    normalizeText(dreamName.trim());

  return dreams.some(function (dream) {
    return (
      normalizeText(dream.name || "") === normalizedDreamName &&
      dream.id !== ignoredDreamId
    );
  });
}