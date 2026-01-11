import { addExpense } from "./data/expenses.js";
import { CATEGORIES } from "./config/categories.js";

const amountInput = document.getElementById("amount-input");
const noteInput = document.getElementById("note-input");
const submitBtn = document.getElementById("add-expense-btn");
const categoryContainer = document.getElementById("sheet-categories");
const closeBtn = document.getElementById("close-btn");

let selectedCategory = CATEGORIES[0];

function renderCategories() {
  categoryContainer.innerHTML = `
    <div class="sheet-categories">
      ${CATEGORIES.map(c => `
        <div class="sheet-category ${c.name === selectedCategory.name ? "active" : ""}" data-name="${c.name}">
          <span class="category-dot" style="background:${c.color}"></span>
          ${c.name}
        </div>
      `).join("")}
    </div>
  `;

  document.querySelectorAll(".sheet-category").forEach(el => {
    el.onclick = () => {
      selectedCategory = CATEGORIES.find(c => c.name === el.dataset.name);
      renderCategories();
    };
  });
}

renderCategories();

amountInput.oninput = () => {
  submitBtn.disabled = !amountInput.value;
};

submitBtn.onclick = async () => {
  submitBtn.disabled = true;
  submitBtn.textContent = "Saving...";

  await addExpense({
    amount: Number(amountInput.value),
    tag: selectedCategory.name,
    note: noteInput.value,
    date: new Date(),
    color: selectedCategory.color
  });

  await new Promise(r => setTimeout(r, 150));
  history.back();
};

closeBtn.onclick = () => history.back();
