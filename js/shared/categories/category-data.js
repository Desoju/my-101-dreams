const defaultCategories = [
  { value: "travel", label: "Cestování", color: "travel" },
  { value: "career", label: "Kariéra", color: "career" },
  { value: "relationships", label: "Vztahy", color: "relationships" },
  { value: "health", label: "Zdraví", color: "health" },
  { value: "finance", label: "Finance", color: "finance" },
  { value: "property", label: "Majetek", color: "property" },
  { value: "hobbies", label: "Koníčky", color: "hobbies" },
  { value: "experiences", label: "Zážitky", color: "experiences" },
  { value: "personal_growth", label: "Osobní růst", color: "personal-growth" },
  { value: "other", label: "Ostatní", color: "other" },
];

function createCategoryValue(label) {
  return label
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "_");
}
