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

function handleKeyboard() {
  if (!window.visualViewport) return;

  const viewport = window.visualViewport;

  const applyPadding = () => {
    const keyboardHeight = window.innerHeight - viewport.height;

    if (keyboardHeight > 0) {
      sheet.style.paddingBottom = `${keyboardHeight}px`;
    } else {
      sheet.style.paddingBottom = "";
    }
  };

  applyPadding();
  viewport.addEventListener("resize", applyPadding);
}

 

function open() {
  document.body.style.overflow = "hidden";
  sheet.classList.add("show");
  sheet.classList.remove("hidden");
  backdrop.classList.remove("hidden");

  renderCategories();
  handleKeyboard(); // sets up listener, does NOT force keyboard
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

 submitBtn.onclick = async () => {
  // Prevent double tap
  if (submitBtn.disabled) return;
  submitBtn.disabled = true;
  submitBtn.textContent = "Saving...";

  try {
    if (navigator.vibrate) navigator.vibrate(10);

    await addExpense({
      amount: Number(amountInput.value),
      tag: selectedCategory.name,
      note: noteInput.value,
      date: new Date(),
      color: selectedCategory.color
    });

    // Give Firestore time to persist locally
    await new Promise(r => setTimeout(r, 150));

    history.back();
  } catch (e) {
    console.error(e);
    alert("Could not save. Please try again.");
    submitBtn.disabled = false;
    submitBtn.textContent = "Add Expense";
  }

  close();
  reset();
};

}
