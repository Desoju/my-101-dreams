const categoryForm = document.getElementById("categoryForm");
const categoryName = document.getElementById("categoryName");
const categoryColor = document.getElementById("categoryColor");
const customCategoriesList = document.getElementById("customCategoriesList");

let isCategoryFormDirty = false;

function setActiveColorOption(color) {
  document.querySelectorAll(".color-option").forEach(function (option) {
    option.classList.remove("color-option-active");
  });

  const activeOption = document.querySelector(
    `.color-option[data-color="${color}"]`,
  );

  if (activeOption) {
    activeOption.classList.add("color-option-active");
  }
}

function setupColorPicker() {
  const colorOptions = document.querySelectorAll(".color-option");

  colorOptions.forEach(function (option) {
    option.addEventListener("click", function () {
      categoryColor.value = option.dataset.color;

      setActiveColorOption(option.dataset.color);
    });
  });

  setActiveColorOption(categoryColor.value || "blue");
}

function createCategoryItem(category) {
  const categoryItem = document.createElement("div");

  categoryItem.classList.add("category-item");

  categoryItem.innerHTML = `
    <input type="text" class="edit-category-name" value="${category.label}">

    <select class="edit-category-color">
      ${getCategoryColorOptions()}
    </select>

    <button type="button" class="save-category-button button-primary">Uložit</button>
    <button type="button" class="delete-category-button button-danger">Smazat</button>
  `;

  categoryItem.querySelector(".edit-category-color").value =
    category.color || "blue";

  categoryItem
    .querySelector(".save-category-button")
    .addEventListener("click", function () {
      const newLabel = categoryItem
        .querySelector(".edit-category-name")
        .value.trim();

      const newColor = categoryItem.querySelector(".edit-category-color").value;

      if (categoryExists(newLabel, category.id)) {
        showToast("Kategorie s tímto názvem už existuje.", "error");
        return;
      }

      updateCustomCategory(category.id, newLabel, newColor);

      renderCustomCategories();
    });

  categoryItem
    .querySelector(".delete-category-button")
    .addEventListener("click", async function () {
      const confirmDelete = await showConfirm({
        title: "Smazat kategorii?",
        message: "Opravdu chceš smazat tuto kategorii?",
        confirmText: "Smazat",
        cancelText: "Zrušit",
        variant: "danger",
      });

      if (!confirmDelete) {
        return;
      }

      deleteCustomCategory(category.id);

      renderCustomCategories();

      showToast("Kategorie byla smazána.", "success");
    });

  return categoryItem;
}

function renderCustomCategories() {
  const categories = getCustomCategories();

  customCategoriesList.innerHTML = "";

  if (categories.length === 0) {
    customCategoriesList.appendChild(
      createEmptyState(
        "Zatím nemáš žádné vlastní kategorie",
        "Přidej si vlastní kategorie, aby se ti sny lépe třídily.",
      ),
    );

    return;
  }

  categories.forEach(function (category) {
    customCategoriesList.appendChild(createCategoryItem(category));
  });
}

if (categoryName) {
  categoryName.addEventListener("input", function () {
    isCategoryFormDirty = categoryName.value.trim() !== "";
  });
}

if (categoryForm) {
  categoryForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const newCategoryName = categoryName.value.trim();

    if (!newCategoryName) {
      showToast("Název kategorie je povinný.", "error");
      categoryName.focus();

      return;
    }

    if (categoryExists(newCategoryName)) {
      showToast("Kategorie s tímto názvem už existuje.", "error");

      return;
    }

    addCustomCategory(newCategoryName, categoryColor.value);

    isCategoryFormDirty = false;

    categoryName.value = "";
    categoryColor.value = "blue";

    setActiveColorOption("blue");

    renderCustomCategories();
  });
}

window.addEventListener("beforeunload", function (event) {
  if (!isCategoryFormDirty) {
    return;
  }

  event.preventDefault();
  event.returnValue = "";
});

const backLink = document.querySelector(".back-link");

if (backLink) {
  backLink.addEventListener("click", async function (event) {
    if (!isCategoryFormDirty) {
      return;
    }

    event.preventDefault();

    const shouldStay = await showConfirm({
      title: "Pokračovat v úpravách?",
      message:
        "Máš rozepsanou kategorii. Pokud odejdeš, můžeš přijít o poslední neupravené změny.",
      confirmText: "Pokračovat v úpravách",
      cancelText: "Odejít",
      variant: "primary",
    });

    if (shouldStay) {
      return;
    }

    isCategoryFormDirty = false;
    window.location.href = backLink.href;
  });
}

renderCustomCategories();
setupColorPicker();
