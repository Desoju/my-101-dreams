function fillCategorySelect(selectElement, selectedValue = "other") {
  selectElement.innerHTML = "";

  getAllCategories().forEach(function (category) {
    const option = document.createElement("option");

    option.value = category.value;
    option.textContent = category.label;

    if (category.value === selectedValue) {
      option.selected = true;
    }

    selectElement.appendChild(option);
  });
}

function findCategory(categoryValue) {
  return getAllCategories().find(function (category) {
    return category.value === categoryValue;
  });
}

function getCategoryLabel(categoryValue) {
  const category = findCategory(categoryValue);

  return category ? category.label : "Ostatní";
}

function getCategoryColor(categoryValue) {
  const category = findCategory(categoryValue);

  return category?.color || "blue";
}

function getCategoryColorOptions() {
  return `
    <option value="blue">Modrá</option>
    <option value="green">Zelená</option>
    <option value="pink">Růžová</option>
    <option value="orange">Oranžová</option>
    <option value="purple">Fialová</option>
    <option value="cyan">Tyrkysová</option>
    <option value="indigo">Indigo</option>
    <option value="teal">Teal</option>
    <option value="lime">Limetková</option>
    <option value="red">Červená</option>
  `;
}
