// js/ui/addExpense.js
import { CATEGORIES } from "../config/categories.js";

export function initAddExpense({ onAdd }) {
  const addBtn = document.getElementById("add-btn");
  const sheet = document.getElementById("add-sheet");
  const backdrop = document.getElementById("sheet-backdrop");
  const amountInput = document.getElementById("amount-input");
  const noteInput = document.getElementById("note-input");
  const submitBtn = document.getElementById("add-expense-btn");
  const categoryContainer = document.getElementById("sheet-categories");

  let selectedCategory = CATEGORIES[0];

  function open() {
    sheet.classList.add("show");
    sheet.classList.remove("hidden");
    backdrop.classList.remove("hidden");
    renderCategories();
    amountInput.focus();
  }

  function close() {
    sheet.classList.remove("show");
    backdrop.classList.add("hidden");
    setTimeout(() => sheet.classList.add("hidden"), 200);
  }

  function reset() {
    amountInput.value = "";
    noteInput.value = "";
    selectedCategory = CATEGORIES[0];
    submitBtn.disabled = true;
  }

  function renderCategories() {
    categoryContainer.innerHTML = `
      <div class="sheet-categories">
        ${CATEGORIES.map(
          c => `
          <div
            class="sheet-category ${
              selectedCategory.name === c.name ? "active" : ""
            }"
            data-name="${c.name}"
          >
            <span class="category-dot" style="background:${c.color}"></span>
            ${c.name}
          </div>
        `
        ).join("")}
      </div>
    `;

    categoryContainer
      .querySelectorAll(".sheet-category")
      .forEach(el => {
        el.onclick = () => {
          selectedCategory = CATEGORIES.find(
            c => c.name === el.dataset.name
          );
          renderCategories();
        };
      });
  }

  addBtn.onclick = open;

  backdrop.onclick = () => {
    close();
    reset();
  };

  amountInput.oninput = () => {
    submitBtn.disabled = !amountInput.value;
  };

  submitBtn.onclick = () => {
    onAdd({
      amount: Number(amountInput.value),
      tag: selectedCategory.name,
      note: noteInput.value,
      date: new Date(),
      color: selectedCategory.color
    });
    close();
    reset();
  };
}
