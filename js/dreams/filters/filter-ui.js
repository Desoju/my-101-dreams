function fillCategoryFilter() {
  const categoryFilterList = document.getElementById("categoryFilterList");

  if (!categoryFilterList) {
    return;
  }

categoryFilterList.innerHTML = "";

  getAllCategories().forEach(function (category) {
    const label = document.createElement("label");

    label.classList.add("checkbox-filter");

    label.innerHTML = `
      <input
        type="checkbox"
        class="category-filter-checkbox"
        value="${category.value}"
      >

      ${category.label}
    `;
    

    categoryFilterList.appendChild(label);
  });
}
